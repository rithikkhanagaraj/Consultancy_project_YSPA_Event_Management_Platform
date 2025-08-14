import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient"; // Use the shared Supabase client
import "./Responses.css"; // Import CSS for styling

const Responses = () => {
    const { sportName } = useParams(); // Get sport_name from the route parameters
    const [tickets, setTickets] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // State for search input
    const [filteredTickets, setFilteredTickets] = useState([]); // State for filtered tickets
    const navigate = useNavigate();

    // Fetch tickets based on the sport_name
    const fetchTickets = async () => {
        try {
            const { data, error } = await supabase
                .from("Register") // Updated table name to "Register"
                .select("*")
                .eq("sport_name", sportName);

            if (error) {
                console.error("Error fetching tickets:", error.message);
            } else {
                setTickets(data);
                setFilteredTickets(data); // Initialize filtered tickets
            }
        } catch (err) {
            console.error("Unexpected error:", err);
        }
    };

    // Filter tickets based on the search term
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        const filtered = tickets.filter((ticket) =>
            ticket.event_id.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredTickets(filtered);
    };

    useEffect(() => {
        fetchTickets();
    }, [sportName]);

    return (
        <div className="responses-container" style={{ padding: "16px" }}>
            <h2 style={{ textAlign: "center", color: "#d71920", marginBottom: 10 }}>
                Tickets for <span style={{ color: "#132577" }}>{sportName}</span>
            </h2>
            <div className="search-bar" style={{ textAlign: "center", marginBottom: 20 }}>
                <input
                    type="text"
                    placeholder="Search by Event ID"
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        width: "250px",
                        fontSize: "1rem"
                    }}
                />
            </div>
            <div style={{
                overflowX: "auto",
                background: "#fff",
                borderRadius: "12px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                padding: "10px"
            }}>
                <table className="ticket-table" style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    minWidth: "700px"
                }}>
                    <thead>
                        <tr style={{ background: "linear-gradient(90deg, #d71920 60%, #132577 100%)", color: "#fff" }}>
                            <th style={{ padding: "12px", borderRadius: "8px 0 0 8px" }}>Event ID</th>
                            <th>Sport Name</th>
                            <th>Solo Name</th>
                            <th>Team Name</th>
                            <th>Date</th>
                            <th>Email</th>
                            <th style={{ borderRadius: "0 8px 8px 0" }}>Team Members</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTickets.length === 0 ? (
                            <tr>
                                <td colSpan={7} style={{ textAlign: "center", padding: "20px", color: "#888" }}>
                                    No tickets found.
                                </td>
                            </tr>
                        ) : (
                            filteredTickets.map((ticket, index) => (
                                <tr
                                    key={index}
                                    style={{
                                        background: index % 2 === 0 ? "#f9f9f9" : "#f1f5fa",
                                        transition: "background 0.2s"
                                    }}
                                >
                                    <td style={{ padding: "10px", fontWeight: 600, color: "#d71920" }}>{ticket.event_id}</td>
                                    <td style={{ padding: "10px" }}>{ticket.sport_name}</td>
                                    <td style={{ padding: "10px" }}>{ticket.solo_name || <span style={{ color: "#bbb" }}>N/A</span>}</td>
                                    <td style={{ padding: "10px" }}>{ticket.team_name || <span style={{ color: "#bbb" }}>N/A</span>}</td>
                                    <td style={{ padding: "10px" }}>{ticket.date}</td>
                                    <td style={{ padding: "10px" }}>{ticket.email}</td>
                                    <td style={{ padding: "10px" }}>
                                        {ticket.team_members && ticket.team_members.length > 0
                                            ? (
                                                <ul style={{ margin: 0, paddingLeft: 18 }}>
                                                    {ticket.team_members.map((member, idx) => (
                                                        <li key={idx} style={{ fontSize: "0.98em" }}>{member}</li>
                                                    ))}
                                                </ul>
                                            )
                                            : <span style={{ color: "#bbb" }}>N/A</span>
                                        }
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <button
                className="back-button"
                style={{
                    width: "100%",
                    maxWidth: 100,
                    margin: "20px auto",
                    display: "block",
                    fontSize: "1rem"
                }}
                onClick={() => navigate(-1)}
            >
                Back
            </button>
        </div>
    );
};

export default Responses;
