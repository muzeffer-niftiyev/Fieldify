import Link from "next/link";
import { login } from "./actions";

const Page = () => {
  return (
    <form className="flex flex-col items-center mt-15">
      <h2 className="text-4xl text-primary-200 mb-10">Login</h2>

      <div className="flex flex-col gap-4 mb-8">
        <div className="flex gap-8 flex-col">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border border-primary-900 rounded-sm px-8 py-3 text-lg outline-none w-[350px] text-primary-300"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border border-primary-900 rounded-sm px-8 py-3 text-lg outline-none w-[350px] text-primary-300"
            />
          </div>
        </div>

        <Link href={"/signup"} className="underline text-primary-700 text-md">
          Don&apos;t have an account?
        </Link>
      </div>

      <button
        type="submit"
        formAction={login}
        className="bg-blue-700 text-primary-100 px-10 py-3 rounded hover:bg-blue-800 cursor-pointer transition-colors duration-300 disabled:opacity-50"
      >
        Login
      </button>
    </form>
  );
};

export default Page;

// Error lara duzelis
