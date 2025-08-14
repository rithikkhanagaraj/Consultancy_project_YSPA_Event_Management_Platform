import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import yspaLogo from "../../assets/logos/yspa.png";
const Profile = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        name: "Jessica Iskandar",
        phone: "+62 8473 84738",
        email: "jessica@example.com",
        profileImage: "profile.jpg",
    });

    const [coins, setCoins] = useState(() => {
        const savedPoints = parseInt(localStorage.getItem("profilePoints") || "0", 10);
        return savedPoints;
    }); // Example coin count
    const [redeemed, setRedeemed] = useState(false);
    const [isEditPopupVisible, setEditPopupVisible] = useState(false);
    const [editFormData, setEditFormData] = useState({ ...profile });

    const handleEdit = () => {
        setEditFormData({ ...profile });
        setEditPopupVisible(true);
    };

    const handleSave = () => {
        setProfile({ ...editFormData });
        setEditPopupVisible(false);
    };

    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfile((prev) => ({ ...prev, profileImage: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRedeem = () => {
        if (coins >= 1000) {
            setRedeemed(true);
            setCoins(0); // Reset coins
            localStorage.setItem("profilePoints", "0"); // Reset points in localStorage
        }
    };

    const handleLogout = () => {
        navigate("/"); // Navigate to the start page
    };

    return (
        <div>
            {/* Top Red Block */}
            <div className="top-red-block">
  <img src={yspaLogo} alt="YSPA Logo" className="yspa-logo" />
  <div className="yspa-text">
  <h6 className="yspa-text">YOUTH & SPORTS PROMOTION</h6>
  <h6 className="yspa-text">ASSOCIATION OF TAMILNADU</h6>
  </div>
</div>

            {/* Profile Section */}
            <div className="profile-container">
                <label htmlFor="profile-image-upload">
                    <img
                        src={profile.profileImage}
                        alt="Profile"
                        title="Click to change profile photo"
                    />
                </label>
                <input
                    id="profile-image-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleProfileImageChange}
                />
                <h2>{profile.name}</h2>
                <p>{profile.phone}</p>
                <p>{profile.email}</p>
                <button className="edit-button" onClick={handleEdit}>
                    Edit
                </button>
                <button className="back-button" onClick={() => navigate(-1)}>Back</button>
            </div>

            {/* Logout Button */}
            <button className="logout-btn" onClick={handleLogout}>
                Logout
            </button>

            {/* Rewards Section */}
            <div className="rewards-section">
                <h3>Coin Progress</h3>
                <div className="progress-container">
                    <div
                        className="progress-bar"
                        style={{ width: `${(coins / 1000) * 100}%` }}
                    ></div>
                    {coins < 1000 && <div className="coin-animation">💰</div>}
                </div>
                <p>{coins}/1000 Coins</p>
                {redeemed && <p>New points refill started!</p>} {/* Show refill message */}
                <button
                    className={`redeem-btn ${redeemed ? "redeemed" : ""}`}
                    onClick={handleRedeem}
                    disabled={coins < 1000 || redeemed}
                >
                    {redeemed ? "Redeemed" : "Redeem"}
                </button>
            </div>

            
            {/* Edit Popup */}
            {isEditPopupVisible && (
                <div className="edit-popup">
                    <div className="edit-popup-content">
                        <h3>Edit Profile</h3>
                        <label>
                            Name:
                            <input
                                type="text"
                                value={editFormData.name}
                                onChange={(e) =>
                                    setEditFormData({ ...editFormData, name: e.target.value })
                                }
                            />
                        </label>
                        <label>
                            Phone:
                            <input
                                type="text"
                                value={editFormData.phone}
                                onChange={(e) =>
                                    setEditFormData({ ...editFormData, phone: e.target.value })
                                }
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="email"
                                value={editFormData.email}
                                onChange={(e) =>
                                    setEditFormData({ ...editFormData, email: e.target.value })
                                }
                            />
                        </label>
                        <div className="edit-popup-actions">
                            <button onClick={handleSave}>Save</button>
                            <button onClick={() => setEditPopupVisible(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
