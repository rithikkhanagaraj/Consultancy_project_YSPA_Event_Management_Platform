import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient"; // Use the shared Supabase client
import "./Admin.css";
import yspaLogo from '../../assets/logos/yspa.png';
import { FaSignOutAlt, FaPlusCircle, FaTasks, FaFileAlt, FaMoneyCheckAlt, FaWpforms, FaFileSignature, FaChartBar } from "react-icons/fa";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const Admin = () => {
    const navigate = useNavigate();
    const [sportNames, setSportNames] = useState([]);
    const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

    const handleLogout = () => {
        navigate("/"); // Redirect to login page
    };

    // Fetch unique sport names from the Register table
    const fetchSportNames = async () => {
        try {
            const { data, error } = await supabase
                .from("Register") // Updated table name to "Register"
                .select("sport_name") // Fetch only the sport_name column
                .neq("sport_name", null);

            if (error) {
                console.error("Error fetching sport names:", error.message);
            } else {
                // Use a Set to ensure unique sport names
                const uniqueSportNames = [...new Set(data.map((item) => item.sport_name))];
                setSportNames(uniqueSportNames);
                setShowPopup(true); // Show popup when sports are fetched
            }
        } catch (err) {
            console.error("Unexpected error:", err);
        }
    };

    const closePopup = () => {
        setShowPopup(false); // or whatever state you use to control the popup visibility
    };

    return (
        <div className="admin-container">
            <div className="top-red-block">
                <img src={yspaLogo} alt="YSPA Logo" className="yspa-logo" />
                <div className="yspa-text">
                    <h6 className="yspa-text">YOUTH & SPORTS PROMOTION</h6>
                    <h6 className="yspa-text">ASSOCIATION OF TAMILNADU</h6>
                </div>
            </div>
            <div className="admin-grid">
                <div className="admin-card" onClick={handleLogout}>
                    <FaSignOutAlt className="admin-icon gradient-icon" />
                    <p className="gradient-text">Logout</p>
                </div>
                <div className="admin-card" onClick={() => navigate("/admin/create-event")}>
                    <FaPlusCircle className="admin-icon gradient-icon" />
                    <p className="gradient-text">Create New Event</p>
                </div>
                
                <div className="admin-card" onClick={() => navigate("/admin/sports-list")}>
                    <FaFileAlt className="admin-icon gradient-icon" />
                    <p className="gradient-text">Responses</p>
                </div>
                <div className="admin-card" onClick={() => navigate("/admin/form-requests")}>
                    <FaWpforms className="admin-icon gradient-icon" />
                    <p className="gradient-text">Form I Requests</p>
                </div>
                <div className="admin-card" onClick={() => navigate("/admin/form-ii-requests")}>
                    <FaFileSignature className="admin-icon gradient-icon" />
                    <p className="gradient-text">Form II Requests</p>
                </div>
                {/* New Admin Cards */}
                <div className="admin-card" onClick={() => navigate("/admin/form-iii-requests")}>
                    <FaFileAlt className="admin-icon gradient-icon" />
                    <p className="gradient-text">Form III Requests</p>
                </div>
                <div className="admin-card" onClick={() => navigate("/admin/form-iv-requests")}>
                    <FaFileAlt className="admin-icon gradient-icon" />
                    <p className="gradient-text">Form IV Requests</p>
                </div>
                <div className="admin-card" onClick={() => navigate("/admin/job-application")}>
                    <FaFileAlt className="admin-icon gradient-icon" />
                    <p className="gradient-text">Job Application</p>
                </div>
                <div className="admin-card" onClick={() => navigate("/admin/complaints")}>
    <FaFileAlt className="admin-icon gradient-icon" />
    <p className="gradient-text">Complaints</p>
</div>
                <div className="admin-card" onClick={() => navigate("/admin/analytics")}>
                    <FaChartBar className="admin-icon gradient-icon" />
                    <p className="gradient-text">Analytics</p>
                </div>
            </div>

            {/* Popup for sport names */}
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <h3>Available Sports</h3>
                        <ul>
                            {sportNames.map((sportName, index) => (
                                <li key={index}>
                                    <button
                                        className="sport-name-button"
                                        onClick={() => {
                                            navigate(`/admin/responses/${sportName}`);
                                            closePopup();
                                        }}
                                    >
                                        {sportName}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <button className="close-popup-button" onClick={closePopup}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;