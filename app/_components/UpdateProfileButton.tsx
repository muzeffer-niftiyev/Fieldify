"use client";

import { useFormStatus } from "react-dom";

const UpdateProfileButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="bg-secondary-900 px-8 py-4 text-primary-200 font-semibold rounded-sm cursor-pointer hover:bg-secondary-950 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
    >
      {pending ? "Updating..." : "Update profile"}
    </button>
  );
};

export default UpdateProfileButton;
