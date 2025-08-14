import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useLocation, useNavigate } from "react-router-dom";
import "./Home.css";
import yspaLogo from "../../assets/logos/yspa.png"; // Updated file extension to .png

const supabaseUrl = "https://bjntxmsmpmbldbqsftof.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqbnR4bXNtcG1ibGRicXNmdG9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MDQ1MjEsImV4cCI6MjA1OTA4MDUyMX0.t8Ig_iyBoWhRFDLROJcIRWvkT3J_SnrVuYKt5kDbg0s";
const supabase = createClient(supabaseUrl, supabaseKey);

const Home = () => {
  const [activeTab, setActiveTab] = useState("ongoing");
  const [events, setEvents] = useState([]);
  const [likedPosts, setLikedPosts] = useState({});
  const [showPaymentPrompt, setShowPaymentPrompt] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
    // Check if redirected from form submission
    const params = new URLSearchParams(location.search);
    if (params.get("formSubmitted") === "true") {
      setShowPaymentPrompt(true);
    }
  }, []);

  // Fetch events from Supabase
  const fetchEvents = async () => {
    const { data, error } = await supabase.from("events").select("*");
    if (error) {
      console.error("Error fetching events:", error.message);
    } else {
      setEvents(data);
    }
  };

  // Toggle like state for a post
  const handleLike = (postId) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  // Handle sharing using Web Share API
  const handleShare = (event) => {
    const shareData = {
        title: `Check out this event: ${event.description}`,
        text: `Join us for the ${event.description} event! Here are the details:\n\n` +
              `Event Type: ${event.eventType}\n` +
              `Date: ${event.date || "TBD"}\n` +
              `Location: ${event.location || "TBD"}\n\n` +
              `Click the link below to register or learn more:\n${event.googleFormLink}`,
        url: event.googleFormLink,
    };

    if (navigator.share) {
        navigator
            .share(shareData)
            .then(() => console.log("Shared successfully"))
            .catch((error) => console.error("Error sharing:", error));
    } else {
        alert("Sharing is not supported on this browser.");
    }
  };

  // Animate posts on scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    const posts = document.querySelectorAll(".post");
    posts.forEach((post) => observer.observe(post));
    return () => {
      posts.forEach((post) => observer.unobserve(post));
    };
  }, [events, activeTab]);

  // Render event posts based on type
  const renderEvents = (type) =>
    events
      .filter((event) => event.eventType === type)
      .map((event) => (
        <div key={event.id} className="post">
          <img src={event.imageUrl} alt="Event" className="post-image" />
          <div className="post-actions">
            <img
              className="like-icon"
              src={
                likedPosts[event.id]
                  ? "https://cdn-icons-png.flaticon.com/128/833/833472.png"
                  : "https://cdn-icons-png.flaticon.com/128/1077/1077035.png"
              }
              alt="Like"
              onClick={() => handleLike(event.id)}
            />
            <img
              className="share-icon"
              src="https://cdn-icons-png.flaticon.com/128/2099/2099085.png"
              alt="Share"
              onClick={() => handleShare(event)}
            />
            <button
              className="register-btn"
              onClick={() => navigate("/payment", { state: { sportName: event.description } })}
            >
              Register
            </button>
          </div>
          <p className="post-description">{event.description}</p>
        </div>
      ));

  return (
    <div className="home-container">
      {/* Top Red Block */}
      <div className="top-red-block">
        <img src={yspaLogo} alt="YSPA Logo" className="yspa-logo" />
        <h6 className="yspa-text">YOUTH & SPORTS PROMOTION ASSOCIATION</h6>
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        <button
          className={`tab ${activeTab === "ongoing" ? "active" : ""}`}
          onClick={() => setActiveTab("ongoing")}
        >
          Ongoing
        </button>
        <button
          className={`tab ${activeTab === "upcoming" ? "active" : ""}`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming
        </button>
      </div>

      {/* Event Posts */}
      {activeTab === "ongoing" && renderEvents("Ongoing")}
      {activeTab === "upcoming" && renderEvents("Upcoming")}

      {/* Payment Prompt */}
      {showPaymentPrompt && (
        <div className="popup">
          <h3>Form submitted successfully!</h3>
          <p>Do you want to proceed to payment?</p>
          <button
            className="proceed-btn"
            onClick={() => {
              setShowPaymentPrompt(false);
              window.location.href = "/payment"; // Navigate to payment page
            }}
          >
            Yes, Proceed
          </button>
          <button
            className="proceed-btn"
            onClick={() => setShowPaymentPrompt(false)} // Close the prompt
          >
            No, Cancel
          </button>
        </div>
      )}

        </div>
  );
};

export default Home;
