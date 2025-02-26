import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "../utils/api";
import '../index.css';


function BookingForm({ doctorId, date, slot, onSuccess, onError }) {
  const [form, setForm] = useState({ patientName: "", appointmentType: "", notes: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/appointments", {
        doctorId,
        date: `${date}T${slot}:00Z`,
        ...form,
      })
      .then(onSuccess)
      .catch(onError);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Booking Form</h2>
      <TextField
        label="Patient Name"
        value={form.patientName}
        onChange={(e) => setForm({ ...form, patientName: e.target.value })}
        required
        fullWidth
      />
      <TextField
        label="Appointment Type"
        value={form.appointmentType}
        onChange={(e) => setForm({ ...form, appointmentType: e.target.value })}
        required
        fullWidth
      />
      <TextField
        label="Notes"
        multiline
        value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
        fullWidth
      />
      <Button type="submit" variant="contained">
        Book Appointment
      </Button>
    </form>
  );
}

export default BookingForm;
