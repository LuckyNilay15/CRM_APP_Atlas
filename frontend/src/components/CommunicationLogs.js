import React, { useEffect, useState } from "react";
import { fetchCommunicationLogs } from "../services/communicationService";
import "./styles/CommunicationLogs.css";
const CommunicationLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const loadLogs = async () => {
      try {
        const data = await fetchCommunicationLogs();
        setLogs(data);
      } catch (error) {
        console.error("Failed to load communication logs:", error);
      }
    };

    loadLogs();
  }, []);

  return (
    <div className="container">
      <h1>Communication Logs</h1>
      <table>
        <thead>
          <tr>
            <th>Campaign Name</th>
            <th>Audience Name</th>
            <th>Customer Name</th>
            <th>Message</th>
            <th>Delivery Status</th>
            <th>Date</th> 
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log._id}>
              <td>{log.campaign_name || "N/A"}</td>
              <td>{log.audience_name || "N/A"}</td>
              <td>{log.customer_name || "N/A"}</td>
              <td>{log.message}</td>
              <td>{log.delivery_status}</td>
              <td>{log.date ? new Date(log.date).toLocaleString() : "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommunicationLogs;
