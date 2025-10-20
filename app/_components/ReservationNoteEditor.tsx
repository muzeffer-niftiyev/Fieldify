"use client";

import { useEditReservation } from "../_context/EditReservationConext";

const ReservationNoteEditor = () => {
  const { reservationNotes, setReservationNotes } = useEditReservation();

  return (
    <div className="space-y-2">
      <label htmlFor="notes" className="text-lg">
        Anything you want to note about your reservation
      </label>
      <textarea
        name="notes"
        rows={4}
        placeholder="Your Notes..."
        defaultValue={reservationNotes}
        onChange={(e) => setReservationNotes(e.target.value)}
        className="mt-2 px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm resize-none"
      />
    </div>
  );
};

export default ReservationNoteEditor;
