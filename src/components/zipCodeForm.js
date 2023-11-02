import React, { useState } from "react";
import axios from "axios";
import "./zipcodeform.css";
import { useSnackbar } from "notistack";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

const ZipCodeForm = ({ setLocation }) => {
  const [zipCode, setZipCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // Add state for error
  const [data, setData] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const handleZipCodeChange = (e) => {
    setZipCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (!/^\d{6}$/.test(zipCode)) {
      setError("Zip code not found. Please check the zip code and try again.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.zippopotam.us/in/${zipCode}`
      );
      const data = response.data;

      if (response.status === 404) {
        setError(
          "Zip code not found. Please check the zip code and try again."
        );
      } else {
        setLocation(data);
      }
      setData(data);
    } catch (error) {
      console.error("API Error:", error);
      if (error.response) {
        // Server returned an error
        setError("Server error. Please try again later.");
      } else if (error.request) {
        // No response from the server
        setError("Network error. Please check your internet connection.");
      } else {
        // Other errors
        setError("An error occurred. Please try again.");
      }
      enqueueSnackbar("Error fetching data", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setZipCode("");
    setData(null);
    setLocation(null);
    setError("");
  };

  return (
    <div className="zipcode-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Zip Code"
          value={zipCode}
          onChange={handleZipCodeChange}
        />
        <div className="buttons-container">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleClear}>
            Clear
          </button>
        </div>
      </form>
      {loading && (
        <Box
          style={{
            color: "black",
            margin: "16px",
          }}
        >
          <CircularProgress />
          <Typography variant="body1">Fetching Data...</Typography>
        </Box>
      )}
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default ZipCodeForm;
