import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./PersonalDetailsForm.css"; 
import { useDispatch } from "react-redux";

const PersonalDetailsForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    preferredItems: "",
    familyMembers: "",
    location: "",
    region: "",
    healthInfo: "",
    extraDetails: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Form submitted successfully");

    // Clear newUser flag in Redux
    dispatch({ type: "CLEAR_NEW_USER" });

    setTimeout(() => {
      history.push("/"); // redirect to home
    }, 1500);
  };

  return (
    <div id="personal-details-main-container" className="personalDetailsContainer">
      <div id="personal-details-form-wrapper" className="formWrapper">
        <div id="personal-details-header" className="headerSection">
          <h2 id="personal-details-title">Tell us more about you</h2>
          <p id="personal-details-subtitle">Help us personalize your experience</p>
        </div>
        
        <form id="personal-details-form" className="personalDetailsForm" onSubmit={handleSubmit}>
          <div id="preferred-items-group" className="inputGroup">
            <label htmlFor="preferred-items-input" id="preferred-items-label">
              Preferred Items
            </label>
            <textarea
              id="preferred-items-input"
              name="preferredItems"
              placeholder="Tell us about your favorite products, brands, or categories..."
              value={formData.preferredItems}
              onChange={handleChange}
              className="textareaField"
            />
          </div>

          

          <div id="location-region-row" className="inputRow">
            <div id="family-members-group" className="inputGroup">
            <label htmlFor="family-members-input" id="family-members-label">
              Family Members
            </label>
            <input
              id="family-members-input"
              type="number"
              name="familyMembers"
              placeholder="Number of family members"
              value={formData.familyMembers}
              onChange={handleChange}
              className="inputField"
              min="1"
              max="50"
            />
          </div>

            <div id="region-group" className="inputGroup halfWidth">
              <label htmlFor="region-input" id="region-label">
                Region
              </label>
              <input
                id="region-input"
                type="text"
                name="region"
                placeholder="State/Province"
                value={formData.region}
                onChange={handleChange}
                className="inputField"
              />
            </div>
          </div>

          <div id="health-info-group" className="inputGroup">
            <label htmlFor="health-info-input" id="health-info-label">
              Health Information
            </label>
            <textarea
              id="health-info-input"
              name="healthInfo"
              placeholder="Any dietary restrictions, allergies, or health considerations..."
              value={formData.healthInfo}
              onChange={handleChange}
              className="textareaField"
            />
          </div>

          <div id="extra-details-group" className="inputGroup">
            <label htmlFor="extra-details-input" id="extra-details-label">
              Additional Details
            </label>
            <textarea
              id="extra-details-input"
              name="extraDetails"
              placeholder="Anything else you'd like us to know..."
              value={formData.extraDetails}
              onChange={handleChange}
              className="textareaField"
            />
          </div>

          <button 
            id="personal-details-submit-btn" 
            type="submit" 
            className="submitButton"
          >
            <span id="submit-btn-text">Submit</span>
            <svg id="submit-btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14m-7-7l7 7-7 7"/>
            </svg>
          </button>
        </form>
      </div>
      
      <ToastContainer 
        id="personal-details-toast-container"
        position="bottom-center" 
        autoClose={3000} 
      />
    </div>
  );
};

export default PersonalDetailsForm;