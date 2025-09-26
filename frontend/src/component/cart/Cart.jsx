// import React from "react";
// import "./Cart.css";
// import { useSelector, useDispatch } from "react-redux";
// import { addItemsToCart, removeItemsFromCart } from "../../actions/CartAction";
// import { Typography } from "@material-ui/core";
// import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
// import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
// import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// import AddIcon from "@material-ui/icons/Add";
// import RemoveIcon from "@material-ui/icons/Remove";
// import PaymentIcon from "@material-ui/icons/Payment";
// import { Link } from "react-router-dom";
// import CartItemCard from "./CartItemCard.js";
// import BottomTab from "../../more/BottomTab";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Cart = ({ history }) => {
//   const dispatch = useDispatch();
//   const { cartItems } = useSelector((state) => state.cart);

//   // Calculate totals
//   const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
//   const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
//   const tax = subtotal * 0.18; // 18% tax
//   const shipping = subtotal > 1000 ? 0 : 100; // Free shipping over $1000
//   const totalPrice = subtotal + tax + shipping;

//   const increaseQuantity = (id, quantity, stock) => {
//     const newQty = quantity + 1;
//     if (stock <= quantity) {
//       return toast.error("Product Stock Limited", {
//         position: "bottom-center",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//     }
//     dispatch(addItemsToCart(id, newQty));
//     toast.success("Quantity increased", {
//       position: "bottom-center",
//       autoClose: 2000,
//       hideProgressBar: true,
//     });
//   };

//   const decreaseQuantity = (id, quantity) => {
//     const newQty = quantity - 1;
//     if (1 >= quantity) {
//       return;
//     }
//     dispatch(addItemsToCart(id, newQty));
//     toast.info("Quantity decreased", {
//       position: "bottom-center",
//       autoClose: 2000,
//       hideProgressBar: true,
//     });
//   };

//   const deleteCartItems = (id) => {
//     dispatch(removeItemsFromCart(id));
//     toast.error("Item removed from cart", {
//       position: "bottom-center",
//       autoClose: 3000,
//       hideProgressBar: false,
//     });
//   };

//   const checkoutHandler = () => {
//     history.push("/login?redirect=shipping");
//   };

//   const handleBackButton = () => {
//     history.goBack();
//   };

//   return (
//     <>
//       <div className="cart-wrapper">
//         {/* Header Section */}
//         <div className="cart-header-section">
//           <button className="back-button" onClick={handleBackButton} aria-label="Go back">
//             <ArrowBackIcon className="back-icon" />
//             <span className="back-text">Back</span>
//           </button>
          
//           <div className="page-title">
//             <ShoppingCartIcon className="title-icon" />
//             <h1>Shopping Cart</h1>
//             {cartItems.length > 0 && (
//               <span className="items-count">
//                 {totalItems} {totalItems === 1 ? 'item' : 'items'}
//               </span>
//             )}
//           </div>
//         </div>

//         {cartItems.length === 0 ? (
//           <div className="empty-cart">
//             <div className="empty-content">
//               <div className="empty-icon">
//                 <RemoveShoppingCartIcon />
//               </div>
//               <h2 className="empty-title">Your Cart is Empty</h2>
//               <p className="empty-description">
//                 Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
//               </p>
//               <Link to="/products" className="browse-products-btn">
//                 Browse Products
//               </Link>
//             </div>
//           </div>
//         ) : (
//           <div className="cart-content">
//             {/* Desktop Table Header */}
//             <div className="cart-table-header">
//               <div className="header-cell product-header">Product</div>
//               <div className="header-cell quantity-header">Quantity</div>
//               <div className="header-cell subtotal-header">Subtotal</div>
//             </div>

//             {/* Cart Items List */}
//             <div className="cart-items-list">
//               {cartItems.map((item, index) => (
//                 <div 
//                   className="cart-item-wrapper" 
//                   key={item.product}
//                   style={{'--item-index': index}}
//                 >
//                   <div className="cart-item-container">
//                     {/* Product Section */}
//                     <div className="cart-product-section">
//                       <CartItemCard item={item} deleteCartItems={deleteCartItems} />
//                     </div>

