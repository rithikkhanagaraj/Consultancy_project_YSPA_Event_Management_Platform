import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Added import for navigation
import "./FormIRequest.css";
import yspaLogo from "../../assets/logos/yspa.png";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bjntxmsmpmbldbqsftof.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqbnR4bXNtcG1ibGRicXNmdG9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MDQ1MjEsImV4cCI6MjA1OTA4MDUyMX0.t8Ig_iyBoWhRFDLROJcIRWvkT3J_SnrVuYKt5kDbg0s";
const supabase = createClient(supabaseUrl, supabaseKey);

const FormIRequest = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        dob: "",
        gender: "",
        sport: "",
        playerId: "",
        contactDetails: "",
        chronicIllness: false,
        previousSurgeries: false,
        medication: "",
        covidVaccination: "",
        declarationDate: "",
        declarationOfFitness: false,
        playerSignature: null,
        guardianSignature: null,
    });

    const navigate = useNavigate(); // Initialize navigation

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
            const { error } = await supabase.from("form_i_requests").insert([
                {
                    full_name: formData.fullName,
                    dob: formData.dob,
                    gender: formData.gender,
                    sport: formData.sport,
                    player_id: formData.playerId,
                    contact_details: formData.contactDetails,
                    chronic_illness: formData.chronicIllness,
                    previous_surgeries: formData.previousSurgeries,
                    medication: formData.medication,
                    covid_vaccination: formData.covidVaccination,
                    declaration_date: formData.declarationDate,
                    declaration_of_fitness: formData.declarationOfFitness,
                    player_signature: formData.playerSignature,
                    guardian_signature: formData.guardianSignature,
                },
            ]);

            if (error) {
                console.error("Error inserting data:", error.message);
                alert("Failed to submit the form. Please try again.");
            } else {
                alert("Form submitted successfully!");
            }
        } catch (err) {
            console.error("Unexpected error:", err);
            alert("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <div className="form-container">
            {/* Top Red Block */}
            <div className="top-red-block">
                <img src={yspaLogo} alt="YSPA Logo" className="yspa-logo" />
                <div className="yspa-text">
                    <h6 className="yspa-text">YOUTH & SPORTS PROMOTION</h6>
                    <h6 className="yspa-text">ASSOCIATION OF TAMILNADU</h6>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <label><br></br>
                    Full Name of the Player:
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Date of Birth:
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Gender:
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
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
                    Player ID/Registration Number:
                    <input
                        type="text"
                        name="playerId"
                        value={formData.playerId}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Contact Details:
                    <input
                        type="text"
                        name="contactDetails"
                        value={formData.contactDetails}
                        onChange={handleChange}
                        required
                    />
                </label>
                <fieldset>
                    <legend>Medical History:</legend>
                    <label>
                        <input
                            type="checkbox"
                            name="chronicIllness"
                            checked={formData.chronicIllness}
                            onChange={handleChange}
                        />
                        Any chronic illness (e.g., asthma, epilepsy, diabetes)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="previousSurgeries"
                            checked={formData.previousSurgeries}
                            onChange={handleChange}
                        />
                        Previous surgeries or injuries
                    </label>
                    <label>
                        Currently taking medication (Yes/No – If yes, specify):
                        <input
                            type="text"
                            name="medication"
                            value={formData.medication}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        COVID-19 vaccination status (optional):
                        <input
                            type="text"
                            name="covidVaccination"
                            value={formData.covidVaccination}
                            onChange={handleChange}
                        />
                    </label>
                </fieldset>

                {/* Declaration of Fitness */}
                <fieldset>
                    <legend>Declaration of Fitness:</legend>
                    <label>
                        <input
                            type="checkbox"
                            name="declarationOfFitness"
                            checked={formData.declarationOfFitness}
                            onChange={handleChange}
                        />
                        I hereby declare that I am physically and mentally fit to participate in sports activities.
                    </label>
                </fieldset>

                <label>
                    Date:
                    <input
                        type="date"
                        name="declarationDate"
                        value={formData.declarationDate}
                        onChange={handleChange}
                        required
                    />
                </label>

                {/* Player Signature */}
                <div className="signature-section">
                    <label>
                        Signature of the Player:
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, "playerSignature")}
                        />
                    </label>
                    {formData.playerSignature && (
                        <img
                            src={formData.playerSignature}
                            alt="Player Signature Preview"
                            className="signature-preview"
                        />
                    )}
                </div>

                {/* Parent/Guardian Signature */}
                <div className="signature-section">
                    <label>
                        Signature of Parent/Guardian (if minor):
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, "guardianSignature")}
                        />
                    </label>
                    {formData.guardianSignature && (
                        <img
                            src={formData.guardianSignature}
                            alt="Guardian Signature Preview"
                            className="signature-preview"
                        />
                    )}
                </div>

                <button type="submit">Submit</button>
            <button type="submit"  onClick={() => navigate("/feed")}>
                Back
            </button>
            </form>
        </div>
    );
};

export default FormIRequest;