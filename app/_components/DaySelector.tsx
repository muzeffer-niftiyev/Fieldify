"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useReservation } from "../_context/ReservationContext";

const DaySelector = () => {
  const {selectedDate, setSelectedDate} = useReservation();

  return (
    <DayPicker
      animate
      mode="single"
      selected={selectedDate}
      onSelect={setSelectedDate}
      footer={
        selectedDate
          ? `Selected: ${selectedDate.toLocaleDateString()}`
          : "Pick a day."
      }
    />
  );
};

export default DaySelector;
