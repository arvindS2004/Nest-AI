import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./ProductCard.css";

// Redux actions
import { addItemsToCart } from "../../actions/CartAction";
import {
  addFavouriteItemsToCart,
  deleteFavouriteItemsToCart,
} from "../../actions/FavouriteAction";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  // get current favourites from redux
  const { favouriteItems } = useSelector((state) => state.favourite);

  // check if this product is already in favourites
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const exists = favouriteItems.some((item) => item.product === product._id);
    setIsFavorite(exists);
  }, [favouriteItems, product._id]);

  // Calculate discount percentage if offer price exists
  const discountPercentage =
    product.offerPrice > 0
      ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
      : 0;

  // --- HANDLERS ---
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite) {
      // Remove from redux
      dispatch(deleteFavouriteItemsToCart(product._id));
      toast.info("Removed from Favourites");
    } else {
      // Add to redux
      dispatch(addFavouriteItemsToCart(product._id, 1));
      toast.success("Product Added to Favourites");
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Check stock availability
    if (product.Stock > 0) {
      dispatch(addItemsToCart(product._id, 1)); // default qty 1
      toast.success("Product Added to Cart");
    } else {
      toast.error("Product stock limited");
    }
  };

  return (
    <div className="ProductCard">
      <Link
        to={`/product/${product._id}`}
        className="product-link"
        aria-label={`View details for ${product.name}`}
      >
        <div className="product-image-container">
          <img
            src={product.images[0]?.url || "/placeholder-image.jpg"}
            alt={product.name}
            className="ProductImg"
            loading="lazy"
          />
          {discountPercentage > 0 && (
            <div className="discount-badge">{discountPercentage}% OFF</div>
          )}

          <button
            className={`favorite-btn ${isFavorite ? "active" : ""}`}
            onClick={handleFavoriteClick}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill={isFavorite ? "red" : "none"}
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>

        <div className="product-content">
          <h3 className="productName" title={product.name}>
            {product.name} 
             </h3>        

            <div className="price-container">
            <div className="offerPriceBox">
              {product.offerPrice > 0 ? (
                <>
                  <span className="discountPrice">
                    ${product.offerPrice.toFixed(2)}
                  </span>
                  <span className="p__Price">₹{product.price.toFixed(2)}</span>
                </>
              ) : (
                <span className="regularPrice">
                  ₹{product.price.toFixed(2)}
                </span>
              )}
            </div>
          </div>    

               
        </div>
         <div className="card-actions">
        <button
          className={`add-to-cart-btn ${product.Stock < 1 ? "disabled" : ""}`}
          onClick={handleAddToCart}
          disabled={product.Stock < 1}
          aria-label="Add to cart"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="m2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
          {product.Stock < 1 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
      </Link>     
    </div>
  );
};

export default ProductCard;