import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Profile from "./components/profile/Profile";
import Layout from "./components/Layout/Layout"; // Shared layout with bottom navigation
import Admin from "./components/Admin/Admin";
import CreateEvent from "./components/Admin/CreateEvent";
import Feed from "./components/Feed/Feed"; // Import Feed component
import Payment from "./components/Payment/Payment"; // Import Payment component
import FormIRequest from "./components/FormIRequest/FormIRequest";
import FormIIRequest from "./components/FormIIRequest/FormIIRequest";
import FormIIRequests from "./components/Admin/FormIIRequests"; // Adjust if in a different folder
import FormIVRequest from"./components/FormIVRequest/FormIVRequest";
import JobApplication from "./components/JobApplication/JobApplication";
import ComplaintForm from "./components/ComplaintForm/ComplaintForm";
import FormRequests from "./components/Admin/FormRequests"; // Import FormRequests component
import Ticket from "./components/Ticket/Ticket";
import SportsList from "./components/Admin/SportsList";
import Responses from "./components/Admin/Responses"; // Import Responses component
import LandingPage from "./components/LandingPage/LandingPage"; // Import LandingPage component
import Complaint from "./components/Admin/Complaint"; // Import Complaint component
import JobApplicationRequests from "./components/Admin/JobApplicationRequests"; // Import JobApplicationRequests component
import FormIVRequests from "./components/Admin/FormIVRequests"; // Adjust if in a different folder
import FormIIIRequest from"./components/FormIIIRequest/FormIIIRequest";
import FormIIIRequests from "./components/Admin/FormIIIRequests";
import Analytics from "./components/Admin/Analytics";


function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} /> {/* Add LandingPage route */}
            <Route path="/home" element={<Layout><Home /></Layout>} />
            <Route path="/profile" element={<Layout><Profile /></Layout>} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/create-event" element={<CreateEvent />} />
            <Route path="/admin/form-requests" element={<FormRequests />} /> {/* Add FormRequests route */}
            <Route path="/admin/form-ii-requests" element={<FormIIRequests />} />
            <Route path="/feed" element={<Layout><Feed /></Layout>} /> {/* Add Feed route */}
            <Route path="/payment" element={<Payment />} /> {/* Add Payment route */}
            <Route path="/form-i-request" element={<FormIRequest />} />
            <Route path="/form-ii-request" element={<FormIIRequest />} />
            <Route path="/form-iv-request" element={<FormIVRequest />} />
            <Route path="/complaints" element={<Layout><ComplaintForm /></Layout>} />
            <Route path="/job-application" element={<JobApplication />} />
            <Route path="/complaint-form" element={<ComplaintForm />} />
            <Route path="/ticket" element={<Ticket />} />
            <Route path="/admin/sports-list" element={<SportsList />} />
            <Route path="/admin/responses/:sportName" element={<Responses />} /> 
            <Route path="/admin/complaint" element={<Complaint />} />
            <Route path="/admin/complaints" element={<Complaint />} />
            <Route path="/admin/job-application" element={<JobApplicationRequests />} />
            <Route path="/admin/form-iii-requests" element={<FormIIIRequests />} />
            <Route path="/admin/form-iv-requests" element={<FormIVRequests />} />
            <Route path="/form-iii-request" element={<FormIIIRequest />} />
            <Route path="/admin/form-ii-requests" element={<FormIIRequests />} />
            <Route path="/admin/analytics" element={<Analytics />} />
        </Routes>
    );
}

export default App;
