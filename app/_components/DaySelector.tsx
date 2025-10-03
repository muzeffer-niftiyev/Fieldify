"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useReservation } from "../_context/ReservationContext";
import { useEffect } from "react";

const DaySelector = () => {
  const { selectedDate, setSelectedDate } = useReservation();

  return (
    <div className="w-[50%] justify-center items-center">
      <DayPicker
        className="rdp"
        animate
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        disabled={{ before: new Date() }}
        startMonth={new Date()}
        endMonth={new Date(new Date().setMonth(new Date().getMonth() + 2))}
      />
      {selectedDate && (
        <div className="flex gap-8 mt-8 w-full">
          <div className="flex flex-1 flex-col gap-2">
            <label htmlFor="from" className="text-lg text-primary-200">
              From
            </label>
            <select
              className="border-2 border-primary-900 rounded px-4 py-3 outline-none text-md cursor-pointer"
              name="from"
              onChange={(e) => console.log(e.target.value)}
            >
              {Array.from({ length: 9 }, (_, i) => 12 + i).map((hour) => (
                <option
                  key={hour}
                  value={hour}
                  className="text-primary-200 bg-primary-900 font-semibold"
                >
                  {hour}:00
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <label htmlFor="to" className="text-lg text-primary-200">
              To
            </label>
            <select
              className="border-2 border-primary-900 rounded px-4 py-3 outline-none text-md cursor-pointer"
              name="to"
              onChange={(e) => console.log(e.target.value)}
            >
              {Array.from({ length: 9 }, (_, i) => 12 + i).map((hour) => (
                <option
                  key={hour}
                  value={hour}
                  className="text-primary-200 bg-primary-900 font-semibold"
                >
                  {hour}:00
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default DaySelector;
