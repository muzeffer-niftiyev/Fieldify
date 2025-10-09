import Image from "next/image";
import googleLogo from "@/public/google.png";
import { signInAction } from "../_services/actions";

export const metadata = {
  title: "Login",
};

const Page = () => {
  return (
    <form action={signInAction} className="flex flex-col items-center mt-15">
      <h3 className="text-primary-100 text-2xl">
        Login to access your account data & make new reservations
      </h3>
      <button className="mt-8 flex items-center gap-6 cursor-pointer border-2 border-primary-800 py-2 px-8">
        <Image src={googleLogo} width={40} height={40} alt="Google Logo" />
        <p className="font-semibold text-primary-200">Continue with Google</p>
      </button>
    </form>
  );
};

export default Page;
