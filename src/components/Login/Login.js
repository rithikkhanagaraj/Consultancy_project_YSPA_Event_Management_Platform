import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FaGoogle } from "react-icons/fa";
import "./Login.css";
import yspa from "../../assets/logos/yspa.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "admin@gmail.com" && password === "admin") {
        navigate("/admin"); // Redirect to admin panel
    } else {
        navigate("/home"); // Redirect to home page
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-container">
          <img 
            src={yspa}
            alt="YSPA Logo" 
            style={{ borderRadius: "50%", backgroundColor: "transparent" }} 
            height="40" className="logo" 
          />
        </div>
        <h2 className="title">YSPA</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="remember-me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label>Remember me</label>
          </div>
          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
        <div className="signup-link">
          Don't have an account? <a href="#">Sign up</a>
        </div>
        <div className="social-buttons">
          <button className="google-button">
            <FaGoogle className="icon" /> Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
