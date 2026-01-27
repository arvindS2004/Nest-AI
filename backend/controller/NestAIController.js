
const Cart = require("../models/CartModel");
const Wishlist = require("../models/WishListModel");
const Product = require("../models/ProductModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const { GoogleGenAI } = require("@google/genai");

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});



console.log("GEMINI KEY FROM ENV:", process.env.GEMINI_API_KEY);


exports.getPersonalizedRecommendations = catchAsyncErrors(async (req, res, next) => {
  try {
    const userId = req.user.id;

    
    const cartItems = await Cart.find({ userId }).populate('productId');
    
    
    const wishlistItems = await Wishlist.find({ userId }).populate('productId');

    
    if (cartItems.length === 0 && wishlistItems.length === 0) {
      const popularProducts = await Product.find()
        .sort({ ratings: -1, numOfReviews: -1 })
        .limit(6)
        .select('name description category price offerPrice images Stock ratings');

      const defaultRecommendations = popularProducts.map(product => ({
        product,
        reason: "This is a popular product that many customers love. Great for starting your shopping journey!",
        confidence: 0.7,
        healthNote: "Popular choice among health-conscious shoppers."
      }));

      return res.status(200).json({
        success: true,
        recommendations: defaultRecommendations,
        message: "Popular products recommended for you"
      });
    }

    
    const userPreferences = {
      cartItems: cartItems.map(item => ({
        name: item.productName,
        category: item.category || 'Unknown',
        price: item.productPrice,
        quantity: item.quantity
      })),
      wishlistItems: wishlistItems.map(item => ({
        name: item.productName,
        category: item.category || 'Unknown', 
        price: item.productPrice
      }))
    };

    
    const existingProductIds = [
      ...cartItems.map(item => item.productId),
      ...wishlistItems.map(item => item.productId)
    ];

    const availableProducts = await Product.find({
      _id: { $nin: existingProductIds },
      Stock: { $gt: 0 }
    }).limit(20).select('name description category price offerPrice images Stock ratings');
    
    const prompt = `
    You are a helpful grocery recommendation AI assistant. Based on the user's shopping preferences, recommend products and provide health/lifestyle benefits.

    User's Cart Items: ${JSON.stringify(userPreferences.cartItems)}
    User's Wishlist Items: ${JSON.stringify(userPreferences.wishlistItems)}
    
    Available Products: ${JSON.stringify(availableProducts.map(p => ({
      id: p._id,
      name: p.name,
      category: p.category,
      description: p.description,
      price: p.price,
      offerPrice: p.offerPrice
    })))}

    Please analyze the user's preferences and recommend 4-6 products from the available products list. For each recommendation, provide:
    1. Product ID
    2. Reason for recommendation (based on their current items)
    3. Health/lifestyle benefit note
    4. Confidence score (0-1)

    Respond ONLY in this JSON format:
    {
      "recommendations": [
        {
          "productId": "product_id_here",
          "reason": "You should buy this product because...",
          "healthNote": "This product is good for your health because...",
          "confidence": 0.85
        }
      ]
    }

    Focus on:
    - Complementary products that go well with their current choices
    - Healthier alternatives or additions
    - Products that complete their shopping needs
    - Seasonal or trending items in their preferred categories
    `;

    const result = await genAI.models.generateContent({
  model: "models/gemini-2.5-flash",
  contents: prompt,
  
});

const aiResponse =
  result.candidates?.[0]?.content?.parts?.[0]?.text;

if (!aiResponse) {
  console.error("Gemini raw response:", JSON.stringify(result, null, 2));
  throw new Error("Empty response from Gemini");
}



    let aiRecommendations;
    try {
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        aiRecommendations = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No valid JSON found in AI response");
      }
    } catch (parseError) {
      console.error("AI Response parsing error:", parseError);
      // Fallback to category-based recommendations
      return getCategoryBasedRecommendations(userPreferences, availableProducts, res);
    }

    // Match AI recommendations with actual products
    const finalRecommendations = [];
    
    for (const aiRec of aiRecommendations.recommendations) {
      const product = availableProducts.find(p => p._id.toString() === aiRec.productId);
      if (product) {
        finalRecommendations.push({
          product: {
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            price: product.price,
            offerPrice: product.offerPrice,
            images: product.images,
            Stock: product.Stock,
            ratings: product.ratings
          },
          reason: aiRec.reason,
          healthNote: aiRec.healthNote,
          confidence: aiRec.confidence
        });
      }
    }

    // If AI didn't provide enough recommendations, add category-based ones
    if (finalRecommendations.length < 4) {
      const fallbackRecs = getCategoryBasedFallback(userPreferences, availableProducts, finalRecommendations.length);
      finalRecommendations.push(...fallbackRecs);
    }

    res.status(200).json({
      success: true,
      recommendations: finalRecommendations.slice(0, 6),
      message: "AI-powered personalized recommendations generated successfully",
      userPreferences: {
        totalCartItems: cartItems.length,
        totalWishlistItems: wishlistItems.length
      }
    });

  } catch (error) {
    console.error("NEST-AI Error:", error);
    return next(new ErrorHandler("Failed to generate recommendations", 500));
  }
});

function getCategoryBasedRecommendations(userPreferences, availableProducts, res) {
  const userCategories = [
    ...userPreferences.cartItems.map(item => item.category),
    ...userPreferences.wishlistItems.map(item => item.category)
  ];

  const categoryRecommendations = availableProducts
    .filter(product => userCategories.includes(product.category))
    .slice(0, 6)
    .map(product => ({
      product,
      reason: `This product complements your interest in ${product.category} items.`,
      healthNote: "A great addition to maintain a balanced and healthy lifestyle.",
      confidence: 0.6
    }));

  return res.status(200).json({
    success: true,
    recommendations: categoryRecommendations,
    message: "Category-based recommendations generated"
  });
}

// Helper function for category-based fallback
function getCategoryBasedFallback(userPreferences, availableProducts, currentCount) {
  const needed = 4 - currentCount;
  const userCategories = [
    ...userPreferences.cartItems.map(item => item.category),
    ...userPreferences.wishlistItems.map(item => item.category)
  ];

  return availableProducts
    .filter(product => userCategories.includes(product.category))
    .slice(0, needed)
    .map(product => ({
      product,
      reason: `This ${product.category} product complements your shopping preferences.`,
      healthNote: "Recommended based on your category preferences for a balanced lifestyle.",
      confidence: 0.65
    }));
}