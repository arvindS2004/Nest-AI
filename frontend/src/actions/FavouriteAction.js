import { 
  ADD_TO_FAVOURITE, 
  REMOVE_FROM_FAVOURITE
} from "../constans/FavouriteConstans";
import axios from "axios";

// Add to favourites
export const addFavouriteItemsToCart = (id, quantity) => async (dispatch, getState) => {
  try {
    // Get product data
    const { data } = await axios.get(`/api/v2/product/${id}`);
    
    const favouriteItem = {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.Stock,
      quantity,
    };

    // Update local state
    dispatch({
      type: ADD_TO_FAVOURITE,
      payload: favouriteItem,
    });

    // Save to localStorage
    localStorage.setItem("favouriteItems", JSON.stringify(getState().favourite.favouriteItems));

    // Only save to database if user is authenticated
    const userState = getState().user;
    if (userState.isAuthenticated && userState.user) {
      // Save to database
      const wishlistData = {
        productName: data.product.name,
        quantity: quantity,
        productImage: data.product.images[0].url,
        productPrice: data.product.price,
        productId: data.product._id,
        Stock: data.product.Stock,
        userId: userState.user._id,
      };

      await axios.post('/api/v2/addToWishlist', wishlistData);
    }
    
  } catch (error) {
    console.error('Error adding item to favourites:', error);
  }
};

// Delete from favourites
export const deleteFavouriteItemsToCart = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REMOVE_FROM_FAVOURITE,
      payload: id,
    });

    localStorage.setItem("favouriteItems", JSON.stringify(getState().favourite.favouriteItems));

    // Only remove from database if user is authenticated
    const userState = getState().user;
    if (userState.isAuthenticated && userState.user) {
      // Remove from database - find the wishlist item ID first
      const { data } = await axios.get('/api/v2/wishlist');
      const wishlistItem = data.wishlistData.find(item => item.productId === id);
      
      if (wishlistItem) {
        await axios.delete(`/api/v2/removeWishlist/${wishlistItem._id}`);
      }
    }
    
  } catch (error) {
    console.error('Error removing item from favourites:', error);
  }
};

// Load favourites from database on app start
export const loadFavouritesFromDatabase = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/v2/wishlist');
    
    // Transform backend data to frontend format
    const favouriteItems = data.wishlistData.map(item => ({
      product: item.productId,
      name: item.productName,
      price: item.productPrice,
      image: item.productImage,
      stock: item.Stock,
      quantity: item.quantity,
    }));

    // Update localStorage
    localStorage.setItem("favouriteItems", JSON.stringify(favouriteItems));
    
    // Dispatch each item to update state
    favouriteItems.forEach(item => {
      dispatch({
        type: ADD_TO_FAVOURITE,
        payload: item,
      });
    });
    
  } catch (error) {
    console.error('Error loading favourites from database:', error);
  }
};

// Update favourite quantity (if needed)
export const updateFavouriteQuantity = (productId, quantity) => async (dispatch, getState) => {
  try {
    // Update local state first
    const favouriteItem = getState().favourite.favouriteItems.find(item => item.product === productId);
    if (favouriteItem) {
      dispatch({
        type: ADD_TO_FAVOURITE,
        payload: { ...favouriteItem, quantity },
      });
      
      localStorage.setItem("favouriteItems", JSON.stringify(getState().favourite.favouriteItems));
      
      // Update in database if user is authenticated
      const userState = getState().user;
      if (userState.isAuthenticated && userState.user) {
        const { data } = await axios.get('/api/v2/wishlist');
        const dbWishlistItem = data.wishlistData.find(item => item.productId === productId);
        
        if (dbWishlistItem) {
          await axios.put(`/api/v2/wishlist/update/${dbWishlistItem._id}`, { quantity });
        }
      }
    }
  } catch (error) {
    console.error('Error updating favourite quantity:', error);
  }
};