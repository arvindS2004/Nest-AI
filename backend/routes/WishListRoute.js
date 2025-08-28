const express = require("express");
const {
  // Wishlist controllers
  addToWishlist,
  getWishlistData,
  removeWishlistData,
  updateWishlist,
  clearWishlist,
  // Cart controllers
  addToCart,
  getCartData,
  updateCart,
  removeCartData,
  clearCart,
} = require("../controller/CartController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

// ========================= WISHLIST ROUTES =========================
router.route("/wishlist").get(isAuthenticatedUser, getWishlistData);
router.route("/addToWishlist").post(isAuthenticatedUser, addToWishlist);
router.route("/wishlist/update/:id").put(isAuthenticatedUser, updateWishlist);
router.route("/removeWishlist/:id").delete(isAuthenticatedUser, removeWishlistData);
router.route("/clearWishlist").delete(isAuthenticatedUser, clearWishlist);

// ========================= CART ROUTES =========================
router.route("/cart").get(isAuthenticatedUser, getCartData);
router.route("/addToCart").post(isAuthenticatedUser, addToCart);
router.route("/cart/update/:id").put(isAuthenticatedUser, updateCart);
router.route("/removeCart/:id").delete(isAuthenticatedUser, removeCartData);
router.route("/clearCart").delete(isAuthenticatedUser, clearCart);

module.exports = router;