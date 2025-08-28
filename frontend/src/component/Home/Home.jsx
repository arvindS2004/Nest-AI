import React, { useEffect, useState } from "react";
import "./Home.css";
import slides from "../../Assets/data.js"; 
import ProductCard from "../Products/ProductCard";
import  {useDispatch, useSelector} from "react-redux"
import { clearErrors, getProduct } from "../../actions/ProductActions";
import Header from "./Header";
import MetaData from "../../more/Metadata";
import Footer from "../../Footer";
import BottomTab from "../../more/BottomTab";
import Loading from "../../more/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSwipeable } from 'react-swipeable';

const Home = () => {
  const dispatch = useDispatch();
  const [currentSlide, setCurrentSlide] = useState(0);
  const { products,error,loading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const goToNextSlide = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  };

  const goToPrevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  const selectSlide = (index) => {
    setCurrentSlide(index);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: goToNextSlide,
    onSwipedRight: goToPrevSlide,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true 
  });

   useEffect(() => {
    if(error){ 
      toast.error(error);
      dispatch(clearErrors());
 }
  dispatch(getProduct());
   }, [dispatch,error])
   
  return (
    <>
    {loading ? (
      <Loading />
    )
    : (
      <>
      <MetaData title="Home" />
      <Header />
        
        <div {...swipeHandlers} className="banner">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide.img})` }}
            >
         <div className="home__content">
  <div className="home__contentBox">
    <h2 className="home__title">{slide.text}</h2>
    <p className="home__sub">Discover, Decide and Get the Best Recommendations</p>
    <a href="#container">
      <button className="Home__button">SHOP NOW</button>
    </a>
  </div>
</div>


                
              </div>
          ))}

          <button className="prev" onClick={goToPrevSlide}>←</button>
          <button className="next" onClick={goToNextSlide}>→</button>

          <div className="dots">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => selectSlide(index)}
              ></span>
            ))}
          </div>
        </div>
 
      <h2 className="homeHeading">Featured Products</h2>
      <div className="container" id="container">
        {products && products.slice(0, 8).map((product) =>(
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
       <h2 className="homeHeading">AI Recommendations</h2>
      <ToastContainer 
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
      <Footer />
      <BottomTab />
      </>    
    )}
    </>
  );
};

export default Home;