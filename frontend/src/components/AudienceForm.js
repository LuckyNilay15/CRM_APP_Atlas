import React, { useState } from "react";
import { createAudience } from "../services/audienceService";
import "./styles/AudienceForm.css";

const AudienceForm = () => {
  const [name, setName] = useState("");
  const [criteria, setCriteria] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showHelperText, setShowHelperText] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setErrorMessage("");
      const parsedCriteria = JSON.parse(criteria); // Parse JSON string input
      await createAudience(name, parsedCriteria);
      setSuccessMessage("Audience created successfully!");
      setErrorMessage(""); // Clear error
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000); // Show popup for 3 seconds

      // Reset form fields
      setName("");
      setCriteria("");
    } catch (error) {
      setErrorMessage(
        error instanceof SyntaxError
          ? "Invalid JSON format. Please correct and try again."
          : "Failed to create audience. Please try again."
      );
      setSuccessMessage(""); // Clear success message
    }
  };

  const handleFocus = () => {
    setShowHelperText(true); // Show the helper text when focusing back
  };

  const handleBlur = () => {
    setShowHelperText(true); // Do not hide the helper text after typing
  };

  const getThreeMonthsAgoDate = () => {
    const now = new Date();
    now.setMonth(now.getMonth() - 3);
    return now.toISOString().split("T")[0];
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="audience-form">
        <div>
          <label htmlFor="name">Audience Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={handleFocus}
            required
          />
        </div>
        <div>
          <label htmlFor="criteria">Criteria (JSON):</label>
          <textarea
            id="criteria"
            placeholder={`{
  "total_spending": { "$gt": 10000 },
  "visits": { "$lte": 3 },
  "last_visit": { "$lt": "${getThreeMonthsAgoDate()}" }
}`}
            value={criteria}
            onChange={(e) => setCriteria(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
          />
          {showHelperText && (
            <div className="criteria-helper">
              Provide any one, two, or all of the criteria in JSON format. <br />
              Example: Customers who spent more than ₹10,000, made 3 or fewer visits, or 
              have not visited in the last 3 months (i.e., before {getThreeMonthsAgoDate()}).
            </div>
          )}
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit">Create Audience</button>
      </form>

      {showPopup && (
        <div className="popup">
          Audience Created Successfully!
        </div>
      )}
    </div>
  );
};

export default AudienceForm;
