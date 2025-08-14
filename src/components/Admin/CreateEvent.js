import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js"; // Import Supabase client
import { v4 as uuidv4 } from "uuid"; // Import UUID for unique postId generation
import "./CreateEvent.css";
import yspaLogo from '../../assets/logos/yspa.png'; 
const supabaseUrl = "https://bjntxmsmpmbldbqsftof.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqbnR4bXNtcG1ibGRicXNmdG9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MDQ1MjEsImV4cCI6MjA1OTA4MDUyMX0.t8Ig_iyBoWhRFDLROJcIRWvkT3J_SnrVuYKt5kDbg0s";
const supabase = createClient(supabaseUrl, supabaseKey);

const CreateEvent = () => {
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null); // Store the image file
    const [description, setDescription] = useState("");
    const [eventAmount, setEventAmount] = useState(""); // New state for event amount
    const [eventType, setEventType] = useState(null); // Track selected event type
    const [isPosting, setIsPosting] = useState(false); // Track posting state

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file); // Store the file
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const isFormValid = () => {
        return description && eventAmount && eventType && imagePreview;
    };

    const handlePost = async () => {
        if (!isFormValid()) return;

        setIsPosting(true); // Set posting state to true

        try {
            const postId = uuidv4(); // Generate a unique postId

            // Upload image to Supabase storage
            const { data: imageData, error: imageError } = await supabase.storage
                .from("yspapost")
                .upload(`events/${Date.now()}_${imageFile.name}`, imageFile);

            if (imageError) {
                console.error("Image upload failed:", imageError.message);
                alert("Failed to upload image. Please check your bucket and permissions.");
                setIsPosting(false);
                return;
            }

            // Get the public URL of the uploaded image
            const { data } = supabase.storage
                .from("yspapost")
                .getPublicUrl(imageData.path);
            const publicUrl = data.publicUrl;

            // Store event details in Supabase
            const { error: insertError } = await supabase
                .from("events")
                .insert([
                    {
                        postId, // Save the generated postId
                        description,
                        eventAmount: parseInt(eventAmount, 10), // Ensure eventAmount is an integer
                        eventType,
                        imageUrl: publicUrl,
                        created_at: new Date().toISOString(), // Add created_at column
                    },
                ]);

            if (insertError) {
                console.error("Event upload failed:", insertError.message);
                alert("Failed to save event details. Please check your database policies.");
                setIsPosting(false);
                return;
            }

            alert("Event posted successfully!");
            navigate("/admin"); // Redirect to admin page
        } catch (error) {
            console.error("Unexpected error:", error);
            alert("An unexpected error occurred. Please try again.");
        } finally {
            setIsPosting(false); // Reset posting state
        }
    };

    return (
        <div className="create-event-container">
            {/* Top Red Block */}
            <div className="top-red-block">
                <img src={yspaLogo} alt="YSPA Logo" className="yspa-logo" />
                <div className="yspa-text">
                    <h6 className="yspa-text">YOUTH & SPORTS PROMOTION</h6>
                    <h6 className="yspa-text">ASSOCIATION OF TAMILNADU</h6>
                </div>
            </div>

            {/* Event Type Buttons */}
            <div className="event-type-buttons">
                <button
                    className={`event-button ${eventType === "Ongoing" ? "active" : ""}`}
                    onClick={() => setEventType("Ongoing")}
                >
                    Ongoing
                </button>
                <button
                    className={`event-button ${eventType === "Upcoming" ? "active" : ""}`}
                    onClick={() => setEventType("Upcoming")}
                >
                    Upcoming
                </button>
            </div>

            {/* Description Box */}
            <textarea
                className="description-box"
                placeholder="Type Event name here..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            {/* Image Upload */}
            <div className="image-upload">
                <label htmlFor="image-input" className="image-label">
                    Choose Image
                </label>
                <input
                    id="image-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                />
                {imagePreview && (
                    <img
                        src={imagePreview}
                        alt="Preview"
                        className="image-preview"
                    />
                )}
            </div>

            {/* Event Amount */}
            <input
                type="number"
                className="event-amount-input"
                placeholder="Enter Event Amount"
                value={eventAmount}
                onChange={(e) => setEventAmount(e.target.value)}
            />

            {/* Post Button */}
            <button
                className="back-button"
                onClick={handlePost}
                disabled={!isFormValid() || isPosting} // Disable button if form is invalid or posting
            >
                {isPosting ? "Posting..." : "Post"}
            </button>

            {/* Back Button */}
            <button className="back-button" onClick={() => navigate(-1)}>
                Back
            </button>
        </div>
    );
};

export default CreateEvent;
