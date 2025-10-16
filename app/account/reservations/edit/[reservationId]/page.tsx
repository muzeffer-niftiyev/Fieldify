import {
  getFields,
  getReservation,
  getReservationDatesByField,
} from "@/app/_services/dataService";
import { EditReservationParams } from "@/app/_types/reservation";
import Image from "next/image";

const page = async ({ params }: EditReservationParams) => {
  const { reservationId } = params;
  const { fieldId, notes, startDate, endDate, fields } = await getReservation(
    reservationId
  );
  const allFields = await getFields();

  const getBusyHoursForReservation = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const busyHours: Record<string, number[]> = {};
    const dateKey = start.toDateString();

    const startHour = start.getHours();
    const endHour = end.getHours();

    busyHours[dateKey] = [];

    for (let hour = startHour; hour < endHour; hour++) {
      busyHours[dateKey].push(hour);
    }

    return busyHours;
  };

  const isFieldFree = async (id: number) => {
    if (id === fieldId) return false;
    const dates = await getReservationDatesByField(id);

    const reservedByDate = dates.reduce(
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

    const reservationDate = Object.keys(getBusyHoursForReservation());
    const reservationHours = Object.values(getBusyHoursForReservation())[0];
    const reservedDates = Object.keys(reservedByDate);

    const commonDate = reservedDates.filter((date) =>
      reservationDate.includes(date)
    )[0];
    if (!commonDate) return true;

    const areEqual = reservationHours.some((value) =>
      reservedByDate[commonDate].includes(value)
    );

    if (areEqual) return false;
  };

  const fieldData = await Promise.all(
    allFields.map(async (field) => {
      const free = await isFieldFree(field.id);
      return { ...field, isFree: free };
    })
  );

  return (
    <div>
      Edit Reservation #{reservationId}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-15">
        {fieldData?.map((field) => (
          <div key={field.id}>
            <div className="h-50 relative aspect-1/1 flex flex-col justify-center">
              <Image
                src={field.image}
                fill
                className="object-cover"
                alt={`${field.name} image`}
              />
            </div>
            <button
              disabled={field.isFree}
              className="bg-red-500 disabled:bg-green-800"
            >
              {field.isFree
                ? "Can Select"
                : field.id === fieldId
                ? "Current Field"
                : "Can't select"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
