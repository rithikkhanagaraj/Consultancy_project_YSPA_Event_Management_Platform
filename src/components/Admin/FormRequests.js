import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import "./FormRequests.css";
import yspaLogo from '../../assets/logos/yspa.png';

const supabaseUrl = "https://bjntxmsmpmbldbqsftof.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqbnR4bXNtcG1ibGRicXNmdG9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MDQ1MjEsImV4cCI6MjA1OTA4MDUyMX0.t8Ig_iyBoWhRFDLROJcIRWvkT3J_SnrVuYKt5kDbg0s";
const supabase = createClient(supabaseUrl, supabaseKey);

const FormRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch requests from the database
    useEffect(() => {
        const fetchRequests = async () => {
            const { data, error } = await supabase.from("form_i_requests").select("*");
            if (error) {
                console.error("Error fetching requests:", error.message);
            } else {
                setRequests(data);
            }
            setLoading(false);
        };

        fetchRequests();
    }, []);

    // Handle acceptance or rejection of a request
    const handleAction = async (id, action) => {
        if (action === "rejected") {
            // Delete the request from the database
            const { error } = await supabase
                .from("form_i_requests")
                .delete()
                .eq("id", id);

            if (error) {
                console.error(`Error deleting request: ${error.message}`);
            } else {
                alert(`Request ID: ${id} has been ${action}`);
                // Update the local state to remove the rejected request
                setRequests(prevRequests => prevRequests.filter(request => request.id !== id));
            }
        } else if (action === "accepted") {
            // Update the status of the request in the database
            const { error } = await supabase
                .from("form_i_requests")
                .update({ status: action }) // Assuming you have a "status" column
                .eq("id", id);

            if (error) {
                console.error(`Error updating request status: ${error.message}`);
            } else {
                alert(`Request ID: ${id} has been ${action}`);
                // Update the local state to reflect the change
                setRequests(prevRequests =>
                    prevRequests.map(request =>
                        request.id === id ? { ...request, status: action } : request
                    )
                );
            }
        }
    };

    if (loading) {
        return <p>Loading requests...</p>;
    }

    return (
        <div className="form-requests-container">
            <div className="top-red-block">
                <img src={yspaLogo} alt="YSPA Logo" className="yspa-logo" />
                <div className="yspa-text">
                    <h6 className="yspa-text">YOUTH & SPORTS PROMOTION</h6>
                    <h6 className="yspa-text">ASSOCIATION OF TAMILNADU</h6>
                </div>
            </div>
            <h2>Form I Requests</h2>
            <button className="back-button" onClick={() => navigate(-1)}>
                Back
            </button>
            {requests.map((request) => (
                <div key={request.id} className="form-request">
                    <p><strong>Full Name:</strong> {request.full_name}</p>
                    <p><strong>Date of Birth:</strong> {request.dob}</p>
                    <p><strong>Gender:</strong> {request.gender}</p>
                    <p><strong>Sport:</strong> {request.sport}</p>
                    <p><strong>Player ID:</strong> {request.player_id}</p>
                    <p><strong>Contact Details:</strong> {request.contact_details}</p>
                    <p><strong>Chronic Illness:</strong> {request.chronic_illness ? "Yes" : "No"}</p>
                    <p><strong>Previous Surgeries:</strong> {request.previous_surgeries ? "Yes" : "No"}</p>
                    <p><strong>Medication:</strong> {request.medication}</p>
                    <p><strong>COVID Vaccination:</strong> {request.covid_vaccination}</p>
                    <p><strong>Declaration Date:</strong> {request.declaration_date}</p>
                    <p><strong>Declaration of Fitness:</strong> {request.declaration_of_fitness ? "Yes" : "No"}</p>
                    {request.player_signature && (
                        <div>
                            <p><strong>Player Signature:</strong></p>
                            <img src={request.player_signature} alt="Player Signature" className="signature-preview" />
                        </div>
                    )}
                    {request.guardian_signature && (
                        <div>
                            <p><strong>Guardian Signature:</strong></p>
                            <img src={request.guardian_signature} alt="Guardian Signature" className="signature-preview" />
                        </div>
                    )}
                    <div className="action-buttons">
                        {request.status === "accepted" ? (
                            <p className="accepted-status">✅ Accepted</p>
                        ) : (
                            <>
                                <button onClick={() => handleAction(request.id, "accepted")}>Accept</button>
                                <button onClick={() => handleAction(request.id, "rejected")}>Reject</button>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FormRequests;