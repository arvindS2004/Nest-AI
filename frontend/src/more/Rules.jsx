import React from 'react'
import "./Rules.css";
import Header from '../component/Home/Header';
import BottomTab from './BottomTab';
import MetaData from './Metadata';
import Footer from '../Footer';

const Rules = () => {
    return (
        <>
        <MetaData title="Rules" />
        <Header />
        <div className='rulesContainer'>
            <div className='rulesContent'>
                <div className='titleSection'>
                    <svg 
                        className='aiIcon'
                        xmlns="http://www.w3.org/2000/svg" 
                        width="48" 
                        height="48" 
                        fill="currentColor" 
                        viewBox="0 0 16 16"
                    >
                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                    </svg>
                    <h1 className='mainTitle'>Gen AI Recommendations</h1>
                </div>
                
                <div className='messageSection'>
                    
                    <p className='mainMessage'>
                       OOPS! <br /> We need some data of yours to start with the recommendations
                    </p>
                    <div className='subMessage'>
                        Help us provide you with personalized AI-powered suggestions
                    </div>
                </div>

                <div className='actionSection'>
                    <button className='getStartedBtn'>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="20" 
                            height="20" 
                            fill="currentColor" 
                            viewBox="0 0 16 16"
                        >
                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                        </svg>
                        Get Started
                    </button>
                </div>
            </div>
        </div>
        <Footer />
        <BottomTab />
        </>
    )
}

export default Rules