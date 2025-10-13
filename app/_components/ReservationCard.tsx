"use client";

import Image from "next/image";
import { ReservationDataTypes } from "../_types/reservation";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { deleteReservation } from "../_services/actions";
import { useTransition } from "react";

const ReservationCard = ({
  reservation,
}: {
  reservation: ReservationDataTypes;
}) => {
  const {
    id,
    userId,
    startHour,
    endHour,
    date,
    totalPrice,
    status,
    fields: { name, image },
  } = reservation;

  const totalHours = +endHour - +startHour;
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
        <div className="flex justify-between">
          <div className="space-y-1">
            <h3 className="text-xl text-primary-200">
              {totalHours} hours on {name}
            </h3>
            <p className="text-md">Jun 12 2024 (in 4 days) 15:00 - 17:00</p>
          </div>
          <p>Status</p>
        </div>
        <div className="flex justify-between">
          <p>{totalPrice}</p>
          <p>Booked June 12 2024</p>
        </div>
      </div>

      <div className="flex flex-col">
        <button className="flex-1 px-6 py-2 text-md uppercase text-primary-300 flex justify-center items-center gap-2 border-b-2 border-primary-800 cursor-pointer transition-all hover:bg-primary-900">
          <FaEdit size={20} />
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="flex-1 px-6 py-2 text-md uppercase text-primary-300 flex justify-center items-center gap-2 cursor-pointer transition-all hover:bg-primary-900"
        >
          {!pending ? (
            <>
              <RiDeleteBin6Fill size={20} />
              <span>Delete</span>{" "}
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
