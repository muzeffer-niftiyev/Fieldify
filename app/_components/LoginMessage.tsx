import Link from "next/link";

const LoginMessage = () => {
  return (
    <div className="bg-primary-800 h-full flex justify-center items-center">
      <p className="text-lg text-primary-200">
        Please
        <Link href="/login" className="underline font-extrabold text-primary-300"> login </Link>
        to complete your reservation.
      </p>
    </div>
  );
};

export default LoginMessage;
