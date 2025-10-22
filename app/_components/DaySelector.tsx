"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useAddReservation } from "../_context/AddReservationContext";
import { DaySelectorPropTypes, EventType } from "../_types/fields";
import { useEffect } from "react";
import { fromHours, toHours, allHours } from "../_lib/helpers";
import TotalPriceCalculator from "./TotalPriceCalculator";

const DaySelector = ({
  reservedDates,
  price,
  id,
}: {
  reservedDates: DaySelectorPropTypes[];
  price: number;
  id: number;
}) => {
  const {
    selectedDate,
    setSelectedDate,
    setHourRange,
    hourRange,
    fieldId,
    setFieldId,
    resetValues,
  } = useAddReservation();

  const reservedByDate = reservedDates.reduce(
    (acc: Record<string, number[]>, { start, end }) => {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const dateKey = startDate.toDateString();

      if (!acc[dateKey]) acc[dateKey] = [];

      const startHour = startDate.getHours();
      const endHour = endDate.getHours();

      for (let hour = startHour; hour < endHour; hour++) {
        acc[dateKey].push(hour);
      }

      return acc;
    },
    {}
  );

  const fullyBookedDays = Object.entries(reservedByDate)
    .filter(([_, hours]) => allHours.every((h) => hours.includes(h)))
    .map(([date]) => new Date(date));

  const selectedKey = selectedDate?.toDateString();
  const reservedHoursForDay = reservedByDate[selectedKey ?? ""] || [];

  const isRangeFree = (start: number, endExclusive: number) => {
    for (let h = start; h < endExclusive; h++) {
      if (reservedHoursForDay.includes(h)) return false;
    }
    return true;
  };

  const findFirstAvailableRange = () => {
    for (let i = 0; i < fromHours.length; i++) {
      const start = fromHours[i];
      if (reservedHoursForDay.includes(start)) continue;

      const possibleTo = toHours.find(
        (t) => t > start && t - start <= 3 && isRangeFree(start, t)
      );

      if (possibleTo) {
        return { from: start.toString(), to: possibleTo.toString() };
      }
    }
    return { from: "", to: "" };
  };

  const handleFromChange = (event: EventType) => {
    const from = event.target.value;

    const newTo =
      !hourRange.to || +hourRange.to <= +from
        ? Math.min(+from + 1, toHours[toHours.length - 1]).toString()
        : hourRange.to;

    setHourRange(() => ({ to: newTo, from }));
  };

  const handleToChange = (event: EventType) => {
    const to = event.target.value;
    let newFrom;

    if (+to - +hourRange.from > 3) {
      newFrom = +to - 3;
    }

    if (newFrom) {
      setHourRange(() => ({ from: newFrom.toString(), to }));
    } else {
      setHourRange((prev) => ({ ...prev, to }));
    }
  };

  const fromNum = hourRange.from ? Number(hourRange.from) : null;

  const filteredFromHours = fromHours.filter((hour) => {
    return !reservedHoursForDay.includes(hour);
  });

  const filteredToHours = toHours.filter((hour) => {
    if (reservedHoursForDay.includes(hour - 1)) return false;
    if (fromNum === null) return true;
    if (hour <= fromNum) return false;
    if (hour - fromNum > 3) return false;

    return isRangeFree(fromNum, hour);
  });

  const handleResetHours = () => {
    if (!selectedDate) return;
    const firstAvailable = findFirstAvailableRange();
    setHourRange(firstAvailable);
  };

  useEffect(() => {
    if (id !== fieldId) {
      resetValues();
      setFieldId(id);
    }
  }, [id, fieldId, resetValues, setFieldId]);

  useEffect(() => {
    if (!selectedDate) return;
    const firstAvailable = findFirstAvailableRange();
    setHourRange(firstAvailable);
  }, [selectedDate, JSON.stringify(reservedDates)]);

  return (
    <div className="w-[50%] flex flex-col">
      <div className="flex items-start gap-8">
        <DayPicker
          className="rdp"
          animate
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          disabled={[{ before: new Date() }, new Date(), ...fullyBookedDays]}
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
                value={hourRange.from || ""}
                onChange={(event) => handleFromChange(event)}
              >
                {filteredFromHours.map((hour) => (
                  <option
                    key={hour}
                    value={hour}
                    disabled={reservedHoursForDay.includes(hour)}
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
                value={hourRange.to || ""}
                onChange={(event) => handleToChange(event)}
              >
                {filteredToHours.map((hour) => (
                  <option
                    key={hour}
                    value={hour}
                    disabled={reservedHoursForDay.includes(hour - 1)}
                    className="text-primary-200 bg-primary-900 font-semibold disabled:text-primary-800 "
                  >
                    {hour}:00
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleResetHours}
                className="font-semibold text-lg bg-primary-900 hover:bg-primary-800 transition-all duration-300 py-2 px-12 cursor-pointer rounded-md"
              >
                Reset Hours
              </button>
            </div>
          </div>
        )}
      </div>
      {selectedDate && <TotalPriceCalculator price={price} />}
    </div>
  );
};

export default DaySelector;
