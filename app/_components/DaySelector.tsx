"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useReservation } from "../_context/ReservationContext";

const fromHours = Array.from({ length: 9 }, (_, i) => 12 + i);
const toHours = Array.from({ length: 9 }, (_, i) => 13 + i);

const DaySelector = () => {
  const { selectedDate, setSelectedDate, setHourRange, hourRange } =
    useReservation();

  const handleFromChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const from = event.target.value;
    setHourRange((prev) => ({ ...prev, from }));
  };

  const handleToChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const to = event.target.value;
    setHourRange((prev) => ({ ...prev, to }));
  };

  const filteredFromHours = fromHours.filter((hour) => {
    if (!hourRange.to) return true;
    const toIndex = toHours.indexOf(+hourRange.to);
    const hourIndex = fromHours.indexOf(hour);
    return toIndex >= hourIndex && hourIndex > toIndex - 3;
  });

  const filteredToHours = toHours.filter((hour) => {
    if (!hourRange.from) return true;
    const fromIndex = fromHours.indexOf(+hourRange.from);
    const hourIndex = toHours.indexOf(hour);
    return hourIndex >= fromIndex && hourIndex < fromIndex + 3;
  });

  const resetHours = () => {
    setHourRange({ from: "", to: "" });
  };

  return (
    <div className="w-[50%] flex items-start gap-8">
      <DayPicker
        className="rdp"
        animate
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        disabled={[{ before: new Date() }, new Date()]}
        startMonth={new Date()}
        endMonth={new Date(new Date().setMonth(new Date().getMonth() + 2))}
      />
      {selectedDate && (
        <div className="flex gap-8 mt-8 w-full flex-col">
          <div className="flex flex-1 flex-col gap-2">
            <label htmlFor="from" className="text-lg text-primary-200">
              Start Hour
            </label>
            <select
              className="border-2 border-primary-900 rounded px-4 py-3 outline-none text-md cursor-pointer"
              name="from"
              value={hourRange.from || "12"}
              onChange={(event) => handleFromChange(event)}
            >
              {filteredFromHours.map((hour) => (
                <option
                  key={hour}
                  value={hour}
                  className="text-primary-200 bg-primary-900 font-semibold disabled:text-primary-800"
                >
                  {hour}:00
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <label htmlFor="to" className="text-lg text-primary-200">
              End Hour
            </label>
            <select
              className="border-2 border-primary-900 rounded px-4 py-3 outline-none text-md cursor-pointer"
              name="to"
              value={hourRange.to || "13"}
              onChange={(event) => handleToChange(event)}
            >
              {filteredToHours.map((hour) => (
                <option
                  key={hour}
                  value={hour}
                  className="text-primary-200 bg-primary-900 font-semibold disabled:text-primary-800 "
                >
                  {hour}:00
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center">
            <button
              onClick={resetHours}
              className="font-semibold text-lg bg-primary-900 hover:bg-primary-800 transition-all duration-300 py-2 px-12 cursor-pointer rounded-md"
            >
              Reset Hours
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DaySelector;
