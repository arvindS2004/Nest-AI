const Cart = require("../models/CartModel");
const Wishlist = require("../models/WishListModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");

// ========================= WISHLIST CONTROLLERS =========================

// Add to wishlist
exports.addToWishlist = catchAsyncErrors(async (req, res, next) => {
  const {
    productName,
    quantity,
    productImage,
    productPrice,
    productId,
    Stock,
  } = req.body;
  
  const userId = req.user.id; // Get from authenticated user

  // Check if item already exists in wishlist
  const existingWishlistItem = await Wishlist.findOne({
    userId: userId,
    productId: productId
  });

  if (existingWishlistItem) {
    // Update quantity if item already exists
    existingWishlistItem.quantity = quantity;
    await existingWishlistItem.save();
    
    return res.status(200).json({
      success: true,
      wishList: existingWishlistItem,
      message: "Wishlist updated successfully",
    });
  }

  // Create new wishlist item
  const wishList = await Wishlist.create({
    productName,
    quantity,
    productImage,
    productPrice,
    userId,
    productId,
    Stock,
  });

  res.status(200).json({
    success: true,
    wishList,
    message: "Item added to wishlist successfully",
  });
});

// Get wishlist data
exports.getWishlistData = catchAsyncErrors(async (req, res, next) => {
  const wishlistData = await Wishlist.find({ userId: req.user.id });

  res.status(200).json({
    success: true,
    wishlistData,
  });
});

// Update wishlist item
exports.updateWishlist = catchAsyncErrors(async (req, res, next) => {
  const { quantity } = req.body;
  
  const wishlist = await Wishlist.findById(req.params.id);

  if (!wishlist) {
    return next(new ErrorHandler("No wishlist item found with this id", 404));
  }

  // Check if the wishlist item belongs to the authenticated user
  if (wishlist.userId !== req.user.id) {
    return next(new ErrorHandler("Not authorized to update this item", 403));
  }

  wishlist.quantity = quantity;
  await wishlist.save();

  res.status(200).json({
    success: true,
    wishlist,
    message: "Wishlist updated successfully",
  });
});

// Remove wishlist item
exports.removeWishlistData = catchAsyncErrors(async (req, res, next) => {
  const wishlistData = await Wishlist.findById(req.params.id);

  if (!wishlistData) {
    return next(new ErrorHandler("No wishlist item found with this id", 404));
  }

  // Check if the item belongs to the authenticated user
  if (wishlistData.userId !== req.user.id) {
    return next(new ErrorHandler("Not authorized to remove this item", 403));
  }

  await wishlistData.remove();

  res.status(200).json({
    success: true,
    message: "Item removed from wishlist successfully",
  });
});

// Clear entire wishlist
exports.clearWishlist = catchAsyncErrors(async (req, res, next) => {
  await Wishlist.deleteMany({ userId: req.user.id });

  res.status(200).json({
    success: true,
    message: "Wishlist cleared successfully",
  });
});

// ========================= CART CONTROLLERS =========================

// Add to cart
exports.addToCart = catchAsyncErrors(async (req, res, next) => {
  const {
    productName,
    quantity,
    productImage,
    productPrice,
    productId,
    Stock,
  } = req.body;
  
  const userId = req.user.id; // Get from authenticated user

  // Check if item already exists in cart
  const existingCartItem = await Cart.findOne({
    userId: userId,
    productId: productId
  });

  if (existingCartItem) {
    // Update quantity if item already exists
    existingCartItem.quantity = quantity;
    await existingCartItem.save();
    
    return res.status(200).json({
      success: true,
      cart: existingCartItem,
      message: "Cart updated successfully",
    });
  }

  // Create new cart item
  const cart = await Cart.create({
    productName,
    quantity,
    productImage,
    productPrice,
    userId,
    productId,
    Stock,
  });

  res.status(200).json({
    success: true,
    cart,
    message: "Item added to cart successfully",
  });
});

// Get cart data
exports.getCartData = catchAsyncErrors(async (req, res, next) => {
  const cartData = await Cart.find({ userId: req.user.id });
  
  res.status(200).json({
    success: true,
    cartData,
  });
});

// Update cart item
exports.updateCart = catchAsyncErrors(async (req, res, next) => {
  const { quantity } = req.body;
  
  const cart = await Cart.findById(req.params.id);

  if (!cart) {
    return next(new ErrorHandler("No cart item found with this id", 404));
  }

  // Check if the cart item belongs to the authenticated user
  if (cart.userId !== req.user.id) {
    return next(new ErrorHandler("Not authorized to update this item", 403));
  }

  cart.quantity = quantity;
  await cart.save();

  res.status(200).json({
    success: true,
    cart,
    message: "Cart updated successfully",
  });
});

// Remove cart item
exports.removeCartData = catchAsyncErrors(async (req, res, next) => {
  const cartData = await Cart.findById(req.params.id);

  if (!cartData) {
    return next(new ErrorHandler("Item not found with this id", 404));
  }

  // Check if the cart item belongs to the authenticated user
  if (cartData.userId !== req.user.id) {
    return next(new ErrorHandler("Not authorized to remove this item", 403));
  }

  await cartData.remove();

  res.status(200).json({
    success: true,
    message: "Item removed from cart successfully",
  });
});

// Clear entire cart
exports.clearCart = catchAsyncErrors(async (req, res, next) => {
  await Cart.deleteMany({ userId: req.user.id });

  res.status(200).json({
    success: true,
    message: "Cart cleared successfully",
  });
});