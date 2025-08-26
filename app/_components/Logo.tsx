import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"} className="flex gap-5 items-center">
      <Image src={logo} width={90} height={90} alt="App logo" />
      <p>Football Court Reservation</p>
    </Link>
  );
};

export default Logo;
