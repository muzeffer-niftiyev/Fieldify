"use client";

import Image from "next/image";
import { useEditReservation } from "../_context/EditReservationConext";
import { NewFieldSelectorProps } from "../_types/reservation";

const NewFieldSelector = ({ fieldData, totalHours }: NewFieldSelectorProps) => {
  const { selectedFieldId, setSelectedFieldId, setTotalPrice } =
    useEditReservation();

  const handleClick = (fieldId: number, fieldPrice: number) => {
    setSelectedFieldId(fieldId);
    setTotalPrice(fieldPrice * totalHours);
  };

  return (
    <>
      <label className="text-lg">Change field</label>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-6 mt-2">
        {fieldData?.map((field) => (
          <div key={field.id} className="border-2 border-primary-800">
            <div className="relative aspect-1/1 flex flex-col justify-center">
              <Image
                src={field.image}
                fill
                className={`object-cover 
                  ${!field.isFree ? "grayscale-[80%]" : ""}`}
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
                onClick={() => handleClick(field.id, field.price)}
                disabled={field.id === selectedFieldId || !field.isFree}
                className="bg-zinc-800 cursor-pointer hover:bg-zinc-900 transition-all disabled:cursor-not-allowed disabled:bg-zinc-500 disabled:text-zinc-300 text-primary-200 text-lg py-2 mt-4 w-full"
              >
                {field.id === selectedFieldId
                  ? "Selected"
                  : field.isFree
                  ? "Select"
                  : "Reserved"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default NewFieldSelector;
