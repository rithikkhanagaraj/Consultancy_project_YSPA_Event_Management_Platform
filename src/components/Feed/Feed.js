import AOS from "aos";
import "aos/dist/aos.css";
import "./Feed.css";
import founderImage from "../../assets/Aboutus/founder-image.jpg"; // This is for the general founder image
import amritsarImage from "../../assets/Aboutus/amritsar-image.png"; // This is for the Amritsar image
import { useNavigate } from "react-router-dom";


import React, { useState, useEffect } from 'react';
import nepalImage from "../../assets/Aboutus/nepal-image.png"

import tanjoreImage from "../../assets/Aboutus/tanjore-image.png"
import maduraImage from "../../assets/Aboutus/madura-image.png"
// FounderComponent to display details of the founders
const FounderComponent = ({ name, address, venue, phone, qualification, index, image }) => {
    const isFounder = index === 0;

    return (
        <>
            {/* Image Block */}
            <div className="founder-image-block" data-aos="fade-up">
                <div className="founder-name">
                    {isFounder ? "OUR FOUNDER - " : ""}
                    {name}
                </div>
                <img src={image} alt={name} /> {/* Use the image passed as prop */}
            </div>

            {/* Info Block */}
            <div className="founder-info-block" data-aos="fade-up">
                {isFounder ? (
                    <p><strong>Address:</strong> {address}</p>
                ) : (
                    <p><strong>Venue:</strong> {venue}</p>
                )}
                
                {isFounder && (
                    <>
                        <p><strong>Phone:</strong> {phone}</p>
                        <p><strong>Qualification:</strong> {qualification}</p>
                    </>
                )}
            </div>
        </>
    );
};

const Feed = () => {
    const navigate = useNavigate();
    

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const founders = [
        { 
            name: "Nagaraj Ramaswamy", 
            address: "2/58, Malligai nagar 2nd street, Erode", 
            phone: "+91 9965832657", 
            qualification: "M.A, M.P.Ed, M.Phill, NIS (C)",
            image: founderImage // Use the founderImage for Nagaraj Ramaswamy
        },
        { 
            name: "YSPA, NATIONAL CHAMPIONSHIP",
            venue: "Amritsar, Punjab",
            image: amritsarImage // Use amritsarImage here
        },
        { 
            name: "YSPA, INTERNATIONAL CHAMPIONSHIP", 
            venue: "Nepal, Pokhara",
            image: nepalImage
        },
        { 
            name: "YSPA, STATE CHAMPIONSHIP", 
            venue: "Periyar Maniammai Institute Of Science & Technology ,Tanjore",
            image: tanjoreImage
        },
        { 
            name: "YSPA, NATIONAL CHAMPIONSHIP", 
            venue: "Madura, Uttra Pradesh",
            image: maduraImage
        }
    ];
    

    return (
        <>
            <div className="top-red-block">
                <img src={require("../../assets/logos/yspa.png")} alt="Logo" className="logo-img" />
                <div>
                    <h6 className="yspa-text">YOUTH & SPORTS PROMOTION</h6>
                    <h6 className="yspa-text">ASSOCIATION OF TAMILNADU</h6> 
                </div>
            </div>

            <div className="feed-container">

                <div className="button-section">
                    <div className="button-row">
                        <button
                            className="feed-button"
                            onClick={() => navigate("/form-i-request")}
                        >
                            Form I Request
                        </button>
                        <button
                            className="feed-button"
                            onClick={() => navigate("/form-ii-request")}
                        >
                            Form II Request
                        </button>
                        <button className="feed-button" onClick={()=> navigate("/form-iii-request")}>Form III Request</button>
                    </div>
                    <div className="button-center">
                        <button className="feed-button" onClick={()=> navigate("/form-iv-request")}>Form IV Request</button>
                    </div>
                    <div className="button-row tight">
                        <button className="feed-button" onClick={() => navigate('/job-application')}>Job Application</button>
                        <button className="feed-button" onClick={() => navigate('/complaint-form')}>Complaints</button>
                    </div>
                </div>

                <div className="static-content">
                    <h3>ABOUT US</h3>
                    <hr />
                </div>

                {founders.map((founder, index) => (
                    <FounderComponent key={index} {...founder} index={index} image={founder.image} />
                ))}

                 </div>
        </>
    );
};

export default Feed;
