import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import "./FormIIRequests.css";
import yspaLogo from '../../assets/logos/yspa.png';

const supabaseUrl = "https://bjntxmsmpmbldbqsftof.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqbnR4bXNtcG1ibGRicXNmdG9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MDQ1MjEsImV4cCI6MjA1OTA4MDUyMX0.t8Ig_iyBoWhRFDLROJcIRWvkT3J_SnrVuYKt5kDbg0s";
const supabase = createClient(supabaseUrl, supabaseKey);

const FormIIRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRequests = async () => {
            const { data, error } = await supabase
                .from("form_ii_requests")
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
                .from("form_ii_requests")
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
                .from("form_ii_requests")
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

            <h2>Form II Requests</h2>
            <button className="back-button" onClick={() => navigate(-1)}>
                Back
            </button>
            {requests.map((request) => (
                <div key={request.id} className="form-request">
                    <p><strong>Player Name:</strong> {request.player_name}</p>
                    <p><strong>Date of Birth:</strong> {request.dob}</p>
                    <p><strong>Sport:</strong> {request.sport}</p>
                    <p><strong>Registration No:</strong> {request.registration_no}</p>
                    <p><strong>Nominee Name:</strong> {request.nominee_name}</p>
                    <p><strong>Relationship:</strong> {request.nominee_relationship}</p>
                    <p><strong>Nominee DOB:</strong> {request.nominee_dob}</p>
                    <p><strong>Nominee Contact:</strong> {request.nominee_contact}</p>
                    <p><strong>Nominee Address:</strong> {request.nominee_address}</p>
                    <p><strong>Alternative Nominee:</strong> {request.alt_nominee}</p>
                    <p><strong>Declaration:</strong> {request.declaration ? "Yes" : "No"}</p>

                    {request.player_signature && (
                        <div>
                            <p><strong>Player Signature:</strong></p>
                            <img src={request.player_signature} alt="Player Signature" className="signature-preview" />
                        </div>
                    )}

                    {request.witness_signature_1 && (
                        <div>
                            <p><strong>Witness 1 Signature:</strong></p>
                            <img src={request.witness_signature_1} alt="Witness 1 Signature" className="signature-preview" />
                        </div>
                    )}

                    {request.witness_signature_2 && (
                        <div>
                            <p><strong>Witness 2 Signature:</strong></p>
                            <img src={request.witness_signature_2} alt="Witness 2 Signature" className="signature-preview" />
                        </div>
                    )}

                    <p><strong>Date:</strong> {request.date}</p>

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

export default FormIIRequests;