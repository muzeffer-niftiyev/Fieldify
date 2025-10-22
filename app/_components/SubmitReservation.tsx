"use client";

import { useState } from "react";
import { useAddReservation } from "../_context/AddReservationContext";
import { addReservation } from "../_services/actions";

const SubmitReservation = () => {
  const { selectedDate, hourRange,totalPrice, notes, setNotes, fieldId,resetValues } = useAddReservation();
  const [pending, setPending] = useState(false);

  const generateDates = () => {

    const startDate = new Date(selectedDate);
    startDate.setHours(+hourRange.from, 0, 0, 0);
    
    const endDate = new Date(selectedDate);
    endDate.setHours(+hourRange.to, 0, 0, 0);
    console.log({ startDate, endDate });

    return {startDate, endDate}
  }
   
  const handleClick = async () => {
    try {
      setPending(true);
      const dates = generateDates();
      console.log(dates)
      await addReservation(dates, totalPrice, notes, fieldId );
      resetValues();
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="bg-primary-900 h-full p-10 flex flex-col justify-between">
      <div className="space-y-2 ">
        <label htmlFor="notes" className="text-lg">
          Anything you want to note about your reservation
        </label>
        <textarea
          name="notes"
          rows={6}
          placeholder="Your Notes..."
          onChange={(e) => setNotes(e.target.value)}
          className="mt-2 px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm resize-none"
        />
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleClick}
          disabled={pending}
          className="bg-secondary-900 px-8 py-4 text-primary-200 font-semibold rounded-sm cursor-pointer hover:bg-secondary-950 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
        >
          {pending ? "Reserving Field..." : "Reserve Now"}
        </button>
      </div>
    </div>
  );
};

export default SubmitReservation;
