import EditReservationButton from "@/app/_components/EditReservationButton";
import NewFieldSelector from "@/app/_components/NewFieldSelector";
import ReservationNoteEditor from "@/app/_components/ReservationNoteEditor";
import { EditReservationProvider } from "@/app/_context/EditReservationConext";
import {
  getFields,
  getReservation,
  getReservationDatesByField,
} from "@/app/_services/dataService";
import { EditReservationParams } from "@/app/_types/reservation";

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

      <EditReservationProvider fieldId={fieldId} notes={notes}>
        <div className="bg-primary-900 p-6 text-primary-200 space-y-8">
          <NewFieldSelector fieldData={fieldData} totalHours={totalHours} />
          <ReservationNoteEditor />
          <EditReservationButton reservationId={Number(reservationId)} />
        </div>
      </EditReservationProvider>
    </div>
  );
};

export default page;
