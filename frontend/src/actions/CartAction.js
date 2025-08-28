import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constans/CartConstans";
import axios from "axios";

// Add to Cart ---Product
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  try {
    // Get product data
    const { data } = await axios.get(`/api/v2/product/${id}`);
    
    const cartItem = {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.Stock,
      quantity,
    };

    // Update local state
    dispatch({
      type: ADD_TO_CART,
      payload: cartItem,
    });

    // Save to localStorage
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

    // Save to database
    const cartData = {
      productName: data.product.name,
      quantity: quantity,
      productImage: data.product.images[0].url,
      productPrice: data.product.price,
      productId: data.product._id,
      Stock: data.product.Stock,
      userId: getState().user.user._id, // Assuming you have user in state
    };

    await axios.post('/api/v2/addToCart', cartData);
    
  } catch (error) {
    console.error('Error adding item to cart:', error);
  }
};

// REMOVE FROM CART ---Product
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: id,
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

    // Remove from database - you'll need to find the cart item ID first
    // This requires getting cart data from backend to find the correct item
    const { data } = await axios.get('/api/v2/cart');
    const cartItem = data.cartData.find(item => item.productId === id);
    
    if (cartItem) {
      await axios.delete(`/api/v2/removeCart/${cartItem._id}`);
    }
    
  } catch (error) {
    console.error('Error removing item from cart:', error);
  }
};

// Load cart from database on app start
export const loadCartFromDatabase = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/v2/cart');
    
    // Transform backend data to frontend format
    const cartItems = data.cartData.map(item => ({
      product: item.productId,
      name: item.productName,
      price: item.productPrice,
      image: item.productImage,
      stock: item.Stock,
      quantity: item.quantity,
    }));

    // Update localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Dispatch each item to update state
    cartItems.forEach(item => {
      dispatch({
        type: ADD_TO_CART,
        payload: item,
      });
    });
    
  } catch (error) {
    console.error('Error loading cart from database:', error);
  }
};

// Update cart quantity
export const updateCartQuantity = (productId, quantity) => async (dispatch, getState) => {
  try {
    // Update local state first
    const cartItem = getState().cart.cartItems.find(item => item.product === productId);
    if (cartItem) {
      dispatch({
        type: ADD_TO_CART,
        payload: { ...cartItem, quantity },
      });
      
      localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
      
      // Update in database
      const { data } = await axios.get('/api/v2/cart');
      const dbCartItem = data.cartData.find(item => item.productId === productId);
      
      if (dbCartItem) {
        await axios.put(`/api/v2/cart/update/${dbCartItem._id}`, { quantity });
      }
    }
  } catch (error) {
    console.error('Error updating cart quantity:', error);
  }
};

// SAVE SHIPPING INFO 
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};