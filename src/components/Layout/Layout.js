import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCompass, faArrowLeft } from "@fortawesome/free-solid-svg-icons"; // Import faArrowLeft for Previous button
import "./Layout.css";

const Layout = ({ children }) => {
    const navigate = useNavigate();

    return (
        <div className="layout-container">
            <div className="content">{children}</div>
            <div className="bottom-navbar">
                <div className="nav-item" onClick={() => navigate("/home")}>
                    <FontAwesomeIcon icon={faHome} size="lg" />
                    <span>Home</span>
                </div>
                <div className="nav-item" onClick={() => navigate("/feed")}>
                    <FontAwesomeIcon icon={faCompass} size="lg" />
                    <span>Explore</span>
                </div>
                <div className="nav-item" onClick={() => navigate("/")}> {/* Navigate to the landing page */}
                    <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                    <span>Previous</span>
                </div>
            </div>
        </div>
    );
};

export default Layout;
