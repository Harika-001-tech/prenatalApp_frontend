import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DoctorSelection from "./components/DoctorSelection";
import SlotSelection from "./components/SlotSelection";
import AppointmentManagement from "./components/AppointmentManagement";
import "./index.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DoctorSelection />} />
        <Route path="/doctor/:id/slots" element={<SlotSelection />} />
        <Route path="/appointments" element={<AppointmentManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
