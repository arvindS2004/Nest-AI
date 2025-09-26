import React, { useState, useEffect } from 'react';
import './Testim.css';

const Testim = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const testimonials = [
  {
    id: 1,
    text: "The personalized grocery recommendations are spot on! NEST saves me so much time by suggesting items I actually need, based on my past purchases.",
    author: "Neerav Modi",
    position: "Working Professional"
  },
  {
    id: 2,
    text: "Shopping for groceries has never been this easy. The AI suggestions are smart and the entire website experience is smooth and intuitive.",
    author: "Leon S. Kennedy",
    position: "Fitness Coach"
  },
  {
    id: 3,
    text: "I love how the platform remembers my preferences. I get my essentials faster without browsing endlessly. Great innovation in online grocery shopping!",
    author: "SARAH JOHNSON",
    position: "Homemaker"
  },
  {
    id: 4,
    text: "NEST has completely changed how I shop for groceries online. The NEST-AI assistant recommends exactly what I need, and delivery is always prompt.",
    author: "Gary Oak",
    position: "Tech Enthusiast"
  },
  {
    id: 5,
    text: "From fresh produce to pantry staples, everything is just a click away. The AI-powered recommendations feel personal and accurate. Highly recommend it!",
    author: "Tejpratap Yadav",
    position: "Nutritionist"
  }
]
;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToNext = () => {
    setCurrentTestimonial(currentTestimonial === testimonials.length - 1 ? 0 : currentTestimonial + 1);
  };

  const goToPrev = () => {
    setCurrentTestimonial(currentTestimonial === 0 ? testimonials.length - 1 : currentTestimonial - 1);
  };

  const selectTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  return (
    <div className="testimonial-section">
      <div className="testimonial-container">
        <h2 className="testimonial-title">Testimonial</h2>
        
        <div className="testimonial-content">
          <button className="testimonial-nav prev-btn" onClick={goToPrev}>
            <span>&#8249;</span>
          </button>
          
          <div className="testimonial-main">
            <div className="testimonial-text">
              "{testimonials[currentTestimonial].text}"
            </div>
            
            <div className="testimonial-author">
              <span className="author-name">{testimonials[currentTestimonial].author}</span>
              <span className="author-position"> - {testimonials[currentTestimonial].position}</span>
            </div>
          </div>
          
          <button className="testimonial-nav next-btn" onClick={goToNext}>
            <span>&#8250;</span>
          </button>
        </div>
        
        <div className="testimonial-dots">
          {testimonials.map((_, index) => (
            <span
              key={index}
              className={`testimonial-dot ${index === currentTestimonial ? 'active' : ''}`}
              onClick={() => selectTestimonial(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testim;