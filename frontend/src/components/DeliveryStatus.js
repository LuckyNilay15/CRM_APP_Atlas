import React, { useState, useEffect } from "react";
import { fetchDeliveryReceipts } from "../services/communicationService";
import "./styles/DeliveryStatus.css";

const DeliveryStatus = () => {
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    const loadReceipts = async () => {
      try {
        const data = await fetchDeliveryReceipts();
        setReceipts(data);
      } catch (error) {
        console.error("Failed to load delivery receipts:", error);
      }
    };

    loadReceipts();
  }, []);

  return (
    <div>
      <h1>Delivery Receipts</h1>
      <table>
        <thead>
          <tr>
            <th>Campaign Name</th>
            <th>Audience Size</th>
            <th>Percentage Sent</th>
            <th>Percentage Failed</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {receipts.map((receipt, index) => (
            <tr key={index}>
              <td>{receipt.campaign_name || "N/A"}</td>
              <td>{receipt.audience_size|| "N/A"}</td>
              <td>{receipt.percentage_sent || "0.00"}%</td>
              <td>{receipt.percentage_failed || "0.00"}%</td>
              <td>
                {receipt.updated_at
                  ? new Date(receipt.updated_at).toLocaleString()
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryStatus;
