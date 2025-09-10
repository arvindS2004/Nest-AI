import React from 'react'
import { useState } from 'react';
import "./Rules.css";
import Header from '../component/Home/Header';
import BottomTab from './BottomTab';
import MetaData from './Metadata';
import Footer from '../Footer';

const Rules = () => {
    const [openQuestion, setOpenQuestion] = useState(null);

    const toggleQuestion = (index) => {
        setOpenQuestion(openQuestion === index ? null : index);
    };

    const faqData = [
        {
            question: "What is this platform and how does it work?",
            answer: "Our platform provides a comprehensive solution for users to access various services and features. Simply create an account, explore the available options, and start using the tools that best fit your needs. The interface is designed to be intuitive and user-friendly."
        },
        {
            question: "How do I create an account and get started?",
            answer: "Getting started is easy! Click the 'Sign Up' button, provide your email address and create a secure password. You'll receive a verification email to confirm your account. Once verified, you can log in and begin exploring all the features available to you."
        },
        {
            question: "Is my personal information and data secure?",
            answer: "Absolutely! We take data security very seriously. All personal information is encrypted and stored securely. We follow industry-standard security protocols and never share your personal data with third parties without your explicit consent. Your privacy is our priority."
        },
        {
            question: "What are the pricing plans and payment options?",
            answer: "We offer flexible pricing plans to suit different needs, including a free tier with basic features and premium plans with advanced functionality. Payment can be made via credit card, PayPal, or bank transfer. All plans come with a 30-day money-back guarantee."
        },
        {
            question: "How can I contact customer support if I need help?",
            answer: "Our support team is here to help! You can reach us through multiple channels: email support at support@company.com, live chat available 24/7 on our website, or submit a support ticket through your account dashboard. We typically respond within 24 hours."
        }
    ];

    return (
        <>
            <MetaData title="FAQ - Frequently Asked Questions" />
            <Header />
            
            <div className="faq-container">
                <div className="faq-header">
                    <h1>Frequently Asked Questions</h1>
                    <p>Find answers to common questions about our platform and services.</p>
                </div>
                
                <div className="faq-content">
                    {faqData.map((faq, index) => (
                        <div key={index} className="faq-item">
                            <div 
                                className="faq-question"
                                onClick={() => toggleQuestion(index)}
                            >
                                <h3>{faq.question}</h3>
                                <span className={`faq-toggle ${openQuestion === index ? 'open' : ''}`}>
                                    {openQuestion === index ? '−' : '+'}
                                </span>
                            </div>
                            <div className={`faq-answer ${openQuestion === index ? 'open' : ''}`}>
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="faq-footer">
                    <h3>Still have questions?</h3>
                    <p>Can't find what you're looking for? Our support team is ready to help!</p>
                    <button className="contact-support-btn">Contact Support</button>
                </div>
            </div>
            
            <Footer />
            <BottomTab />
        </>
    )
}

export default Rules