import { getField, getFields } from "@/app/_services/dataService";
import { FieldParams } from "@/app/_types/fields";
import Image from "next/image";
import { FaPeopleLine } from "react-icons/fa6";
import { GiGrass } from "react-icons/gi";
import { FaExpandArrowsAlt, FaDollarSign } from "react-icons/fa";
import TextToggle from "@/app/_components/TextToggle";
import DaySelector from "@/app/_components/DaySelector";
import SubmitReservation from "@/app/_components/SubmitReservation";
import { auth } from "@/app/_services/auth";
import LoginMessage from "@/app/_components/LoginMessage";

export async function generateMetadata({ params }: FieldParams) {
  const { name } = await getField(params.fieldId);
  return {
    title: name,
  };
}

export async function generateStaticParams() {
  const fields = await getFields();

  const ids = fields?.map((field) => ({
    fieldId: String(field.id),
  }));
  return ids;
}

const Page = async ({ params }: FieldParams) => {
  const field = await getField(params.fieldId);
  const session = await auth();

  return (
    <div>
      <div className="max-w-7xl border-2 border-primary-900 flex mx-auto mt-10 relative">
        <div className="flex-1 relative">
          <Image
            src={field.image}
            className="object-cover"
            fill
            alt={`${field.name} image`}
          />
        </div>

        <div className="flex-1 px-12 py-15">
          <h2 className="absolute top-10 -translate-x-40 bg-primary-950 text-primary-200 text-7xl py-3 px-6">
            {field.name}
          </h2>
          <div className="mt-24 font-[600]">
            <p className="text-primary-300">
              <TextToggle>{field.description}</TextToggle>
            </p>
            <div className="flex flex-col gap-5 mt-7 text-primary-200 text-lg">
              <p className="flex gap-3 items-center">
                <FaPeopleLine size={25} className="text-primary-300" />
                {field.supporterCount > 0
                  ? `Holds up to ${field.supporterCount} supporters`
                  : `No seats for supporters`}
              </p>
              <p className="capitalize flex gap-3 items-center ">
                <GiGrass size={25} className="text-primary-300" />{" "}
                {field.surface} Grass
              </p>
              <p className="flex gap-3 items-center">
                <FaExpandArrowsAlt size={25} className="text-primary-300" />{" "}
                Sized at {field.size} m
              </p>
              <p className="flex gap-3 items-center">
                <FaDollarSign size={25} className="text-primary-300" /> $
                {field.price} / hour
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 border-2 border-primary-900 px-8 py-6 flex flex-col items-center">
        <h2 className="text-5xl text-primary-200">Reserve Now</h2>
        <div className="flex justify-between w-full gap-6 mt-6">
          <DaySelector />
          <div className="w-[50%]">
            {session?.user ? <SubmitReservation /> : <LoginMessage />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
