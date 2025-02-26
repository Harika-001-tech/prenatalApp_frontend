import React, { useState, useEffect } from "react";
import axios from "../utils/api";
import { CircularProgress, Button } from "@mui/material";
import '../index.css';


function AppointmentManagement() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/appointments")
      .then((response) => {
        setAppointments(response.data);
        setLoading(false);
      })
      .catch(() => {
        setAppointments([]);
        setLoading(false);
      });
  }, []);

  const handleCancel = (id) => {
    axios.delete(`/appointments/${id}`).then(() => {
      setAppointments((prev) => prev.filter((appt) => appt._id !== id));
    });
  };

  if (loading) return <CircularProgress />;

  return (
    <div>
      <h1>My Appointments</h1>
      {appointments.map((appt) => (
        <div key={appt._id}>
          <p>
            {appt.patientName} - {new Date(appt.date).toLocaleString()}
          </p>
          <Button variant="outlined" onClick={() => handleCancel(appt._id)}>
            Cancel
          </Button>
        </div>
      ))}
    </div>
  );
}

export default AppointmentManagement;
