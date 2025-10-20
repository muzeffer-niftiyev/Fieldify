"use client";

import { useEditReservation } from "../_context/EditReservationConext";
import { editReservation } from "../_services/actions";

const EditReservationButton = ({ reservationId }: { reservationId: number}) => {
  const { selectedFieldId, reservationNotes } = useEditReservation();

  const handleClick = async () => {
    await editReservation(selectedFieldId, reservationNotes, reservationId);
  };

  return (
    <div className="flex justify-end">
      <button onClick={handleClick}>Update Reservation</button>
    </div>
  );
};

export default EditReservationButton;
