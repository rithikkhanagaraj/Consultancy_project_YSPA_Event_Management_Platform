import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FormIIRequest.css";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bjntxmsmpmbldbqsftof.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqbnR4bXNtcG1ibGRicXNmdG9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MDQ1MjEsImV4cCI6MjA1OTA4MDUyMX0.t8Ig_iyBoWhRFDLROJcIRWvkT3J_SnrVuYKt5kDbg0s";
const supabase = createClient(supabaseUrl, supabaseKey);

const FormIIRequest = () => {
    const [formData, setFormData] = useState({
        playerName: "",
        dob: "",
        sport: "",
        registrationNo: "",
        nomineeName: "",
        nomineeRelationship: "",
        nomineeDob: "",
        nomineeContact: "",
        nomineeAddress: "",
        altNominee: "",
        declaration: false,
        playerSignature: null,
        witnessSignatures: [null, null],
        date: "",
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
            const { error } = await supabase.from("form_ii_requests").insert([
                {
                    player_name: formData.playerName,
                    dob: formData.dob,
                    sport: formData.sport,
                    registration_no: formData.registrationNo,
                    nominee_name: formData.nomineeName,
                    nominee_relationship: formData.nomineeRelationship,
                    nominee_dob: formData.nomineeDob,
                    nominee_contact: formData.nomineeContact,
                    nominee_address: formData.nomineeAddress,
                    alt_nominee: formData.altNominee,
                    declaration: formData.declaration,
                    player_signature: formData.playerSignature,
                    witness_signature_1: formData.witnessSignatures[0],
                    witness_signature_2: formData.witnessSignatures[1],
                    date: formData.date,
                },
            ]);

            if (error) {
                console.error("Error inserting data:", error.message);
                alert("Failed to submit the form. Please try again.");
            } else {
                alert("Form II Request submitted successfully!");
            }
        } catch (err) {
            console.error("Unexpected error:", err);
            alert("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <div className="form-container">
            <div className="top-red-block">
                <img src={require("../../assets/logos/yspa.png")} alt="YSPA Logo" className="yspa-logo" />
                <div className="yspa-text">
                    <h6 className="yspa-text">YOUTH & SPORTS PROMOTION</h6>
                    <h6 className="yspa-text">ASSOCIATION OF TAMILNADU</h6>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <label>
                    Name of Player:
                    <input
                        type="text"
                        name="playerName"
                        value={formData.playerName}
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
                    Association Registration No.:
                    <input
                        type="text"
                        name="registrationNo"
                        value={formData.registrationNo}
                        onChange={handleChange}
                        required
                    />
                </label>
                <fieldset>
                    <legend>Nominee’s Details:</legend>
                    <label>
                        Full Name:
                        <input
                            type="text"
                            name="nomineeName"
                            value={formData.nomineeName}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Relationship to Player:
                        <input
                            type="text"
                            name="nomineeRelationship"
                            value={formData.nomineeRelationship}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Date of Birth:
                        <input
                            type="date"
                            name="nomineeDob"
                            value={formData.nomineeDob}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Contact Number:
                        <input
                            type="text"
                            name="nomineeContact"
                            value={formData.nomineeContact}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Address:
                        <textarea
                            name="nomineeAddress"
                            value={formData.nomineeAddress}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Alternative Nominee (optional):
                        <input
                            type="text"
                            name="altNominee"
                            value={formData.altNominee}
                            onChange={handleChange}
                        />
                    </label>
                </fieldset>
                <fieldset>
                    <legend>Declaration of Correctness:</legend>
                    <label>
                        <input
                            type="checkbox"
                            name="declaration"
                            checked={formData.declaration}
                            onChange={handleChange}
                            required
                        />
                        I hereby declare that the information provided is correct.
                    </label>
                </fieldset>
                <label>
                    Signature of Player:
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, "playerSignature")}
                        required
                    />
                </label>
                <fieldset>
                    <legend>Signature of Witnesses:</legend>
                    <label>
                        Witness 1:
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, "witnessSignatures[0]")}
                            required
                        />
                    </label>
                    <label>
                        Witness 2:
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, "witnessSignatures[1]")}
                            required
                        />
                    </label>
                </fieldset>
                <label>
                    Date:
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
            <button type="button" className="back-button" onClick={() => navigate("/feed")}>
                Back
            </button>
        </div>
    );
};

export default FormIIRequest;