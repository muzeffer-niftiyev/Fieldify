"use client";

import Image from "next/image";
import { ReservationDataTypes } from "../_types/reservation";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { deleteReservation } from "../_services/actions";
import { useTransition } from "react";
import Link from "next/link";

const ReservationCard = ({
  reservation,
}: {
  reservation: ReservationDataTypes;
}) => {
  const {
    id,
    userId,
    startDate,
    created_at,
    endDate,
    totalPrice,
    fields: { name, image },
  } = reservation;

  const now = new Date();
  const startHour = new Date(startDate).getHours();
  const endHour = new Date(endDate).getHours();
  const totalHours = endHour - startHour;
  const createdDate = new Date(created_at);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
  };

  const getStatus = () => {
    const start = new Date(startDate);
    return start >= now ? "upcoming" : "past";
  };

  const getDayDifference = () => {
    const start = new Date(startDate);
    const nowMid = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startMid = new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate()
    );

    const dayDifference = Math.round(
      (+startMid - +nowMid) / (24 * 60 * 60 * 1000)
    );

    if (dayDifference === 0) {
      return "today";
    } else if (dayDifference === 1) {
      return "tomorrow";
    } else if (Math.abs(dayDifference) === 1) {
      return "yesterday";
    } else if (dayDifference > 0) {
      return `in ${dayDifference} days`;
    } else {
      return `${Math.abs(dayDifference)} days ago`;
    }
  };

  const [pending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(() => deleteReservation(id));
  };

  return (
    <div className="flex border-2 border-primary-800">
      <div className="h-42 relative aspect-square">
        <Image
          src={image}
          fill
          className="object-cover border-r-2 border-primary-800"
          alt="Field image"
        />
      </div>

      <div className="flex-grow flex flex-col justify-between px-6 py-4 border-r-2 border-primary-800">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="text-2xl text-primary-200">
              {totalHours} hours at {name}
            </h3>
            <p className="text-md text-primary-300">
              {formatDate(startDate)} ({getDayDifference()}) | {startHour}:00 -{" "}
              {endHour}:00
            </p>
          </div>
          {getStatus() === "past" ? (
            <p className="uppercase bg-yellow-800 py-1 px-4 text-primary-200">
              {getStatus()}
            </p>
          ) : (
            <p className="uppercase bg-green-800 py-1 px-4 text-primary-200">
              {getStatus()}
            </p>
          )}
        </div>
        <div className="flex justify-between">
          <p className="text-xl text-primary-300">${totalPrice}</p>
          <p className="text-primary-400">
            Booked {formatDate(created_at)} |{" "}
            {createdDate.getHours().toString().padStart(2, "0")}:
            {createdDate.getMinutes().toString().padStart(2, "0")}
          </p>
        </div>
      </div>

      <div className="flex flex-col">
        <Link
          href={`/account/reservations/edit/${id}`}
          className="flex-1 px-6 py-2 text-md uppercase text-primary-300 flex justify-center items-center gap-2 border-b-2 border-primary-800 cursor-pointer transition-all hover:bg-primary-900"
        >
          <FaEdit size={20} />
          <span>Edit</span>
        </Link>
        <button
          onClick={handleDelete}
          className="flex-1 px-6 py-2 text-md uppercase text-primary-300 flex justify-center items-center gap-2 cursor-pointer transition-all hover:bg-primary-900"
        >
          {!pending ? (
            <>
              <RiDeleteBin6Fill size={20} />
              <span>Delete</span>
            </>
          ) : (
            <span className="mx-auto">
              <div className="spinner-mini"></div>
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default ReservationCard;
