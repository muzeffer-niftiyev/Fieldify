"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { HourRangeType, ReservationType } from "../_types/reservation";

const AddReservationConext = createContext<ReservationType | undefined>(
  undefined
);

export const AddReservationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [hourRange, setHourRange] = useState<HourRangeType>({
    from: "",
    to: "",
  });
  const [totalPrice, setTotalPrice] = useState<number | undefined>(undefined);
  const [notes, setNotes] = useState<string | undefined>(undefined);
  const [fieldId, setFieldId] = useState<number | undefined>(undefined);

  const resetValues = () => {
    setSelectedDate(undefined);
    setHourRange({
      from: "",
      to: "",
    });
    setTotalPrice(undefined);
    setNotes(undefined);
  };

  return (
    <AddReservationConext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        hourRange,
        setHourRange,
        totalPrice,
        setTotalPrice,
        notes,
        setNotes,
        fieldId,
        setFieldId,
        resetValues,
      }}
    >
      {children}
    </AddReservationConext.Provider>
  );
};

export const useAddReservation = () => {
  const context = useContext(AddReservationConext);
  if (context === undefined) {
    throw new Error("Couldn't get reservation data!");
  }
  return context;
};
