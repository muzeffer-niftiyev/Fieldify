"use client";

import { createContext, useContext, useState } from "react";
import {
  EditReservationProps,
  EditReservationType,
} from "../_types/reservation";

const EditReservationContext = createContext<EditReservationType | undefined>(
  undefined
);

export const EditReservationProvider = ({
  children,
  fieldId,
  notes,
}: EditReservationProps) => {
  const [selectedFieldId, setSelectedFieldId] = useState<number | undefined>(
    fieldId
  );
  const [reservationNotes, setReservationNotes] = useState<string | undefined>(
    notes
  );

  return (
    <EditReservationContext.Provider
      value={{
        selectedFieldId,
        setSelectedFieldId,
        reservationNotes,
        setReservationNotes,
      }}
    >
      {children}
    </EditReservationContext.Provider>
  );
};

export const useEditReservation = () => {
  const context = useContext(EditReservationContext);
  if (context === undefined) {
    throw new Error("Couldn't get reservation data!");
  }
  return context;
};
