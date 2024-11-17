import React from "react";
import "../styles/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-card fade-in">
        <h3>Manage Audiences</h3>
        <p>Create and manage audience segments.</p>
      </div>
      <div className="dashboard-card fade-in">
        <h3>Manage Campaigns</h3>
        <p>Run and monitor marketing campaigns.</p>
      </div>
      <div className="dashboard-card fade-in">
        <h3>View Statistics</h3>
        <p>Analyze performance metrics.</p>
      </div>
    </div>
  );
};

export default Dashboard;
