import React, { useEffect } from 'react';
import "./Favourite.css";
import { useSelector, useDispatch } from "react-redux";
import { deleteFavouriteItemsToCart, loadFavouritesFromDatabase } from "../../actions/FavouriteAction";
import { Typography } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import RemoveShoppingCartIcon from "@material-ui/icons/FavoriteBorder";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import FavouriteItemsCard from './FavouriteItemsCard.jsx';
import MetaData from '../../more/Metadata';
import Loading from '../../more/Loader';
import BottomTab from '../../more/BottomTab';

const Favourite = ({ history }) => {
    const dispatch = useDispatch();

    const { isAuthenticated } = useSelector((state) => state.user);
    const { favouriteItems, loading, error } = useSelector((state) => state.favourite);

    const deleteFavouriteItems = (id) => {
        dispatch(deleteFavouriteItemsToCart(id));
    };

    const handleBackButton = () => {
        history.goBack();
    };

    // Load favourites when component mounts (as backup)
    useEffect(() => {
        if (isAuthenticated && favouriteItems.length === 0) {
            dispatch(loadFavouritesFromDatabase());
        }
    }, [dispatch, isAuthenticated, favouriteItems.length]);

    return (
        <>
            {loading ? (
                <div className="loading-container">
                    <Loading />
                </div>
            ) : (
                <>
                    <MetaData title="My Favourites" />
                    
                    <div className="favourites-wrapper">
                        
                        <div className="favourites-header-section">
                            <button className="back-button" onClick={handleBackButton} aria-label="Go back">
                                <ArrowBackIcon className="back-icon" />
                                <span className="back-text">Back</span>
                            </button>
                            
                            <div className="page-title">
                                <FavoriteIcon className="title-icon" />
                                <h1>My Favourites</h1>
                                {favouriteItems.length > 0 && (
                                    <span className="items-count">
                                        {favouriteItems.length} {favouriteItems.length === 1 ? 'item' : 'items'}
                                    </span>
                                )}
                            </div>
                        </div>

                        {error && (
                            <div className="error-banner">
                                <Typography color="error" className="error-text">
                                    {error}
                                </Typography>
                            </div>
                        )}

                        {favouriteItems.length === 0 ? (
                            <div className="empty-favourites">
                                <div className="empty-content">
                                    <div className="empty-icon">
                                        <RemoveShoppingCartIcon />
                                    </div>
                                    <h2 className="empty-title">No Items in Favourites</h2>
                                    <p className="empty-description">
                                        Start adding products to your favourites to see them here
                                    </p>
                                    <Link to="/products" className="browse-products-btn">
                                        Browse Products
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="favourites-content">
                               
                                <div className="favourites-table-header">
                                    <div className="header-cell product-header">Product</div>
                                    <div className="header-cell price-header">Price</div>
                                    <div className="header-cell stock-header">Stock</div>
                                    <div className="header-cell action-header">Actions</div>
                                </div>
                                
                                <div className="favourites-list">
                                    {favouriteItems.map((item, index) => (
                                        <div 
                                            className="favourite-item-wrapper" 
                                            key={item.product}
                                            style={{'--item-index': index}}
                                        >
                                            <FavouriteItemsCard 
                                                item={item} 
                                                deleteFavouriteItems={deleteFavouriteItems} 
                                            />
                                        </div>
                                    ))}
                                </div>
                                
                                {/* Action Section */}
                                <div className="favourites-actions">
                                    <div className="action-summary">
                                        <span className="total-items">
                                            Total: {favouriteItems.length} {favouriteItems.length === 1 ? 'item' : 'items'}
                                        </span>
                                    </div>
                                    <Link to="/products" className="continue-shopping-btn">
                                        Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        )}
                        
                        <BottomTab />
                    </div>
                </>
            )}
        </> 
    );
};

export default Favourite;