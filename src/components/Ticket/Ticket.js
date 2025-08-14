import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import { createClient } from "@supabase/supabase-js"; // Import Supabase client
import "./Ticket.css";
import yspaLogo from "../../assets/logos/yspa.png"; // Updated file extension to .png

const supabaseUrl = "https://bjntxmsmpmbldbqsftof.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqbnR4bXNtcG1ibGRicXNmdG9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MDQ1MjEsImV4cCI6MjA1OTA4MDUyMX0.t8Ig_iyBoWhRFDLROJcIRWvkT3J_SnrVuYKt5kDbg0s";
const supabase = createClient(supabaseUrl, supabaseKey);

const Ticket = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { eventId = "N/A", formData = {}, teamMembers = [], eventAmount = "N/A" } = location.state || {}; // Extract eventAmount

    // Redirect to home if no data is available
    if (!location.state) {
        return (
            <div className="ticket-container">
                <h2>Invalid Ticket</h2>
                <p>No ticket data found. Please complete the payment process first.</p>
                <button className="back-button" onClick={() => navigate("/")}>
                    Go to Home
                </button>
            </div>
        );
    }

    const calculateTotalAmount = () => {
        if (teamMembers && teamMembers.length > 0) {
            return eventAmount * teamMembers.length; // Multiply by the number of team members
        }
        return eventAmount || 0; // Solo amount
    };

    const storeTicketDetails = async () => {
        try {
            // Ensure teamMembers is always an array
            const safeTeamMembers = Array.isArray(teamMembers) ? teamMembers : [];

            const { error } = await supabase.from("Register").insert([ // Updated table name to "Register"
                {
                    event_id: eventId,
                    sport_name: formData.sportName || "N/A",
                    date: formData.date || "N/A",
                    email: formData.email || "N/A",
                    payment_status: "Successful",
                    team_name: formData.teamName || null,
                    team_members: safeTeamMembers.length > 0 ? safeTeamMembers : null, // Use safeTeamMembers
                    solo_name: formData.soloName || null,
                },
            ]);

            if (error) {
                console.error("Error storing ticket details:", error.message);
                alert("Failed to store ticket details. Please try again.");
            } else {
                console.log("Ticket details stored successfully in the Register table!");
            }
        } catch (err) {
            console.error("Unexpected error:", err);
            alert("An unexpected error occurred while storing ticket details.");
        }
    };

    const downloadTicket = async () => {
        const doc = new jsPDF();

        // Add logo and title
        doc.addImage(yspaLogo, "PNG", 20, 10, 30, 30); // Updated file extension to .png
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("Youth & Sports Promotion Association", 60, 20);
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("Event Ticket", 90, 30);

        const addDetails = (title, yStart) => {
            let yPosition = yStart;
            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            doc.text(title, 20, yPosition);
            yPosition += 10;

            doc.text("Event ID", 20, yPosition);
            doc.setFont("helvetica", "normal");
            doc.text(eventId, 60, yPosition);
            yPosition += 10;

            doc.setFont("helvetica", "bold");
            doc.text("Sport Name", 20, yPosition);
            doc.setFont("helvetica", "normal");
            doc.text(formData.sportName || "N/A", 60, yPosition);
            yPosition += 10;

            // Add solo name or team name after sport name
            doc.setFont("helvetica", "bold");
            if (teamMembers && teamMembers.length > 0) {
                doc.text("Team Name", 20, yPosition);
                doc.setFont("helvetica", "normal");
                doc.text(formData.teamName || "N/A", 60, yPosition);
            } else {
                doc.text("Solo Name", 20, yPosition);
                doc.setFont("helvetica", "normal");
                doc.text(formData.soloName || "N/A", 60, yPosition);
            }
            yPosition += 10;

            doc.setFont("helvetica", "bold");
            doc.text("Date", 20, yPosition);
            doc.setFont("helvetica", "normal");
            doc.text(formData.date || "N/A", 60, yPosition);
            yPosition += 10;

            doc.setFont("helvetica", "bold");
            doc.text("Email", 20, yPosition);
            doc.setFont("helvetica", "normal");
            doc.text(formData.email || "N/A", 60, yPosition);
            yPosition += 10;

            doc.setFont("helvetica", "bold");
            doc.text("Payment Status", 20, yPosition);
            doc.setFont("helvetica", "normal");
            doc.text("Successful", 60, yPosition);
            yPosition += 10;

            doc.setFont("helvetica", "bold");
            doc.text("Event Amount", 20, yPosition);
            doc.setFont("helvetica", "normal");
            doc.text(`${calculateTotalAmount()}`, 60, yPosition); // Display total amount
            yPosition += 10;

            // Move team members section before signature
            if (teamMembers && teamMembers.length > 0) {
                doc.setFont("helvetica", "bold");
                doc.text("Team Members", 20, yPosition);
                doc.setFont("helvetica", "normal");

                // Dynamically display team members as 5 members per row
                const membersPerRow = 5; // Number of members per row
                const columnSpacing = 30; // Spacing between columns
                let columnStartX = 60; // Starting x position for the first column
                let rowY = yPosition; // Starting y position for rows

                teamMembers.forEach((member, index) => {
                    const columnIndex = index % membersPerRow; // Determine the column index
                    const rowIndex = Math.floor(index / membersPerRow); // Determine the row index

                    const xPosition = columnStartX + columnIndex * columnSpacing; // Calculate x position
                    const yPosition = rowY + rowIndex * 10; // Calculate y position

                    doc.text(`${index + 1}. ${member}`, xPosition, yPosition);
                });

                yPosition = rowY + Math.ceil(teamMembers.length / membersPerRow) * 10 + 3; // Update yPosition after team members
            } 

            // Add signature section
            doc.setFont("helvetica", "bold");
            doc.text("Signature:", 20, yPosition);
            doc.text("Co-ordinator Signature:", 120, yPosition);

            return yPosition + 20; // Return the next starting position
        };

        // Add details for user purpose
        let nextY = addDetails("For User Purpose", 50);

        // Add details for administration purpose
        addDetails("For Administration Purpose", nextY);

        // Save the PDF
        doc.save("event_ticket.pdf");

        // Store ticket details in Supabase
        await storeTicketDetails();
    };

    return (
        <div className="ticket-container">
            <img src={yspaLogo} alt="YSPA Logo" className="ticket-logo" />
            <h2>Youth & Sports Promotion Association</h2>
            <h3>Event Ticket</h3>
            <table className="ticket-table">
                <tbody>
                    <tr>
                        <td><strong>Event ID</strong></td>
                        <td>{eventId}</td>
                    </tr>
                    <tr>
                        <td><strong>Sport Name</strong></td>
                        <td>{formData.sportName || "N/A"}</td>
                    </tr>
                    {teamMembers && teamMembers.length > 0 ? (
                        <>
                            <tr>
                                <td><strong>Team Name</strong></td>
                                <td>{formData.teamName || "N/A"}</td>
                            </tr>
                            <tr>
                                <td><strong>Team Members</strong></td>
                                <td>
                                    <ul>
                                        {teamMembers.map((member, index) => (
                                            <li key={index}>{member}</li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        </>
                    ) : (
                        <tr>
                            <td><strong>Name</strong></td>
                            <td>{formData.soloName || "N/A"}</td>
                        </tr>
                    )}
                    <tr>
                        <td><strong>Date</strong></td>
                        <td>{formData.date || "N/A"}</td>
                    </tr>
                    <tr>
                        <td><strong>Email</strong></td>
                        <td>{formData.email || "N/A"}</td>
                    </tr>
                    <tr>
                        <td><strong>Payment Status</strong></td>
                        <td>Successful</td>
                    </tr>
                    <tr>
                        <td><strong>Event Amount</strong></td>
                        <td>{calculateTotalAmount()}</td> {/* Dynamically calculate total amount */}
                    </tr>
                    
                </tbody>
            </table>
            <button className="download-button" onClick={downloadTicket}>
                Download Ticket
            </button>
            <button className="back-button" onClick={() => navigate(-1)}>Back</button>
        </div>
    );
};

export default Ticket;
