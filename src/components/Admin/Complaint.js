import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

// Initialize Supabase client
const supabaseUrl = "https://bjntxmsmpmbldbqsftof.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqbnR4bXNtcG1ibGRicXNmdG9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MDQ1MjEsImV4cCI6MjA1OTA4MDUyMX0.t8Ig_iyBoWhRFDLROJcIRWvkT3J_SnrVuYKt5kDbg0s";
const supabase = createClient(supabaseUrl, supabaseKey);

const Complaint = () => {
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const { data, error } = await supabase.from("complaints").select("*");
        if (error) {
          console.error("Error fetching complaints:", error);
        } else {
          console.log("Fetched complaints:", data);
          setComplaints(data);
        }
      } catch (err) {
        console.error("Error during fetch:", err);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
        
      <h2>Complaints List</h2>
      <button
        onClick={() => navigate(-1)}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Back
      </button>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Address</th>
            <th style={thStyle}>Phone</th>
            <th style={thStyle}>Complaint</th>
          </tr>
        </thead>
        <tbody>
          {complaints.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "10px" }}>
                No complaints found.
              </td>
            </tr>
          ) : (
            complaints.map((complaint) => (
              <tr key={complaint.id}>
                <td style={tdStyle}>{complaint.name}</td>
                <td style={tdStyle}>{complaint.address}</td>
                <td style={tdStyle}>{complaint.phone}</td>
                <td style={tdStyle}>{complaint.complaint}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

// Table styling
const thStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "8px",
};

export default Complaint;