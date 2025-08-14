import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient";
import "./SportsList.css";
import { FaRunning, FaFutbol, FaBasketballBall, FaTableTennis, FaSwimmer, FaVolleyballBall, FaMedal } from "react-icons/fa";

const iconPalette = [
    <FaRunning size={32} color="#d71920" title="Running" />,
    <FaFutbol size={32} color="#132577" title="Football" />,
    <FaBasketballBall size={32} color="#f39c12" title="Basketball" />,
    <FaTableTennis size={32} color="#27ae60" title="Table Tennis" />,
    <FaSwimmer size={32} color="#8e44ad" title="Swimming" />,
    <FaVolleyballBall size={32} color="#2980b9" title="Volleyball" />,
    <FaMedal size={32} color="#b3151a" title="Other" />
];

const SportsList = () => {
    const [sportNames, setSportNames] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSportNames = async () => {
            try {
                const { data, error } = await supabase
                    .from("Register")
                    .select("sport_name")
                    .neq("sport_name", null);

                if (error) {
                    console.error("Error fetching sport names:", error.message);
                } else {
                    const uniqueSportNames = [...new Set(data.map((item) => item.sport_name))];
                    setSportNames(uniqueSportNames);
                }
            } catch (err) {
                console.error("Unexpected error:", err);
            }
        };

        fetchSportNames();
    }, []);

    // Assign icons in a round-robin fashion
    const getIcon = (idx) => iconPalette[idx % iconPalette.length];

    return (
        <div className="sports-list-analytics-container">
            <h2 className="sports-list-title">
                <FaMedal style={{ marginRight: 8, color: "#d71920" }} />
                Available Sports
            </h2>
            <div
                className="sports-list-analytics-grid"
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    alignItems: "center",
                    maxWidth: 700,
                    margin: "0 auto 30px auto",
                    background: "#f8f8f8",
                    borderRadius: 16,
                    padding: "18px 4px",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                    gap: "10px"
                }}
            >
                {sportNames.map((sportName, idx) => (
                    <div
                        key={idx}
                        className="sports-list-analytics-card"
                        style={{
                            textAlign: "center",
                            flex: "1 1 40%",
                            minWidth: 120,
                            margin: "8px 0",
                            cursor: "pointer",
                            transition: "box-shadow 0.2s",
                            boxShadow: "0 0 0 transparent"
                        }}
                        onClick={() => navigate(`/admin/responses/${sportName}`)}
                        onMouseOver={e => e.currentTarget.style.boxShadow = "0 2px 12px #d7192040"}
                        onMouseOut={e => e.currentTarget.style.boxShadow = "0 0 0 transparent"}
                    >
                        <div>{getIcon(idx)}</div>
                        <div style={{ fontWeight: 600, fontSize: 15, marginTop: 6 }}>{sportName}</div>
                    </div>
                ))}
            </div>
            <button className="back-button" onClick={() => navigate(-1)}>
                Back
            </button>
        </div>
    );
};

export default SportsList;
