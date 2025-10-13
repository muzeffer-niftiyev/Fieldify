"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { HourRangeType, ReservationType } from "../_types/reservation";

const ReservationConext = createContext<ReservationType | undefined>(undefined);

export const ReservationProvider = ({ children }: { children: ReactNode }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [hourRange, setHourRange] = useState<HourRangeType>({
    from: "12",
    to: "13",
  });

  const resetHourRange = () => {
    setHourRange({ from: "12", to: "13" });
  };

  return (
    <ReservationConext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        resetHourRange,
        hourRange,
        setHourRange,
      }}
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
