"use client";

import { useEditReservation } from "../_context/EditReservationConext";
import { editReservation } from "../_services/actions";
import { useState } from "react";

const EditReservationButton = ({
  reservationId,
}: {
  reservationId: number;
}) => {
  const { selectedFieldId, reservationNotes, totalPrice } =
    useEditReservation();
  const [pending, setPending] = useState(false);

  const handleClick = async () => {
    try {
      setPending(true);
      await editReservation(
        selectedFieldId,
        reservationNotes,
        reservationId,
        totalPrice
      );
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex justify-end">
      <button
        onClick={handleClick}
        disabled={pending}
        className="bg-secondary-900 px-8 py-4 text-primary-200 font-semibold rounded-sm cursor-pointer hover:bg-secondary-950 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      >
        {pending ? "Updating Reservation..." : "Update Reservation"}
      </button>
    </div>
  );
};

export default EditReservationButton;
