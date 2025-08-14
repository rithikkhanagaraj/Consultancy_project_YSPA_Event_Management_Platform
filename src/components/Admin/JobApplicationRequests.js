import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import "./JobApplicationRequests.css"; // Create your own CSS file
import yspaLogo from "../../assets/logos/yspa.png"; // Adjust the path as necessary

// Supabase client setup
const supabaseUrl = "https://bjntxmsmpmbldbqsftof.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqbnR4bXNtcG1ibGRicXNmdG9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MDQ1MjEsImV4cCI6MjA1OTA4MDUyMX0.t8Ig_iyBoWhRFDLROJcIRWvkT3J_SnrVuYKt5kDbg0s"; // Replace with your key
const supabase = createClient(supabaseUrl, supabaseKey);

const JobApplicationRequests = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for error handling
  const navigate = useNavigate();

  // Fetch job applications from Supabase
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data, error } = await supabase.from("job_applications").select("*");

        if (error) {
          throw new Error(error.message);
        }

        setApplications(data);
      } catch (err) {
        setError(err.message); // Set error message
        console.error("Error fetching applications:", err);
      } finally {
        setLoading(false); // Hide loading spinner once data is fetched
      }
    };

    fetchApplications();
  }, []);

  // Handle the acceptance or rejection of a job application
  const handleAction = async (id, action) => {
    try {
      let updateError;
      if (action === "accepted") {
        const { error } = await supabase
          .from("job_applications")
          .update({ status: "accepted" })
          .eq("id", id);

        updateError = error;
      } else if (action === "rejected") {
        const { error } = await supabase
          .from("job_applications")
          .delete()
          .eq("id", id);

        updateError = error;
      }

      if (updateError) {
        throw new Error(updateError.message);
      }

      alert(`${action.charAt(0).toUpperCase() + action.slice(1)} application!`);
      setApplications((prev) =>
        prev.map((app) =>
          app.id === id ? { ...app, status: action === "accepted" ? "accepted" : "rejected" } : app
        )
      );
    } catch (err) {
      alert("Error processing application: " + err.message);
      console.error("Error processing application:", err);
    }
  };

  if (loading) {
    return <p>Loading applications...</p>;
  }

  return (
    <div className="job-applications-container">
      <div className="top-red-block">
        <img src={yspaLogo} alt="YSPA Logo" className="yspa-logo" />
        <div className="yspa-text">
          <h6 className="yspa-text">YOUTH & SPORTS PROMOTION</h6>
          <h6 className="yspa-text">ASSOCIATION OF TAMILNADU</h6>
        </div>
      </div>

      <h2>Job Applications</h2>
      <button className="back-button" onClick={() => navigate(-1)}>
        Back
      </button>
      {error ? (
        <p>Error fetching applications: {error}</p>
      ) : applications.length === 0 ? (
        <p>No job applications to display.</p>
      ) : (
        applications.map((application) => (
          <div key={application.id} className="job-application">
            <p>
              <strong>Name:</strong> {application.name}
            </p>
            <p>
              <strong>Email:</strong> {application.email}
            </p>
            <p>
              <strong>Phone:</strong> {application.phone}
            </p>
            <p>
              <strong>Address:</strong> {application.address}
            </p>

            {application.resume_url && (
              <div>
                <p><strong>Resume:</strong></p>
                <a href={application.resume_url} target="_blank" rel="noopener noreferrer">
                  View Resume
                </a>
              </div>
            )}

            {application.status === "accepted" && (
              <p className="accepted-status">✅ Accepted</p>
            )}

            
          </div>
        ))
      )}
    </div>
  );
};

export default JobApplicationRequests;