import Image from "next/image";
import bgImg from "@/public/bg.png";
import Link from "next/link";

const Page = () => {
  return (
    <div>
      <Image
        src={bgImg}
        fill
        alt="Background image"
        className="-z-1 brightness-40"
      />
      <div className="flex flex-col items-center mt-60">
        <p className="text-6xl text-primary-200">
          Welcome to Football Court Reservation
        </p>
        <Link href={'/courts'} className="mt-7 bg-secondary-950 text-primary-200 px-6 py-3 text-lg cursor-pointer rounded-lg">
          Reserve Now
        </Link>
      </div>
    </div>
  );
};

export default Page;
