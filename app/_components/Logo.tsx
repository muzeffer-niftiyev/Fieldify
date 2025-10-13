import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";

const Logo = () => {
  return (
    <Link href={"/"} className="flex items-center relative z-10">
      <Image src={logo} width={60} height={60} alt="App logo" />
      <p className="w-[50%] text-xl text-primary-100">Fieldify</p>
    </Link>
  );
};

export default Logo;
