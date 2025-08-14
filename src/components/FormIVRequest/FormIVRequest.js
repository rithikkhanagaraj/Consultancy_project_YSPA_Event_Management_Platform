import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FormIVRequest.css";
import { createClient } from "@supabase/supabase-js";
import yspaLogo from "../../assets/logos/yspa.png";

// Initialize Supabase client
const supabaseUrl = "https://bjntxmsmpmbldbqsftof.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqbnR4bXNtcG1ibGRicXNmdG9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MDQ1MjEsImV4cCI6MjA1OTA4MDUyMX0.t8Ig_iyBoWhRFDLROJcIRWvkT3J_SnrVuYKt5kDbg0s";// Replace with your actual Supabase anon key
const supabase = createClient(supabaseUrl, supabaseKey);

const FormIVRequest = () => {
    const [formData, setFormData] = useState({
        athleteName: "",
        teamName: "",
        sportName: "",
        contactNumber: "",
        registrationNumber: "",
        medicalClearance: false,
        participationDate: "",
        eventName: "",
        competitionLevel: "",
        performanceSummary: "",
        eligibilityVerification: "",
        complianceCheckStatus: "",
        supportingDocuments: null,
        athleteSignature: null,
        officialSignature: null,
        submissionDate: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === "checkbox" ? checked : value;
        setFormData({ ...formData, [name]: fieldValue });
    };

    const handleFileChange = (e, fieldName) => {
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
        console.log("Submitting Form IV Request:", formData);

        try {
            const { data, error } = await supabase.from("form_iv_requests").insert([
                {
                    athlete_name: formData.athleteName,
                    team_name: formData.teamName,
                    sport_name: formData.sportName,
                    contact_number: formData.contactNumber,
                    registration_number: formData.registrationNumber,
                    medical_clearance: formData.medicalClearance,
                    date_of_participation: formData.participationDate,
                    event_name: formData.eventName,
                    competition_level: formData.competitionLevel,
                    performance_summary: formData.performanceSummary,
                    eligibility_verification: formData.eligibilityVerification,
                    compliance_check_status: formData.complianceCheckStatus,
                    supporting_documents: formData.supportingDocuments,
                    athlete_signature: formData.athleteSignature,
                    official_signature: formData.officialSignature,
                    submission_date: formData.submissionDate,
                },
            ]);

            if (error) {
                console.error("Submission error:", error.message);
                alert(`Error: ${error.message}`);
            } else {
                alert("Form IV Request submitted successfully!");
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
                    <input type="text" name="athleteName" value={formData.athleteName} onChange={handleChange} required />
                </label>

                <label>
                    Team Name:
                    <input type="text" name="teamName" value={formData.teamName} onChange={handleChange} />
                </label>

                <label>
                    Sport Name:
                    <input type="text" name="sportName" value={formData.sportName} onChange={handleChange} />
                </label>

                <label>
                    Contact Number:
                    <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
                </label>

                <label>
                    Registration Number:
                    <input type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} />
                </label>

                <label>
                    Medical Clearance Provided:
                    <input type="checkbox" name="medicalClearance" checked={formData.medicalClearance} onChange={handleChange} />
                </label>

                <label>
                    Date of Participation:
                    <input type="date" name="participationDate" value={formData.participationDate} onChange={handleChange} />
                </label>

                <label>
                    Event Name:
                    <input type="text" name="eventName" value={formData.eventName} onChange={handleChange} required />
                </label>

                <label>
                    Competition Level (e.g., State, National):
                    <input type="text" name="competitionLevel" value={formData.competitionLevel} onChange={handleChange} required />
                </label>

                <label>
                    Performance Summary:
                    <textarea name="performanceSummary" value={formData.performanceSummary} onChange={handleChange} required />
                </label>

                <label>
                    Eligibility Verification Status:
                    <input type="text" name="eligibilityVerification" value={formData.eligibilityVerification} onChange={handleChange} required />
                </label>

                <label>
                    Compliance Check Status:
                    <input type="text" name="complianceCheckStatus" value={formData.complianceCheckStatus} onChange={handleChange} required />
                </label>

                <label>
                    Supporting Documents (Image or PDF):
                    <input type="file" accept="image/*,application/pdf" onChange={(e) => handleFileChange(e, "supportingDocuments")} required />
                </label>

                <label>
                    Signature of Athlete:
                    <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "athleteSignature")} required />
                </label>

                <label>
                    Signature of Coach/Official:
                    <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "officialSignature")} required />
                </label>

                <label>
                    Submission Date:
                    <input type="date" name="submissionDate" value={formData.submissionDate} onChange={handleChange} required />
                </label>

                <button type="submit">Submit</button>
                 <button type="submit"  onClick={() => navigate("/home")}>
                Back
            </button>
            </form>

           
        </div>
    );
};

export default FormIVRequest;