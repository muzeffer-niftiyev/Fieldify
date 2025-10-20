import { Dispatch, ReactNode, SetStateAction } from "react";

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

export type EditReservationProps = {
  children: ReactNode;
  fieldId: number;
  notes: string;
};

export type EditReservationType = {
  selectedFieldId: number | undefined;
  setSelectedFieldId: Dispatch<SetStateAction<number | undefined>>;
  reservationNotes: string | undefined;
  setReservationNotes: Dispatch<SetStateAction<string | undefined>>;
};

export interface NewFieldSelectorProps {
  fieldData: {
    id: number;
    image: string;
    isFree: boolean;
    name: string;
    price: number;
  }[];
  totalHours: number;
}
