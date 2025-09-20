"use client";

import { useForm } from "react-hook-form";
import { authType } from "../_types/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "../_services/auth";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<authType>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: authType) => {
    setLoading(true);

    try {
      await signIn(data);
      router.push("/fields");
      //toast message here
      reset();
    } catch (error: unknown) {
      if (error instanceof Error) {
        //toast the error
        console.log(error)
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center mt-15"
    >
      <h2 className="text-4xl text-primary-200 mb-10">Login</h2>

      <div className="flex flex-col gap-8 mb-8">
        <div>
          <input
            type="email"
            placeholder="Email"
            className="border border-primary-900 rounded-sm px-8 py-3 text-lg outline-none w-[350px] text-primary-300"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-sm mt-3 text-[#c71616] font-bold">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            className="border border-primary-900 rounded-sm px-8 py-3 text-lg outline-none w-[350px]"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-sm mt-3 text-[#c71616] font-bold">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-700 text-primary-100 px-10 py-3 rounded hover:bg-blue-800 cursor-pointer transition-colors duration-300 disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default Page;
