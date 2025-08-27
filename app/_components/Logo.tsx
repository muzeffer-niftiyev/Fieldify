import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  weight: "800",
  subsets: ["latin"],
  display: "swap",
});

const Logo = () => {
  return (
    <Link href={"/"} className="flex items-center">
      <Image src={logo} width={80} height={80} alt="App logo" />
      <p className={`${manrope.className} w-[50%] text-md text-primary-100`}>
        Football Court Reservation
      </p>
    </Link>
  );
};

export default Logo;
