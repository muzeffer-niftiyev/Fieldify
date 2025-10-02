import { Dispatch, SetStateAction } from "react";

export type ReservationType = {
  selectedDate: Date | undefined;
  setSelectedDate: Dispatch<SetStateAction<Date | undefined>>;
  resetDate: () => void;
};