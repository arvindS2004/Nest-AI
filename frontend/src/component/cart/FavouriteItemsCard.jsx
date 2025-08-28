import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./FavouriteItemsCard.css";
import { useSelector } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import VisibilityIcon from "@material-ui/icons/Visibility";

const FavouriteItemsCard = ({ item, deleteFavouriteItems }) => {
    const [isRemoving, setIsRemoving] = useState(false);
    const { product } = useSelector((state) => state.productDetails);

    const handleRemove = () => {
        setIsRemoving(true);
        setTimeout(() => {
            deleteFavouriteItems(item.product);
        }, 200);
    };

    const isInStock = item.stock > 0;

    return (    
        <div className={`favourite-items-card ${isRemoving ? 'removing' : ''}`}>
          
            <div className="product-section">
                <div className="product-image-container">
                    <img 
                        src={item.image} 
                        alt={item.name}
                        className="product-image"
                        loading="lazy"
                    />
                </div>
                <div className="product-info">
                    <Link 
                        to={`/product/${item.product}`} 
                        className="product-name"
                        title={item.name}
                    >
                        {item.name}
                    </Link>
                    <button 
                        className="remove-btn" 
                        onClick={handleRemove}
                        aria-label={`Remove ${item.name} from favourites`}
                    >
                        <DeleteIcon className="remove-icon" />
                        Remove
                    </button>
                </div>
            </div>

            <div className="price-section">
                <span className="price">₹{item.price.toLocaleString()}</span>
            </div>

            <div className="stock-section">
                <span className={`stock-status ${isInStock ? 'in-stock' : 'out-of-stock'}`}>
                    <span className="stock-indicator"></span>
                    {isInStock ? 'In Stock' : 'Out of Stock'}
                </span>
                {isInStock && item.stock <= 10 && (
                    <span className="low-stock-warning">
                        Only {item.stock} left
                    </span>
                )}
            </div>
            
            <div className="actions-section">
                <div className="action-buttons">
                    <Link 
                        to={`/product/${item.product}`}
                        className="view-product-btn"
                        title="View product details"
                    >
                        <VisibilityIcon className="action-icon" />
                       
                    </Link>
                    <button 
                        className={`adt-cbtn ${!isInStock ? 'disabled' : ''}`}
                        disabled={!isInStock}
                        aria-label={`Add ${item.name} to cart`}
                    >
                        <ShoppingCartIcon className="action-icon" />
                        <span className="action-text">Add to Cart</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FavouriteItemsCard;