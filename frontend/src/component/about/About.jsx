import React from "react";
import { useSelector } from "react-redux";
import Footer from "../../Footer";
import Header from "../Home/Header";
import Loading from "../../more/Loader";
import MetaData from "../../more/Metadata";
import "./About.css";
import BottomTab from "../../more/BottomTab";

const About = () => {
    const { loading } = useSelector(
        (state) => state.profile
      );
  return (
    <>
    {loading ? <Loading /> : 
    <>
    <MetaData title="About" />
    <div>
    <Header />
    <div
      style={{
        width: "90%",
        margin: "0px auto",
      }}
    >
      <div className="about__page">
        <div className="row flex"> 
          <div className="col__2">
            <img src="https://i.pinimg.com/1200x/59/b2/35/59b2351eaff7cd5d926a873873eb40f2.jpg" />
          </div>
          <div className="col__2">
            <div className="meta">
              <span
                style={{
                  fontSize: "40px",
                  fontWeight: "700",
                  lineHeight: "1.2",
                }}
              >
                Welcome to Nest
              </span>
              <p>
                The Future of Grocery Shopping
At NEST, we believe grocery shopping should be effortless, personalized, and intelligent. Founded with the vision of transforming how families stock their kitchens, NEST combines the convenience of online shopping with cutting-edge AI technology to create a truly revolutionary grocery experience.
              </p>
               <span
                style={{
                  fontSize: "40px",
                  fontWeight: "700",
                  lineHeight: "1.2",
                }}
              >
                Our Story
              </span>
              <p>
                NEST was born from a simple observation: grocery shopping shouldn't be a chore filled with forgotten items, impulse purchases, and endless aisles. Our founders, passionate technologists and busy parents themselves, envisioned a world where your grocery store knows your family's needs better than you do – and delivers exactly what you need, when you need it.
              </p>
            </div>
          </div>
        </div>
<br />
        <div className="second">
          <div className="heading">
            <h2>What We Provide?</h2>
          </div>
          <div className="row flex">
            <div className="col__3">
                <div style={{
                    padding:"10px",
                    border:"1px solid rgb(0 0 0 / 14%)",
                    minHeight:"230px"
                }}>
                <div className="flex align__items__center justify__content__center image">
              <img src="http://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/icon-1.svg" />
                </div>
              <span>AI-Powered Intelligence</span>
              <p>
                Our advanced recommendation system learns from your shopping patterns, dietary preferences, seasonal needs, and even local trends to suggest products you'll love before you even know you need them. 
              </p>
              </div>
            </div>
            
            <div className="col__3">
                <div style={{
                    padding:"15px",
                    border:"1px solid rgb(0 0 0 / 14%)",
                    minHeight:"230px"
                }}>
                <div className="flex align__items__center justify__content__center image">
              <img src="http://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/icon-3.svg" />
                </div>
              <span>Your Personal Shopping Coach</span>
              <p>
                Meet NEST AI - your friendly digital nutritionist who provides personalized insights and gentle guidance. 
              </p>
              </div>
            </div>


            <div className="col__3">
                <div style={{
                    padding:"15px",
                    border:"1px solid rgb(0 0 0 / 14%)",
                    minHeight:"230px"
                }}>
                <div className="flex align__items__center justify__content__center image">
              <img src="http://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/icon-4.svg" />
                </div>
              <span>Building Your Perfect Neste</span>
              <p>
                Just like how birds carefully select the best materials for their nest, we help you curate the perfect selection of groceries for your home. 
              </p>
              </div>
            </div>

            
            
            <div className="col__3">
                <div style={{
                    padding:"15px",
                    border:"1px solid rgb(0 0 0 / 14%)",
                    minHeight:"230px"
                }}>
                <div className="flex align__items__center justify__content__center image">
              <img src="http://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/icon-6.svg" />
                </div>
              <span>Sustainable & Smart</span>
              <p>
                We're committed to reducing food waste through intelligent inventory management and helping our customers make environmentally conscious choices through our green product recommendations.
              </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
  <BottomTab />
  </>
    }
    </>
  );
};

export default About;
