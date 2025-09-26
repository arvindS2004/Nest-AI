import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import Footer from "../../Footer";
import Header from "../Home/Header";
import MetaData from "../../more/Metadata";
import Loading from "../../more/Loader";
import "./Profile.css";
import BottomTab from "../../more/BottomTab";

const Profile = ({history }) => {

const { user, loading, isAuthenticated } = useSelector((state) => state.user);

const { orders } = useSelector((state) => state.myOrder);

useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);

    return (
        <>
       {loading ? (<Loading />):(
        <>
        <Header />
        <div id="profile-main-container">
            <MetaData title={`${user.name}'s profile`} />
            
            <div id="profile-dashboard">
                
                <div id="profile-sidebar">
                    <div id="profile-user-card">
                        <div id="profile-avatar-section">
                            <div id="avatar-wrapper">
                                <img src={user.avatar.url} alt={user.name} id="user-avatar-img" />
                                <div id="avatar-status-indicator"></div>
                            </div>
                            <div id="user-info-basic">
                                <h2 id="user-display-name">{user.name}</h2>
                                <p id="user-email-display">{user.email}</p>
                                <div id="user-status-badge">
                                    <span id="status-dot"></span>
                                    <span id="status-text">Active</span>
                                </div>
                            </div>
                        </div>
                        
                        <Link to="/me/update/info" id="edit-profile-btn">
                            
                            Edit Profile
                        </Link>
                    </div>


                    <div id="profile-nav-menu">
                        <h3 id="nav-menu-title">Account</h3>
                        <nav id="profile-navigation">
                            <Link to="/orders" id="nav-orders" className="nav-item">
  
  <div id="orders-nav-text">My Orders</div>
  <div id="orders-nav-badge">{orders ? orders.length : 0}</div>
</Link>

                            
                            
                            <Link to="/favourites" id="nav-wishlist" className="nav-item">
                              
                                <div id="wishlist-nav-text">Wishlist</div>
                            </Link>
                            
                            <Link to="/me/update" id="nav-security" className="nav-item">
                               
                                <div id="security-nav-text">Change Password</div>
                            </Link>
                            
                            <Link to="/nest-ai" id="nav-settings" className="nav-item">
                              <div id="settings-nav-text">Nest-AI Recommendations</div>
                            </Link>
                        </nav>
                    </div>
                </div>

                <div id="profile-main-content">
                    
                    <div id="profile-welcome-section">
                        <div id="welcome-content">
                            <h1 id="welcome-title">Welcome back, {user.name.split(' ')[0]}!</h1>
                            <p id="welcome-subtitle">Manage your account and track your activity</p>
                        </div>
                        <div id="welcome-decoration">
                            <div id="deco-circle-1"></div>
                            <div id="deco-circle-2"></div>
                            <div id="deco-circle-3"></div>
                        </div>
                    </div>

                    


                    <div id="account-details-section">
                        <div id="details-header">
                            <h2 id="details-title">Account Information</h2>
                            <p id="details-subtitle">Your personal details and preferences</p>
                        </div>
                        
                        <div id="details-grid">
                            <div id="detail-item-name" className="detail-item">
                                <div id="detail-name-label" className="detail-label">
                                    
                                    Full Name
                                </div>
                                <div id="detail-name-value" className="detail-value">
                                    {user.name}
                                </div>
                            </div>
                            
                            <div id="detail-item-email" className="detail-item">
                                <div id="detail-email-label" className="detail-label">
                                   
                                    Email Address
                                </div>
                                <div id="detail-email-value" className="detail-value">
                                    {user.email}
                                </div>
                            </div>
                            
                            <div id="detail-item-joined" className="detail-item">
                                <div id="detail-joined-label" className="detail-label">
                                    
                                    Member Since
                                </div>
                                <div id="detail-joined-value" className="detail-value">
                                    {new Date(user.createdAt).toLocaleDateString('en-US', { 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                    })}
                                </div>
                            </div>
                            
                            <div id="detail-item-status" className="detail-item">
                                <div id="detail-status-label" className="detail-label">
                                    
                                    Account Status
                                </div>
                                <div id="detail-status-value" className="detail-value">
                                    <span id="status-active-badge">Active Premium</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile Layout */}
<div className="profile-mobile">
  <div className="mobile-header">
    <button className="back-btn" onClick={() => history.goBack()}>←</button>
    <h2>Profile</h2>
  </div>

  <div className="mobile-card">
    <img src={user.avatar.url} alt={user.name} className="mobile-avatar" />
    <h3 className="mobile-name">{user.name}</h3>
    <p className="mobile-role">Active</p>

    <div className="mobile-stats">
      <div>
        <h4>1000</h4>
        <p>Followers</p>
      </div>
      <div>
        <h4>1200</h4>
        <p>Following</p>
      </div>
    </div>
  </div>

  <div className="mobile-info">
    <p><strong>Email:</strong> {user.email}</p>
    <p><strong>Mobile:</strong> 1234567891</p>
    <p><strong>Twitter:</strong> @james012</p>
    <p><strong>Behance:</strong> behance.net/james012</p>
    <p><strong>Facebook:</strong> facebook.com/james012</p>
  </div>
</div>

        </div>
        <Footer />
        <BottomTab />
        </>
       )}
       </>
    )
}

export default Profile