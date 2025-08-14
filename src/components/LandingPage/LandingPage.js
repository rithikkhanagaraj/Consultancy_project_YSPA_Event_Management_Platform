import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./landingpage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const logo = "/yspa.png";
const fitIndia = "/fit_india.png";
const msme = "/msme.png";
const nitAayog = "/nit_aayog.png";
const iso = "/iso.png";

const LandingPage = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleGetStarted = () => {
    navigate("/home");
  };

  const handleAdminLogin = () => {
    setShowPopup(true);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (username === "admin@gmail.com" && password === "admin") {
      navigate("/admin");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="landing-page">
      {/* Navbar */}
      <header className="top-design">
        <div className="navbar-brand">
          <img src={logo} alt="LOGO" className="logo" />
          <div className="brand-text">
            <h2>YOUTH & SPORTS PROMOTION ASSOCIATION</h2>
            <h6>OF TAMILNADU</h6>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="content-container">
        {/* Hero Section */}
        <section className="hero-section">
          <h5 className="tagline">The Ultimate Sports & Youth Empowerment Platform</h5>
          <p className="hero-text">
            YSPA is dedicated to fostering young talent and promoting sports at every level.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={handleGetStarted}>
              Get Started <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="trusted-logos">
          <h5>Trusted by Leading Sports Organizations</h5>
          <div className="logos">
            <img src={fitIndia} alt="Fit India" />
            <img src={msme} alt="MSME" />
            <img src={nitAayog} alt="NITI Aayog" />
            <img src={iso} alt="ISO" />
          </div>
        </section>

        {/* Info Container */}
        <section className="info-container">
          <p>
            Address: 2/58, Malligai Nagar 2nd Street, Erode<br />
            Phone: +91 9965832657<br />
            Qualification: M.A, M.P.Ed, M.Phill, NIS (C)
          </p>
          <p>
            © 2025 Youth and Sports Promotion Association. All Rights Reserved.
            <br />
            <button className="privacy-policy" onClick={() => alert('Privacy Policy')}>Privacy Policy</button>
          </p>
          <button className="admin-login" onClick={handleAdminLogin}>Admin Login</button>
        </section>
      </div>

      {/* Admin Login Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content animated-popup">
            <h3>Admin Login</h3>
            <form onSubmit={handleLoginSubmit}>
              <input
                type="email"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Login</button>
              <button type="button" onClick={() => setShowPopup(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;