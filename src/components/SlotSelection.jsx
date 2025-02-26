import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/api";
import { CircularProgress, Button, TextField, Snackbar } from "@mui/material";
import BookingForm from "./BookingForm";
import '../index.css';


function SlotSelection() {
  const { id } = useParams();
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch available slots whenever the date changes or component loads
  useEffect(() => {
    setLoading(true);
    axios
      .get(`/doctors/${id}/slots?date=${date}`)
      .then((response) => {
        setSlots(response.data);
        setLoading(false);
      })
      .catch(() => {
        setSlots([]);
        setLoading(false);
      });
  }, [id, date]);

  // Function to handle slot selection
  // Function to handle slot selection
  const handleSlotSelection = (slot) => {
    try {
      let formattedSlot;
  
      // Check if the slot already contains the full ISO string
      if (slot.includes("T")) {
        formattedSlot = slot;
      } else {
        // Combine date and time slot
        formattedSlot = `${date}T${slot}`;
      }
  
      // Validate and parse the combined slot
      const parsedDate = new Date(formattedSlot);
      if (isNaN(parsedDate.getTime())) {
        throw new Error("Invalid time value");
      }
  
      const validatedSlot = parsedDate.toISOString();
      setSelectedSlot(validatedSlot);
      console.log("Selected Slot:", validatedSlot);
    } catch (error) {
      console.error("Invalid slot format:", slot, error.message);
      setMessage("Invalid slot format selected. Please try again.");
    }
  };
  
  // Display fetched slots with fallback message
  const renderSlots = () => {
    if (loading) {
      return <CircularProgress />;
    }
  
    if (slots.length === 0) {
      return <p>No slots available for the selected date.</p>;
    }
  
    return slots.map((slot) => (
      <Button
        key={slot}
        variant="outlined"
        onClick={() => handleSlotSelection(slot)}
      >
        {slot}
      </Button>
    ));
  };
  
  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Available Slots</h2>
  
      {/* Date Picker */}
      <TextField
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        fullWidth
      />
  
      {/* Render Slots */}
      {renderSlots()}
  
      {/* Booking Form */}
      {selectedSlot && (
        <BookingForm
          doctorId={id}
          date={date}
          slot={selectedSlot}
          onSuccess={() => setMessage("Appointment booked successfully")}
          onError={() => setMessage("Failed to book appointment")}
        />
      )}
  
      {/* Snackbar for messages */}
      <Snackbar
        open={!!message}
        autoHideDuration={3000}
        message={message}
        onClose={() => setMessage("")}
      />
    </div>
  );}  
export default SlotSelection;
