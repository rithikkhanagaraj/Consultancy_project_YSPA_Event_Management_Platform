import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FormIIIRequest.css";
import { createClient } from "@supabase/supabase-js";
import yspaLogo from "../../assets/logos/yspa.png";

// Initialize Supabase client
const supabaseUrl = "https://bjntxmsmpmbldbqsftof.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqbnR4bXNtcG1ibGRicXNmdG9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MDQ1MjEsImV4cCI6MjA1OTA4MDUyMX0.t8Ig_iyBoWhRFDLROJcIRWvkT3J_SnrVuYKt5kDbg0s"; // Replace with your actual key
const supabase = createClient(supabaseUrl, supabaseKey);

const FormIIIRequest = () => {
    const [formData, setFormData] = useState({
        athleteName: "",
        teamName: "",
        eventName: "",
        sport: "",
        registrationNo: "",
        athleteContact: "",
        medicalClearance: false,
        eligibilityStatus: "",
        previousExperience: "",
        dateOfParticipation: "",
        playerSignature: null,
        medicalAssessment: null,
        approvalSignature: null,
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleImageChange = (e, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setFormData({ ...formData, [fieldName]: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);

        try {
            // Insert form data into the Supabase table
            const { data, error } = await supabase.from("form_iii_requests").insert([
                {
                    athlete_name: formData.athleteName,
                    team_name: formData.teamName,
                    event_name: formData.eventName,
                    sport: formData.sport,
                    registration_no: formData.registrationNo,
                    athlete_contact: formData.athleteContact,
                    medical_clearance: formData.medicalClearance,
                    eligibility_status: formData.eligibilityStatus,
                    previous_experience: formData.previousExperience,
                    date_of_participation: formData.dateOfParticipation,
                    player_signature: formData.playerSignature, // Store base64 image data
                    medical_assessment: formData.medicalAssessment,
                    approval_signature: formData.approvalSignature,
                },
            ]);

            if (error) {
                // Log detailed error information from Supabase
                console.error("Supabase Error:", error.message);
                alert(`Error: ${error.message}`);
            } else {
                console.log("Data inserted successfully:", data);
                alert("Form III Request submitted successfully!");
                // Redirect after successful form submission
                navigate("/home");
            }
        } catch (err) {
            console.error("Unexpected error:", err);
            alert("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <div className="form-container">
            <div className="top-red-block">
                <img src={yspaLogo} alt="YSPA Logo" className="yspa-logo" />
                <div className="yspa-text">
                    <h6 className="yspa-text">YOUTH & SPORTS PROMOTION</h6>
                    <h6 className="yspa-text">ASSOCIATION OF TAMILNADU</h6>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <label>
                    Athlete Name:
                    <input
                        type="text"
                        name="athleteName"
                        value={formData.athleteName}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Team Name (if applicable):
                    <input
                        type="text"
                        name="teamName"
                        value={formData.teamName}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Event Name:
                    <input
                        type="text"
                        name="eventName"
                        value={formData.eventName}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Sport:
                    <input
                        type="text"
                        name="sport"
                        value={formData.sport}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Registration No.:
                    <input
                        type="text"
                        name="registrationNo"
                        value={formData.registrationNo}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Athlete Contact Number:
                    <input
                        type="text"
                        name="athleteContact"
                        value={formData.athleteContact}
                        onChange={handleChange}
                        required
                    />
                </label>
                <fieldset>
                    <legend>Medical and Eligibility Details:</legend>
                    <label>
                        Medical Clearance:
                        <input
                            type="checkbox"
                            name="medicalClearance"
                            checked={formData.medicalClearance}
                            onChange={handleChange}
                            required
                        />
                        I confirm that I have received medical clearance for participation.
                    </label>
                    <label>
                        Eligibility Status:
                        <input
                            type="text"
                            name="eligibilityStatus"
                            value={formData.eligibilityStatus}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Previous Experience:
                        <textarea
                            name="previousExperience"
                            value={formData.previousExperience}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </fieldset>
                <label>
                    Date of Participation:
                    <input
                        type="date"
                        name="dateOfParticipation"
                        value={formData.dateOfParticipation}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Signature of Athlete:
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, "playerSignature")}
                        required
                    />
                </label>
                <label>
                    Medical Assessment Document:
                    <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={(e) => handleImageChange(e, "medicalAssessment")}
                        required
                    />
                </label>
                <label>
                    Approval Signature:
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, "approvalSignature")}
                        required
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
            <button type="button" className="back-button" onClick={() => navigate("/home")}>
                Back
            </button>
        </div>
    );
};

export default FormIIIRequest;