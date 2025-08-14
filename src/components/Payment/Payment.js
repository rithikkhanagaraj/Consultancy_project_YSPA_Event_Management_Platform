import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Payment.css";
import yspaLogo from "../../assets/logos/yspa.png";
import supabase from "../../supabaseClient";

const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { sportName } = location.state || {}; // Extract sportName from state
    const [isTeam, setIsTeam] = useState(false);
    const [teamMembers, setTeamMembers] = useState([""]); // Initialize with one empty member
    const [formData, setFormData] = useState({
        sportName: sportName || "",
        teamName: "",
        soloName: "",
        date: "",
        email: "",
        paymentMethod: "",
    });
    const [eventDetails, setEventDetails] = useState({ postId: null, eventAmount: null }); // State to store postId and eventAmount

    useEffect(() => {
        const fetchEventDetails = async () => {
            if (formData.sportName) {
                try {
                    const { data, error } = await supabase
                        .from("events")
                        .select("postId, eventAmount")
                        .eq("description", formData.sportName)
                        .maybeSingle(); // Use maybeSingle to handle no rows gracefully

                    if (error) {
                        console.error("Error fetching event details:", error.message);
                        setEventDetails({ postId: null, eventAmount: null });
                    } else if (!data) {
                        console.warn("No event found for the given sport name.");
                        setEventDetails({ postId: null, eventAmount: null });
                    } else {
                        setEventDetails({ postId: data.postId, eventAmount: data.eventAmount });
                    }
                } catch (err) {
                    console.error("Unexpected error fetching event details:", err);
                    setEventDetails({ postId: null, eventAmount: null });
                }
            }
        };

        fetchEventDetails();
    }, [formData.sportName]);

    // Calculate total amount dynamically
    const calculateTotalAmount = () => {
        if (isTeam) {
            return eventDetails.eventAmount * teamMembers.length; // Multiply by the number of team members
        }
        return eventDetails.eventAmount || 0; // Solo amount
    };

    const handleTeamMemberChange = (index, value) => {
        const updatedMembers = [...teamMembers];
        updatedMembers[index] = value;
        setTeamMembers(updatedMembers);
    };

    const addTeamMember = () => {
        setTeamMembers([...teamMembers, ""]); // Add an empty member
    };

    const removeTeamMember = (index) => {
        const updatedMembers = teamMembers.filter((_, i) => i !== index); // Remove the member at the specified index
        setTeamMembers(updatedMembers);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const eventId = `EVT${Math.floor(1000 + Math.random() * 9000)}`;
        console.log("Form Data:", formData);
        console.log("Team Members:", teamMembers);

        navigate("/ticket", {
            state: {
                eventId,
                formData,
                teamMembers: isTeam ? teamMembers : null,
                eventAmount: eventDetails.eventAmount, // Pass eventAmount to the ticket page
                displayFor: ["User Purpose", "Administration Purpose"],
            },
        });
    };

    return (
        <div className="payment-container">
            <div className="top-red-block">
                <img src={yspaLogo} alt="YSPA Logo" className="yspa-logo" />
                <div className="yspa-text">
                    <h6 className="yspa-text">YOUTH & SPORTS PROMOTION</h6>
                    <h6 className="yspa-text">ASSOCIATION OF TAMILNADU</h6>
                </div>
            </div>
            <div className="payment-section">
                <h3>Complete Your Payment</h3>
                <form className="payment-form" onSubmit={handleSubmit}>
                    <label>
                        Name of the Event:
                        <input
                            type="text"
                            name="sportName"
                            value={formData.sportName}
                            onChange={handleInputChange}
                            placeholder="Enter sport name"
                            required
                        />
                    </label>
                    
                    
                    <div className="selection-buttons">
                        <button
                            type="button"
                            className={`selection-button ${!isTeam ? "active" : ""}`}
                            onClick={() => setIsTeam(false)}
                        >
                            Solo
                        </button>
                        <button
                            type="button"
                            className={`selection-button ${isTeam ? "active" : ""}`}
                            onClick={() => setIsTeam(true)}
                        >
                            Team
                        </button>
                    </div>
                    {isTeam ? (
                        <>
                            <label>
                                Team Name:
                                <input
                                    type="text"
                                    name="teamName"
                                    value={formData.teamName}
                                    onChange={handleInputChange}
                                    placeholder="Enter team name"
                                    required
                                />
                            </label>
                            <div className="team-members">
                                <h4>Team Members:</h4>
                                {teamMembers.map((member, index) => (
                                    <div key={index} className="team-member-row">
                                        <input
                                            type="text"
                                            value={member}
                                            onChange={(e) => handleTeamMemberChange(index, e.target.value)}
                                            placeholder={`Member ${index + 1}`}
                                            required
                                        />
                                        {teamMembers.length > 1 && (
                                            <button
                                                type="button"
                                                className="remove-member-button"
                                                onClick={() => removeTeamMember(index)}
                                            >
                                                -
                                            </button>
                                        )}
                                <button
                                    type="button"
                                    className="add-member-button"
                                    onClick={addTeamMember}
                                >
                                    +
                                </button>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <label>
                            Name:
                            <input
                                type="text"
                                name="soloName"
                                value={formData.soloName}
                                onChange={handleInputChange}
                                placeholder="Enter your name"
                                required
                            />
                        </label>
                    )}
                    <label>
                        Date:
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
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
                    <button type="submit" className="pay-button">
                        Pay Now: ₹{eventDetails.eventAmount !== null ? calculateTotalAmount() : "Loading..."}
                    </button>
                </form>
            </div>
            <button className="back-button" onClick={() => navigate(-1)}>Back</button>
        </div>
    );
};

export default Payment;
