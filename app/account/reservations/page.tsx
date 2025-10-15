import ReservationCard from "@/app/_components/ReservationCard";
import { auth } from "@/app/_services/auth";
import { getReservations } from "@/app/_services/dataService";
import Link from "next/link";

export const metadata = {
  title: "Reservations",
};

const Page = async () => {
  const session = await auth();
  const reservations = await getReservations(session?.user.userId);

  return (
    <div>
      <h2 className="text-2xl text-primary-200 mb-12">Your Reservations</h2>
      {reservations.length === 0 ? (
        <p className="font-semibold text-lg">
          You have no reservations yet. Check out
          <Link href={"/fields"} className="underline text-primary-300">
            {" "}
            our fields &rarr;
          </Link>
        </p>
      ) : (
        <ul className="space-y-6 max-h-[580px] overflow-y-auto pr-6">
          {reservations.map((reservation) => (
            <ReservationCard key={reservation.id} reservation={reservation} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Page;
