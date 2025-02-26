import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/api";
import { CircularProgress, Button } from "@mui/material";
import '../index.css';


function DoctorSelection() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/doctors")
      .then((response) => {
        setDoctors(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load doctors");
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Select a Doctor</h1>
      {doctors.map((doctor) => (
        <Button
          key={doctor._id}
          variant="contained"
          onClick={() => navigate(`/doctor/${doctor._id}/slots`)}
        >
          {doctor.name}
        </Button>
      ))}
    </div>
  );
}

export default DoctorSelection;
