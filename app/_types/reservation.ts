import { Dispatch, SetStateAction } from "react";

export type ReservationType = {
  selectedDate: Date | undefined;
  setSelectedDate: Dispatch<SetStateAction<Date | undefined>>;
  resetDate: () => void;
  hourRange: HourRangeType;
  setHourRange: Dispatch<SetStateAction<HourRangeType>>;
};

export type HourRangeType = {
  from: string;
  to: string;
}