import React, { useRef, useEffect, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { favouriteItems } = useSelector((state) => state.favourite);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const switcherTab = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="header-content">

    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      {/* Top Bar */}
      <div className="header__topbar">
        <div className="header__container">
          {/* Logo */}
          <div className="header__logo">
            <Link to="/" className="logo-link">
              <img
                src="http://wp.alithemes.com/html/nest/demo/assets/imgs/theme/logo.svg"
                alt="Nest Logo"
                className="logo-image"
              />
            </Link>
          </div>

          <div className="header__banner">
            <div className="banner-content">
              <div className="marquee-container">
                <div className="marquee-text">
                  🛍️ Welcome to the NEST! Find your favorites here ✨ Get the best AI recommendation! 🎉 Free access to the AI chatbot 🤖
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="header__contact">
            <div className="contact-item">
              <svg
                className="contact-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
              </svg>
              <span className="contact-text">
                <strong>Email:</strong> temp123@gmail.com
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="header__navbar" ref={switcherTab}>
        <div className="header__container">
          {/* Navigation Links */}
          <div className="header__navigation">
            <ul className={`nav-list ${isMobileMenuOpen ? 'nav-list--open' : ''}`}>
              <li className="natem">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="natem">
                <Link to="/about" className="nav-link">About</Link>
              </li>
              <li className="natem">
                <Link to="/Products" className="nav-link">Products</Link>
              </li>
              {/* <li className="natem">
                <Link to="/creator" className="nav-link">Become A Seller</Link>
              </li> */}
              <li className="natem">
                <Link to="/faq" className="nav-link">NEST - AI</Link>
              </li>
              <li className="natem">
                <Link to="/contact" className="nav-link">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Right Side Actions */}
          <div className="header__actions">
            {/* Search */}
            <Link to="/search" className="action-link" title="Search">
              <svg
                className="action-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </Link>

            {/* Favorites */}
            <Link to="/favourites" className="action-link action-link--with-badge" title="Favorites">
              <svg
                className="action-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
              </svg>
              {favouriteItems.length > 0 && (
                <span className="action-badge">{favouriteItems.length}</span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="action-link action-link--with-badge" title="Shopping Cart">
              <svg
                className="action-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
              {cartItems.length > 0 && (
                <span className="action-badge">{cartItems.length}</span>
              )}
            </Link>

            {/* User Account */}
            <Link to="/login" className="action-link" title="Account">
              <svg
                className="action-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
              </svg>
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className="mobile-menu-toggle"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <span className={`hamburger ${isMobileMenuOpen ? 'hamburger--open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>
      </nav>
    </header>
    </div>
  );
};

export default Header;