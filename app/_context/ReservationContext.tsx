"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { ReservationType } from "../_types/reservation";

const ReservationConext = createContext<ReservationType | undefined>(undefined);

export const ReservationProvider = ({ children }: { children: ReactNode }) => {
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    undefined
  );

  const resetDate = () => setSelectedDate(undefined);

  return (
    <ReservationConext.Provider
      value={{ selectedDate, setSelectedDate, resetDate }}
    >
      {children}
    </ReservationConext.Provider>
  );
};

export const useReservation = () => {
  const context = useContext(ReservationConext);
  if (context === undefined) {
    throw new Error("Couldn't get reservation data!");
  }
  return context;
};
