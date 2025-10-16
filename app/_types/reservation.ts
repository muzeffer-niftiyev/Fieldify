import { Dispatch, SetStateAction } from "react";

export type ReservationType = {
  selectedDate: Date | undefined;
  setSelectedDate: Dispatch<SetStateAction<Date | undefined>>;
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
  startDate: Date;
  created_at: Date;
  endDate: Date;
  totalPrice: string;
  fields: {
    name: string;
    image: string;
  };
};

export interface EditReservationParams {
  params: {
    reservationId: number;
  };
}
