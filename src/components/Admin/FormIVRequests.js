import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import "./FormIIRequests.css";
import yspaLogo from '../../assets/logos/yspa.png';

const supabaseUrl = "https://bjntxmsmpmbldbqsftof.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqbnR4bXNtcG1ibGRicXNmdG9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MDQ1MjEsImV4cCI6MjA1OTA4MDUyMX0.t8Ig_iyBoWhRFDLROJcIRWvkT3J_SnrVuYKt5kDbg0s";
const supabase = createClient(supabaseUrl, supabaseKey);

const FormIVRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRequests = async () => {
            const { data, error } = await supabase
                .from("form_iv_requests")
                .select("*");

            if (error) {
                console.error("Error fetching requests:", error.message);
            } else {
                setRequests(data);
            }
            setLoading(false);
        };

        fetchRequests();
    }, []);

    const handleAction = async (id, action) => {
        if (action === "accepted") {
            const { error } = await supabase
                .from("form_iv_requests")
                .update({ status: "accepted" })
                .eq("id", id);

            if (error) {
                alert("Failed to accept request: " + error.message);
            } else {
                alert("Request accepted!");
                setRequests(prev =>
                    prev.map(req =>
                        req.id === id ? { ...req, status: "accepted" } : req
                    )
                );
            }
        } else if (action === "rejected") {
            const { error } = await supabase
                .from("form_iv_requests")
                .delete()
                .eq("id", id);

            if (error) {
                alert("Failed to reject request: " + error.message);
            } else {
                alert("Request rejected and deleted!");
                setRequests(prev => prev.filter(req => req.id !== id));
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

            <h2>Form IV Requests</h2>
            <button className="back-button" onClick={() => navigate(-1)}>
                Back
            </button>
            {requests.map((request) => (
                <div key={request.id} className="form-request">
                    <p><strong>Athlete Name:</strong> {request.athlete_name}</p>
                    <p><strong>Team Name:</strong> {request.team_name}</p>
                    <p><strong>Event Name:</strong> {request.event_name}</p>
                    <p><strong>Sport:</strong> {request.sport}</p>
                    <p><strong>Registration No:</strong> {request.registration_no}</p>
                    <p><strong>Athlete Contact:</strong> {request.athlete_contact}</p>
                    <p><strong>Medical Clearance:</strong> {request.medical_clearance ? "Yes" : "No"}</p>
                    <p><strong>Eligibility Status:</strong> {request.eligibility_status}</p>
                    <p><strong>Previous Experience:</strong> {request.previous_experience}</p>
                    <p><strong>Date of Participation:</strong> {request.date_of_participation}</p>

                    {request.player_signature && (
                        <div>
                            <p><strong>Player Signature:</strong></p>
                            <img src={request.player_signature} alt="Player Signature" className="signature-preview" />
                        </div>
                    )}

                    {request.medical_assessment && (
                        <div>
                            <p><strong>Medical Assessment:</strong></p>
                            <img src={request.medical_assessment} alt="Medical Assessment" className="signature-preview" />
                        </div>
                    )}

                    {request.approval_signature && (
                        <div>
                            <p><strong>Approval Signature:</strong></p>
                            <img src={request.approval_signature} alt="Approval Signature" className="signature-preview" />
                        </div>
                    )}

                    {request.status === "accepted" && (
                        <p className="accepted-status">✅ Accepted</p>
                    )}

                    {request.status !== "accepted" && (
                        <div className="action-buttons">
                            <button onClick={() => handleAction(request.id, "accepted")}>Accept</button>
                            <button onClick={() => handleAction(request.id, "rejected")}>Reject</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FormIVRequests;