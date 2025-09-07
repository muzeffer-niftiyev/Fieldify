import Image from "next/image";
import bgImg from "@/public/bg.png";
import Link from "next/link";

const Page = () => {
  return (
    <div>
      <Image
        src={bgImg}
        fill
        placeholder="blur"
        quality={100}
        alt="Background image"
        className="object-cover object-top brightness-70"
      />
      <div className="flex flex-col items-center mt-60 relative z-10">
        <p className="text-6xl text-primary-100">
          Welcome to Easy Field Booking.
        </p>
        <Link
          href={"/fields"}
          className="mt-7 bg-secondary-900 hover:bg-secondary-950 transition-colors duration-300 text-primary-200 px-12 py-4 text-lg cursor-pointer rounded-sm"
        >
          Explore Fields
        </Link>
      </div>
    </div>
  );
};

export default Page;
