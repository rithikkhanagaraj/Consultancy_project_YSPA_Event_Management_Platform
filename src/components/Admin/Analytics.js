import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient";
import yspaLogo from '../../assets/logos/yspa.png';
import "./Admin.css";
// Add react-icons imports
import { FaWpforms, FaUserGraduate, FaUsers, FaChartBar, FaRegSmile, FaRunning } from "react-icons/fa";

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const Analytics = () => {
    const [analyticsData, setAnalyticsData] = useState({
        formI: 0,
        formII: 0,
        formIII: 0,
        formIV: 0,
        jobApplications: 0,
        eventParticipation: 0,
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAnalytics = async () => {
            // Fetch counts from Supabase using aggregate functions for accuracy and efficiency
            const [
                formIRes,
                formIIRes,
                formIIIRes,
                formIVRes,
                jobApplicationsRes,
                eventParticipationRes
            ] = await Promise.all([
                supabase.from("form_i_requests").select("id", { count: "exact", head: true }),
                supabase.from("form_ii_requests").select("id", { count: "exact", head: true }),
                supabase.from("form_iii_requests").select("id", { count: "exact", head: true }),
                supabase.from("form_iv_requests").select("id", { count: "exact", head: true }),
                supabase.from("job_applications").select("id", { count: "exact", head: true }),
                supabase.from("Register").select("event_id", { count: "exact", head: true }),
            ]);

            setAnalyticsData({
                formI: formIRes.count || 0,
                formII: formIIRes.count || 0,
                formIII: formIIIRes.count || 0,
                formIV: formIVRes.count || 0,
                jobApplications: jobApplicationsRes.count || 0,
                eventParticipation: eventParticipationRes.count || 0,
            });
            setLoading(false);
        };
        fetchAnalytics();
    }, []);

    if (loading) {
        return (
            <div className="admin-container">
                <div className="top-red-block">
                    <img src={yspaLogo} alt="YSPA Logo" className="yspa-logo" />
                    <div className="yspa-text">
                        <h6 className="yspa-text">YOUTH & SPORTS PROMOTION</h6>
                        <h6 className="yspa-text">ASSOCIATION OF TAMILNADU</h6>
                    </div>
                </div>
                <h2>Loading Analytics...</h2>
            </div>
        );
    }

    // Icon mapping for each category
    const iconMap = [
        <FaWpforms size={32} color="#d71920" title="Form I" />,
        <FaWpforms size={32} color="#132577" title="Form II" />,
        <FaWpforms size={32} color="#f39c12" title="Form III" />,
        <FaWpforms size={32} color="#27ae60" title="Form IV" />,
        <FaUserGraduate size={32} color="#8e44ad" title="Job Applications" />,
        <FaRunning size={32} color="#2980b9" title="Event Participation" />
    ];

    const labelMap = [
        "Form I",
        "Form II",
        "Form III",
        "Form IV",
        "Job Applications",
        "Event Participation"
    ];

    return (
        <div className="admin-container" style={{ padding: "0 8px" }}>
            <div className="top-red-block">
                <img src={yspaLogo} alt="YSPA Logo" className="yspa-logo" />
                <div className="yspa-text">
                    <h6 className="yspa-text">YOUTH & SPORTS PROMOTION</h6>
                    <h6 className="yspa-text">ASSOCIATION OF TAMILNADU</h6>
                </div>
            </div>
            <h2 style={{ marginBottom: 24, marginTop: 16, fontSize: "1.3rem" }}>
                <FaChartBar style={{ marginRight: 8, color: "#d71920" }} />
                Analytics Overview
            </h2>
            {/* Icon summary row */}
            <div style={{
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
            }}>
                {iconMap.map((icon, idx) => (
                    <div
                        key={idx}
                        style={{
                            textAlign: "center",
                            flex: "1 1 40%",
                            minWidth: 120,
                            margin: "8px 0",
                            cursor: "pointer",
                            transition: "box-shadow 0.2s",
                            boxShadow: "0 0 0 transparent"
                        }}
                        onClick={() => {
                            // Navigation logic for each analytics card
                            switch (idx) {
                                case 0:
                                    navigate("/admin/form-requests");
                                    break;
                                case 1:
                                    navigate("/admin/form-ii-requests");
                                    break;
                                case 2:
                                    navigate("/admin/form-iii-requests");
                                    break;
                                case 3:
                                    navigate("/admin/form-iv-requests");
                                    break;
                                case 4:
                                    navigate("/admin/job-application");
                                    break;
                                case 5:
                                    navigate("/admin/sports-list");
                                    break;
                                default:
                                    break;
                            }
                        }}
                        onMouseOver={e => e.currentTarget.style.boxShadow = "0 2px 12px #d7192040"}
                        onMouseOut={e => e.currentTarget.style.boxShadow = "0 0 0 transparent"}
                    >
                        <div>{icon}</div>
                        <div style={{ fontWeight: 600, fontSize: 15, marginTop: 6 }}>{labelMap[idx]}</div>
                        <div style={{
                            fontSize: 20,
                            color: "#222",
                            marginTop: 2,
                            fontWeight: 700,
                            letterSpacing: 1
                        }}>
                            {Object.values(analyticsData)[idx]}
                        </div>
                    </div>
                ))}
            </div>
            <div
                style={{
                    width: "100%",
                    maxWidth: 600,
                    margin: "0 auto",
                    minHeight: 250
                }}
            >
                <Bar
                    data={{
                        labels: labelMap,
                        datasets: [
                            {
                                label: "Total Submissions",
                                data: [
                                    analyticsData.formI,
                                    analyticsData.formII,
                                    analyticsData.formIII,
                                    analyticsData.formIV,
                                    analyticsData.jobApplications,
                                    analyticsData.eventParticipation
                                ],
                                backgroundColor: [
                                    "#d71920",
                                    "#132577",
                                    "#f39c12",
                                    "#27ae60",
                                    "#8e44ad",
                                    "#2980b9"
                                ]
                            }
                        ]
                    }}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: false },
                            title: { display: true, text: "Form-wise Submissions & Participation" },
                            // Add click event for bars
                            onClick: (e, elements) => {
                                if (elements && elements.length > 0) {
                                    const idx = elements[0].index;
                                    switch (idx) {
                                        case 0:
                                            navigate("/admin/form-requests");
                                            break;
                                        case 1:
                                            navigate("/admin/form-ii-requests");
                                            break;
                                        case 2:
                                            navigate("/admin/form-iii-requests");
                                            break;
                                        case 3:
                                            navigate("/admin/form-iv-requests");
                                            break;
                                        case 4:
                                            navigate("/admin/job-application");
                                            break;
                                        case 5:
                                            navigate("/admin/sports-list");
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            }
                        },
                        scales: {
                            y: { beginAtZero: true }
                        }
                    }}
                    height={window.innerWidth < 600 ? 220 : 320}
                />
            </div>
            <div
                style={{
                    width: "100%",
                    maxWidth: 400,
                    margin: "30px auto",
                    minHeight: 220
                }}
            >
                <Pie
                    data={{
                        labels: labelMap,
                        datasets: [
                            {
                                label: "Distribution",
                                data: [
                                    analyticsData.formI,
                                    analyticsData.formII,
                                    analyticsData.formIII,
                                    analyticsData.formIV,
                                    analyticsData.jobApplications,
                                    analyticsData.eventParticipation
                                ],
                                backgroundColor: [
                                    "#d71920",
                                    "#132577",
                                    "#f39c12",
                                    "#27ae60",
                                    "#8e44ad",
                                    "#2980b9"
                                ]
                            }
                        ]
                    }}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: "bottom" },
                            title: { display: true, text: "Distribution by Category" },
                            // Add click event for pie slices
                            onClick: (e, elements) => {
                                if (elements && elements.length > 0) {
                                    const idx = elements[0].index;
                                    switch (idx) {
                                        case 0:
                                            navigate("/admin/form-requests");
                                            break;
                                        case 1:
                                            navigate("/admin/form-ii-requests");
                                            break;
                                        case 2:
                                            navigate("/admin/form-iii-requests");
                                            break;
                                        case 3:
                                            navigate("/admin/form-iv-requests");
                                            break;
                                        case 4:
                                            navigate("/admin/job-application");
                                            break;
                                        case 5:
                                            navigate("/admin/sports-list");
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            }
                        }
                    }}
                    height={window.innerWidth < 600 ? 180 : 260}
                />
            </div>
            <button
                className="back-button"
                style={{
                    width: "100%",
                    maxWidth: 300,
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

export default Analytics;
