"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signUp } from "../_services/auth";
import { authType } from "../_types/auth";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<authType>();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<null | string>(null);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: authType) => {
    setLoading(true);
    setServerError(null);
    setSuccess(false);

    try {
      await signUp(data);
      setSuccess(true);
      reset();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setServerError(err.message);
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
      <h2 className="text-4xl text-primary-200 mb-10">Sign Up</h2>

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

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-700 text-primary-100 px-10 py-3 rounded hover:bg-blue-800 cursor-pointer transition-colors duration-300 disabled:opacity-50"
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>

      {serverError && (
        <p className="text-sm mt-3 text-[#c71616] font-bold">{serverError}</p>
      )}
    </form>
  );
};

export default Page;
