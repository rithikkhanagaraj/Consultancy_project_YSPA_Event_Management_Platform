import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import logo from "../../assets/logos/yspa.png";
import "./JobApplication.css";
// In any component



// Initialize Supabase client
const supabaseUrl = "https://bjntxmsmpmbldbqsftof.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqbnR4bXNtcG1ibGRicXNmdG9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MDQ1MjEsImV4cCI6MjA1OTA4MDUyMX0.t8Ig_iyBoWhRFDLROJcIRWvkT3J_SnrVuYKt5kDbg0s";
const supabase = createClient(supabaseUrl, supabaseKey);

const JobApplication = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    resume: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "resume" ? files[0] : value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const { resume } = formData;

  if (!resume) {
    alert("Please upload a resume.");
    return;
  }

  // 1. Check if email already exists in the job_applications table
  const { data: existingApplications, error: emailCheckError } = await supabase
    .from("job_applications")
    .select("*")
    .eq("email", formData.email);

  if (emailCheckError) {
    console.error("Email check error:", emailCheckError.message);
    alert("Error checking for existing email.");
    return;
  }

  if (existingApplications.length > 0) {
    alert("This email has already been used for a job application.");
    return;
  }

  // 2. Upload resume to Supabase Storage
  const fileName = `${Date.now()}_${resume.name}`;
  const { data: uploadData, error: uploadError } = await supabase
    .storage
    .from("resumes")
    .upload(fileName, resume);

  if (uploadError) {
    console.error("Upload error:", uploadError);
    alert("Failed to upload resume: " + uploadError.message);
    return;
  }

  // 3. Get public URL for the uploaded resume
  const { data: publicData, error: publicUrlError } = supabase
    .storage
    .from("resumes")
    .getPublicUrl(fileName);

  if (publicUrlError) {
    console.error("Public URL error:", publicUrlError);
    alert("Failed to get public URL for resume.");
    return;
  }

  const resumeUrl = publicData.publicUrl;

  // 4. Insert the job application into the job_applications table
  const { error: insertError } = await supabase
    .from("job_applications")
    .insert([
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        resume_url: resumeUrl,
      },
    ]);

  if (insertError) {
    console.error("Insert error:", insertError);
    alert("Failed to submit job application: " + insertError.message);
    return;
  }

  alert("Job Application Submitted Successfully!");
  setFormData({
    name: "",
    email: "",
    phone: "",
    address: "",
    resume: null,
  });
};


  return (
    <>
      {/* Header Block */}
      <div className="top-header">
        <img src={logo} alt="Logo" className="logo-img" />
        <div>
          <h2 className="header-title"></h2>
          <h6 className="header-subtitle"><b>YOUTH & SPORTS PROMOTION ASSOCIATION OF TAMILNADU</b></h6>
        </div>
      </div>

      
        <form onSubmit={handleSubmit} className="form-layout">
          <h2 className="form-heading">Job Application Form</h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <textarea
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          ></textarea>

          {/* Resume Upload */}
          <label>
            <legend>Resume:</legend>
            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit" className="submit-btn">Submit</button>
          <button type="button" className="back-bt" onClick={() => navigate("/feed")}>
            Back
          </button>
        </form>
     
    </>
  );
};

export default JobApplication;