//                     <div className="cart-quantity-section">
//                       <div className="quantity-controls">
//                         <button
//                           className="quantity-btn decrease"
//                           onClick={() => decreaseQuantity(item.product, item.quantity)}
//                           disabled={item.quantity <= 1}
//                           aria-label="Decrease quantity"
//                         >
//                           <RemoveIcon />
//                         </button>
//                         <input 
//                           type="number" 
//                           readOnly 
//                           value={item.quantity} 
//                           className="quantity-input"
//                           aria-label={`Quantity: ${item.quantity}`}
//                         />
//                         <button
//                           className="quantity-btn increase"
//                           onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}
//                           disabled={item.stock <= item.quantity}
//                           aria-label="Increase quantity"
//                         >
//                           <AddIcon />
//                         </button>
//                       </div>
//                       <span className="stock-info">
//                         {item.stock <= item.quantity ? (
//                           <span className="stock-limited">Stock Limited</span>
//                         ) : item.stock <= 5 ? (
//                           <span className="stock-low">Only {item.stock} left</span>
//                         ) : (
//                           <span className="stock-available">In Stock</span>
//                         )}
//                       </span>
//                     </div>

//                     <div className="cart-subtotal-section">
//                       <span className="subtotal-amount">
//                         ₹{(item.price * item.quantity).toLocaleString()}
//                       </span>
//                       <span className="unit-price">
//                         ₹{item.price} each
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Cart Summary */}
//             <div className="cart-summary">
//               <div className="summary-content">
//                 <div className="summary-section">
//                   <h3 className="summary-title">Order Summary</h3>
                  
//                   <div className="summary-row">
//                     <span className="summary-label">Subtotal ({totalItems} items):</span>
//                     <span className="summary-value">₹{subtotal.toLocaleString()}</span>
//                   </div>
                  
//                   <div className="summary-row">
//                     <span className="summary-label">Tax (18%):</span>
//                     <span className="summary-value">₹{tax.toFixed(0)}</span>
//                   </div>
                  
//                   <div className="summary-row">
//                     <span className="summary-label">Shipping:</span>
//                     <span className="summary-value">
//                       {shipping === 0 ? (
//                         <span className="free-shipping">FREE</span>
//                       ) : (
//                         `₹${shipping}`
//                       )}
//                     </span>
//                   </div>
                  
                 
                  
                  
//                   <div className="summary-row total-row">
//                     <span className="summary-label total-label">Total:</span>
//                     <span className="summary-value total-value">₹{totalPrice.toLocaleString()}</span>
//                   </div>
//                 </div>

//                 <div className="checkout-section">
//                   <button 
//                     className="checkout-btn"
//                     onClick={checkoutHandler}
//                     aria-label="Proceed to checkout"
//                   >
//                     <PaymentIcon className="checkout-icon" />
//                     <span className="checkout-text">Proceed to Checkout</span>
//                   </button>
                  
//                   <Link to="/products" className="continue-shopping-btn">
//                     Continue Shopping
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
        
//         <BottomTab />
//       </div>

      
//     </>
//   );
// };

// export default Cart;




import React from "react";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/CartAction";
import { createOrder } from "../../actions/OrderAction";
import { useHistory } from "react-router-dom";

