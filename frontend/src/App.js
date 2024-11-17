import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AudiencePage from "./pages/AudiencePage";
import CampaignPage from "./pages/CampaignPage";
import DeliveryStatus from "./components/DeliveryStatus";
import CommunicationLogs from "./components/CommunicationLogs";
import CommunicationLogsPage from "./pages/CommunicationLogsPage"; // Import page
import CampaignHistoryPage from "./pages/CampaignHistoryPage";
import StatsPage from "./components/StatsPage";
import "./styles/global.css"; // Global styles
import "./styles/Variables.css";
import "./styles/App.css"; 
const App = () => {
  return (
    
      <>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/audiences" element={<AudiencePage />} />
            <Route path="/campaigns" element={<CampaignPage />} />
            <Route path="/campaign-history" element={<CampaignHistoryPage />} />
            <Route path="/delivery-status" element={<DeliveryStatus />} />
            <Route path="/communications" element={<CommunicationLogs />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/communication-logs" element={<CommunicationLogsPage />} /> {/* Add route */}
          </Routes>
        </div>
        <Footer />
      </>
    
  );
};

export default App;
