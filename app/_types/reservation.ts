import { Dispatch, SetStateAction } from "react";

export type ReservationType = {
  selectedDate: Date | undefined;
  setSelectedDate: Dispatch<SetStateAction<Date | undefined>>;
  resetHourRange: () => void;
  hourRange: HourRangeType;
  setHourRange: Dispatch<SetStateAction<HourRangeType>>;
};

export type HourRangeType = {
  from: string;
  to: string;
};

export type ReservationDataTypes = {
  id: number;
  userId: number;
  fieldId: number;
  startHour: string;
  endHour: string;
  date: string;
  totalPrice: string;
  status: string;
  name: string;
  image: string;
  fields: {
    name: string;
    image: string;
  };
};