import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import PaymentIcon from "@material-ui/icons/Payment";
import { Link } from "react-router-dom";
import CartItemCard from "./CartItemCard.js";
import BottomTab from "../../more/BottomTab";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = ({ history }) => {
  const dispatch = useDispatch();
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);


  // Calculate totals
  const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const tax = subtotal * 0.18; // 18% tax
  const shipping = subtotal > 1000 ? 0 : 100; // Free shipping over $1000
  const totalPrice = subtotal + tax + shipping;

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return toast.error("Product Stock Limited", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    dispatch(addItemsToCart(id, newQty));
    toast.success("Quantity increased", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
    });
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
    toast.info("Quantity decreased", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
    });
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
    toast.error("Item removed from cart", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
    });
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  // inside Cart.jsx (replace your confirmAndCheckout)
const confirmAndCheckout = async () => {
  // map cart items to the Order model fields
  const orderItems = cartItems.map((item) => ({
    productName: item.name,        // maps to orderSchema.productName
    productPrice: item.price,      // maps to orderSchema.productPrice
    quantity: item.quantity,       // maps to orderSchema.quantity
    productImage: item.image,      // maps to orderSchema.productImage
    productId: item.product,       // maps to orderSchema.productId (ObjectId string)
  }));

  const orderData = {
    shippingInfo,
    orderItems,
    paymentInfo: {
      id: "2",
      status: "success",
    },
    itemsPrice: subtotal,
    taxPrice: tax,
    shippingPrice: shipping,
    totalPrice: totalPrice,
  };

  console.log("🛒 Cart Items Before Order:", cartItems);
  console.log("➡️ Payload orderData:", orderData);

  // If your createOrder action returns a promise, await it so you can redirect only on success.
  try {
    await dispatch(createOrder(orderData)); // make sure createOrder returns a Promise
    toast.success("Order placed successfully!", {
      position: "bottom-center",
      autoClose: 3000,
    });
    history.push("/orders");
  } catch (err) {
    toast.error("Failed to place order: " + (err.message || "Unknown error"), {
      position: "bottom-center",
      autoClose: 4000,
    });
    // optionally handle error state
  }
};



  const handleBackButton = () => {
    history.goBack();
  };

  return (
    <>
      <div className="cart-wrapper">
        {/* Header Section */}
        <div className="cart-header-section">
          <button className="back-button" onClick={handleBackButton} aria-label="Go back">
            <ArrowBackIcon className="back-icon" />
            <span className="back-text">Back</span>
          </button>
          
          <div className="page-title">
            <ShoppingCartIcon className="title-icon" />
            <h1>Shopping Cart</h1>
            {cartItems.length > 0 && (
              <span className="items-count">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-content">
              <div className="empty-icon">
                <RemoveShoppingCartIcon />
              </div>
              <h2 className="empty-title">Your Cart is Empty</h2>
              <p className="empty-description">
                Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
              </p>
              <Link to="/products" className="browse-products-btn">
                Browse Products
              </Link>
            </div>
          </div>
        ) : (
          <div className="cart-content">
            {/* Desktop Table Header */}
            <div className="cart-table-header">
              <div className="header-cell product-header">Product</div>
              <div className="header-cell quantity-header">Quantity</div>
              <div className="header-cell subtotal-header">Subtotal</div>
            </div>

            {/* Cart Items List */}
            <div className="cart-items-list">
              {cartItems.map((item, index) => (
                <div 
                  className="cart-item-wrapper" 
                  key={item.product}
                  style={{'--item-index': index}}
                >
                  <div className="cart-item-container">
                    {/* Product Section */}
                    <div className="cart-product-section">
                      <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                    </div>

                    <div className="cart-quantity-section">
                      <div className="quantity-controls">
                        <button
                          className="quantity-btn decrease"
                          onClick={() => decreaseQuantity(item.product, item.quantity)}
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          <RemoveIcon />
                        </button>
                        <input 
                          type="number" 
                          readOnly 
                          value={item.quantity} 
                          className="quantity-input"
                          aria-label={`Quantity: ${item.quantity}`}
                        />
                        <button
                          className="quantity-btn increase"
                          onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}
                          disabled={item.stock <= item.quantity}
                          aria-label="Increase quantity"
                        >
                          <AddIcon />
                        </button>
                      </div>
                      <span className="stock-info">
                        {item.stock <= item.quantity ? (
                          <span className="stock-limited">Stock Limited</span>
                        ) : item.stock <= 5 ? (
                          <span className="stock-low">Only {item.stock} left</span>
                        ) : (
                          <span className="stock-available">In Stock</span>
                        )}
                      </span>
                    </div>

                    <div className="cart-subtotal-section">
                      <span className="subtotal-amount">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                      <span className="unit-price">
                        ₹{item.price} each
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="cart-summary">
              <div className="summary-content">
                <div className="summary-section">
                  <h3 className="summary-title">Order Summary</h3>
                  
                  <div className="summary-row">
                    <span className="summary-label">Subtotal ({totalItems} items):</span>
                    <span className="summary-value">₹{subtotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="summary-row">
                    <span className="summary-label">Tax (18%):</span>
                    <span className="summary-value">₹{tax.toFixed(0)}</span>
                  </div>
                  
                  <div className="summary-row">
                    <span className="summary-label">Shipping:</span>
                    <span className="summary-value">
                      {shipping === 0 ? (
                        <span className="free-shipping">FREE</span>
                      ) : (
                        `₹${shipping}`
                      )}
                    </span>
                  </div>
                  
                 
                  
                  
                  <div className="summary-row total-row">
                    <span className="summary-label total-label">Total:</span>
                    <span className="summary-value total-value">₹{totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <div className="checkout-section">
                  <button 
  className="checkout-btn"
  onClick={confirmAndCheckout}
  aria-label="Confirm and Checkout"
>
  <PaymentIcon className="checkout-icon" />
  <span className="checkout-text">Confirm and Checkout</span>
</button>

                  
                  <Link to="/products" className="continue-shopping-btn">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <BottomTab />
      </div>

      
    </>
  );
};

export default Cart;