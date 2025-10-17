import {
  getFields,
  getReservation,
  getReservationDatesByField,
} from "@/app/_services/dataService";
import { EditReservationParams } from "@/app/_types/reservation";
import Image from "next/image";

const page = async ({ params }: EditReservationParams) => {
  const { reservationId } = params;
  const { fieldId, notes, startDate, endDate } = await getReservation(
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
    if (id === fieldId) return true;
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

  if (!allFields) {
    throw new Error("Couldn't get fields data.");
  }

  const fieldData = await Promise.all(
    allFields.map(async (field) => {
      const free = await isFieldFree(field.id);
      return { ...field, isFree: free };
    })
  );

  const startHour = new Date(startDate).getHours();
  const endHour = new Date(endDate).getHours();
  const totalHours = endHour - startHour;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-2xl text-primary-200 mb-8">
          Edit Reservation #{reservationId}
        </h2>
        <p className="text-lg text-primary-300">
          {formatDate(startDate)} | {startHour}:00 - {endHour}:00
        </p>
      </div>

      <div className="bg-primary-900 p-6 text-primary-200 space-y-8">
        <label className="text-lg">Change field</label>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-6 mt-2">
          {fieldData?.map((field) => (
            <div key={field.id} className="border-2 border-primary-800">
              <div className="relative aspect-1/1 flex flex-col justify-center">
                <Image
                  src={field.image}
                  fill
                  className={`object-cover 
                  ${!field.isFree ? "grayscale-[70%]" : ""}`}
                  alt={`${field.name} image`}
                />
              </div>
              <h4 className="text-2xl font-extrabold text-center mt-2">
                {field.name}
              </h4>
              <div>
                <p className="text-primary-300 text-lg text-center">
                  Total price:
                  <span className="text-primary-200 text-xl">
                    {" "}
                    ${field.price * totalHours}
                  </span>
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  disabled={field.id === fieldId || !field.isFree}
                  className=" bg-secondary-900 cursor-pointer hover:bg-secondary-950 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 text-primary-200 rounded-sm text-lg my-4 py-1 px-8"
                >
                  {field.id === fieldId
                    ? "Selected"
                    : field.isFree
                    ? "Select"
                    : "Reserved"}
                </button>
              </div>

              {/* <button
                disabled={field.isFree}
                className="bg-red-500 disabled:bg-green-800"
              >
                {field.isFree
                  ? "Can Select"
                  : field.id === fieldId
                  ? "Current Field"
                  : "Can't select"}
              </button> */}
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <label htmlFor="notes" className="text-lg">
            Anything you want to note about your reservation
          </label>
          <textarea
            name="notes"
            rows={4}
            placeholder="Your Notes..."
            defaultValue={notes}
            className="mt-2 px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm resize-none"
          />
        </div>
        <div className="flex justify-end">

        <button>Edit Reservation</button>
        </div>
      </div>
    </div>
  );
};

export default page;
