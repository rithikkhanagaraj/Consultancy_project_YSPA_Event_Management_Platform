

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./ComplaintForm.css";
import yspaLogo from "../../assets/logos/yspa.png"; // Updated file extension to .png

const ComplaintForm = () => {
    const navigate = useNavigate(); // Initialize navigate
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        complaint: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Complaint Submitted:", formData);
        alert("Your complaint has been submitted successfully!");
        setFormData({ name: "", email: "", complaint: "" });
    };

    return (
        <div className="complaint-form-container">
            {/* Top Red Block */}
            <div className="top-red-block">
                <img src={yspaLogo} alt="YSPA Logo" className="yspa-logo" />
                <h6 className="yspa-text">YOUTH & SPORTS PROMOTION ASSOCIATION</h6>
            </div>

            {/* Complaint Form Section */}
            <h3>Submit Your Complaint</h3>
            <form className="complaint-form" onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                    />
                </label>
                <label>
                    Complaint:
                    <textarea
                        name="complaint"
                        value={formData.complaint}
                        onChange={handleInputChange}
                        placeholder="Enter your complaint"
                        required
                    ></textarea>
                </label>
                <button type="submit" className="submit-button">
                    Submit
                </button>
                <button className="submit-button" onClick={() => navigate(-1)}>Back</button> {/* Add Back Button */}
       
            </form>
             </div>
    );
};

export default ComplaintForm;