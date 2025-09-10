import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import './NestAI.css';
import MetaData from '../../more/Metadata';

import { addItemsToCart } from '../../actions/CartAction';
import { addFavouriteItemsToCart } from '../../actions/FavouriteAction';
import BottomTab from '../../more/BottomTab';
import ChatIcon from '@mui/icons-material/Chat';
import PsychologyIcon from '@mui/icons-material/Psychology';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AndroidIcon from '@mui/icons-material/Android';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteIcon from '@material-ui/icons/Favorite';
import RefreshIcon from '@material-ui/icons/Refresh';
import InfoIcon from '@material-ui/icons/Info';
import Header from '../Home/Header';
import Footer from '../../Footer';

const NestAI = ({ history }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false); // Changed from true to false
  const [error, setError] = useState('');
  const [userPreferences, setUserPreferences] = useState(null);
  const [hasGenerated, setHasGenerated] = useState(false); // Track if recommendations have been generated

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/login');
      return;
    }
    // Removed automatic fetchRecommendations call
  }, [isAuthenticated, history]);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      setError('');
      
      const { data } = await axios.get('/api/v2/nest-ai/recommendations');
      
      if (data.success) {
        setRecommendations(data.recommendations);
        setUserPreferences(data.userPreferences);
        setHasGenerated(true);
      } else {
        setError('Failed to fetch recommendations');
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setError(
        error.response?.data?.message || 
        'Failed to load personalized recommendations. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    if (product.Stock > 0) {
      dispatch(addItemsToCart(product._id, 1));
      toast.success(`${product.name} added to cart!`);
    } else {
      toast.error('Product is out of stock');
    }
  };

  const handleAddToWishlist = (product) => {
    dispatch(addFavouriteItemsToCart(product._id, 1));
    toast.success(`${product.name} added to wishlist!`);
  };

  const handleBackButton = () => {
    history.goBack();
  };

  const getConfidenceLevel = (confidence) => {
    if (confidence >= 0.8) return 'high';
    if (confidence >= 0.6) return 'medium';
    return 'low';
  };

  const getConfidenceText = (confidence) => {
    if (confidence >= 0.8) return 'Highly Recommended';
    if (confidence >= 0.6) return 'Good Match';
    return 'Worth Considering';
  };

  // Initial state - show welcome screen with generate button
  if (!hasGenerated && !loading && !error) {
    return (
      <>
        <MetaData title="NEST-AI - AI Recommendations" />
        <Header />
        <div className="nest-ai-container">
          <button className="bb5" onClick={handleBackButton}>
            <ArrowBackIcon />
            <span>Back</span>
          </button>

          <div className="nest-ai-header">
            <div className="pgt5">
              <SmartToyIcon className="aict" />
              <h1>NEST-AI</h1>
              <span className="subts">Your Personal Shopping Assistant</span>
            </div>
          </div>

          <div className="welcome-section">
            <div className="welcome-content">
              <h2>Ready to discover personalized recommendations?</h2>
              <p>Our AI will analyze your cart and wishlist to suggest products tailored just for you!</p>

              <div className="features-grid">
                <div className="feature-item">
                  <SmartToyIcon />
                  <h3>AI-Powered Analysis</h3>
                  <p>Advanced algorithms analyze your shopping patterns</p>
                </div>
                <div className="feature-item">
                  <PsychologyIcon />
                  <h3>Personalized Insights</h3>
                  <p>Get recommendations tailored to your preferences</p>
                </div>
               
              </div>
              
              <div className="sp">
                <button className="sparkle-button" onClick={fetchRecommendations}>
                  <span class="spark"></span>
                  <span class="backdrop"></span>
                  <svg class="sparkle" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z" fill="black" stroke="black" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z" fill="black" stroke="black" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z" fill="black" stroke="black" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                  <span class="text">Generate Recommendations</span>
                </button>
                <div class="bodydrop"></div>
                <span aria-hidden="true" class="particle-pen">
                  <svg class="particle" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.937 3.846L7.75 1L8.563 3.846C8.77313 4.58114 9.1671 5.25062 9.70774 5.79126C10.2484 6.3319 10.9179 6.72587 11.653 6.936L14.5 7.75L11.654 8.563C10.9189 8.77313 10.2494 9.1671 9.70874 9.70774C9.1681 10.2484 8.77413 10.9179 8.564 11.653L7.75 14.5L6.937 11.654C6.72687 10.9189 6.3329 10.2494 5.79226 9.70874C5.25162 9.1681 4.58214 8.77413 3.847 8.564L1 7.75L3.846 6.937C4.58114 6.72687 5.25062 6.3329 5.79126 5.79226C6.3319 5.25162 6.72587 4.58214 6.936 3.847L6.937 3.846Z" fill="black" stroke="black" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                </span>
              </div>
              
              
            </div>
          </div>
        </div>
        <Footer />
        <BottomTab />
      </>
    );
  }

  if (loading) {
    return (
      <>
        <MetaData title="Generating responses...." />
        <Header />
        <div className="nest-ai-container">
          <button className="bb5" onClick={handleBackButton}>
            <ArrowBackIcon />
            <span>Back</span>
          </button>

          <div className="nest-ai-header">
            <div className="pgt5">
              <SmartToyIcon className="aict" />
              <h1>NEST-AI</h1>
            </div>
          </div>

          <div className="loadc">
            <div className="ai-loading">          
              <h2>AI is analyzing your preferences...</h2>
              <p>Generating personalized recommendations based on your cart and wishlist</p>

              <div className="loader-wrapper loadic">
                <span className="loader-letter">G</span>
                <span className="loader-letter">e</span>
                <span className="loader-letter">n</span>
                <span className="loader-letter">e</span>
                <span className="loader-letter">r</span>
                <span className="loader-letter">a</span>
                <span className="loader-letter">t</span>
                <span className="loader-letter">i</span>
                <span className="loader-letter">n</span>
                <span className="loader-letter">g</span>
                <div className="loader"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <BottomTab />
      </>
    );
  }

  if (error) {
    return (
      <>
      <MetaData title="Error" />
      <Header />
      <div className="nest-ai-container">
        <div className="nest-ai-header">
          <button className="bb5" onClick={handleBackButton}>
            <ArrowBackIcon />
            <span>Back</span>
          </button>
          <div className="pgt5">
            <SmartToyIcon className="aict" />
            <h1>NEST-AI</h1>
          </div>
        </div>
        
        <div className="error-container">
          <div className="error-content">
            <InfoIcon className="erric" />
            <h2>Oops! Something went wrong</h2>
            <p>{error}</p>
            <button className="retbut" onClick={fetchRecommendations}>
              <RefreshIcon />
              Try Again
            </button>
          </div>
        </div>
       
      </div>
      <Footer/>
       <BottomTab />
      </>
    );
  }

  return (
    <>
    <MetaData title="NEST-AI recommendations" />
    <Header />
    <div className="nest-ai-container">
     
      <div className="nest-ai-header">
        <button className="bb5" onClick={handleBackButton}>
          <ArrowBackIcon />
          <span>Back</span>
        </button>
        
        <div className="pgt5">
          
          <h1>NEST-AI</h1>
          <span className="subts">Personalized for You</span>
        </div>

        <button className="refbut" onClick={fetchRecommendations}>
        
          <RefreshIcon />
        </button>
      </div>


      {userPreferences && (
        <div className="presummm">
          <div className="summcard">
            <h3>Your Shopping Insights</h3>
            <div className="insgrid">
              <div className="insit">
                <span className="insitnum">{userPreferences.totalCartItems}</span>
                
                <span className="insilab">Cart Items</span>
              </div>
              <div className="insit">
                <span className="insitnum">{userPreferences.totalWishlistItems}</span>
                
                <span className="insilab">Wishlist Items</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recommendations Section */}
      <div className="recsec">
        <div className="sechead">
          <h2>Recommended For You</h2>
          <p>Based on your cart and wishlist preferences</p>
        </div>

        {recommendations.length === 0 ? (
          <div className="norecc">
            <SmartToyIcon className="no-rec-icon" />
            <h3>No recommendations available</h3>
            <p>Add items to your cart or wishlist to get personalized suggestions!</p>
            <Link to="/products" className="bpbtn">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="recogr">
            {recommendations.map((rec, index) => (
              <div 
                key={rec.product._id} 
                className="recard"
                style={{'--card-index': index}}
              >
                <div className={`confidence-badge ${getConfidenceLevel(rec.confidence)}`}>
                  {getConfidenceText(rec.confidence)}
                </div>

                <Link to={`/product/${rec.product._id}`} className="product-image-link">
                  <div className="product-image-container">
                    <img
                      src={rec.product.images[0]?.url || '/placeholder-image.jpg'}
                      alt={rec.product.name}
                      className="product-image"
                      loading="lazy"
                    />
                    
                    {rec.product.offerPrice > 0 && (
                      <div className="disb">
                        {Math.round(((rec.product.price - rec.product.offerPrice) / rec.product.price) * 100)}% OFF 
                      </div>
                    )}
                  </div>
                </Link>

                <div className="prodet">
                  <Link to={`/product/${rec.product._id}`}>
                    <h3 className="prodnam">
                      {rec.product.name}
                      </h3>
                  </Link>
                  
                  <div className="prsec">
                    {rec.product.offerPrice > 0 ? (
                      <div className="priccontt">
                        <span className="offer-price">
                          ₹{rec.product.offerPrice}
                          </span>
                        <span className="original-price">
                          ₹{rec.product.price}
                          </span>
                      </div>
                     ):(
                      <span className="regular-price">₹{rec.product.price}</span> 
                    )}
                  </div>


                  <div className="ai-recommendation">
                    <div className="recreas">
                      <AndroidIcon className="ai-mini-icon" />
                      <p>
                        {rec.reason} 
                        </p>
                    </div>
                    
                    <div className="health-note">
                      <PsychologyIcon className="health-icon"/>
                      <p>
                        {rec.healthNote}                       
                        </p>
                    </div>
                  </div>


                  <div className="actbuts">
                    <button
                      className={`addbtnc ${rec.product.Stock < 1 ? 'disabled' : ''}`}
                      onClick={() => handleAddToCart(rec.product)}
                      disabled={rec.product.Stock < 1}
                    >
                      <ShoppingCartIcon />
                      {rec.product.Stock < 1 ? 'Out of Stock' : 'Add to Cart'} 
                    </button>
                    
                    <button
                      className="addwnc"
                      onClick={() => handleAddToWishlist(rec.product)}
                    >
                      <FavoriteIcon />
                    </button>
                  </div>
                </div>
              </div>
             ))} 
          </div>
        )}

          
        
      </div>

      <div className="continue-shopping-section">
  <Link to="/products" className="continue-shopping-btn">
    <p>Browse More Products</p>
  </Link>
</div>


    </div>
    <Footer/>
      <BottomTab />
    </>
  );
};

export default NestAI;