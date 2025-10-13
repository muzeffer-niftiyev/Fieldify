"use client";

import { useReservation } from "../_context/ReservationContext";

const SubmitReservation = () => {
  const { selectedDate, hourRange, setHourRange } = useReservation();

  const handleClick = () => {
    const startDate = new Date(selectedDate);
    startDate.setHours(+hourRange.from, 0, 0, 0);

    const endDate = new Date(selectedDate);
    endDate.setHours(+hourRange.to, 0, 0, 0);

    console.log(startDate);
    console.log(endDate);
  };

  return <button onClick={handleClick}>Submit</button>;
};

export default SubmitReservation;
