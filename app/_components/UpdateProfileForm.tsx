import React from "react";
import { CountryTypes, UpdateProfileProps } from "../_types/profile";
import { updateProfile } from "../_services/actions";
import Image from "next/image";
import UpdateProfileButton from "./UpdateProfileButton";
import { getCountries } from "../_services/dataService";


const UpdateProfileForm = async ({ user }: UpdateProfileProps) => {
  const { fullName, email, country, phone, countryFlag } = user;

  const countries = await getCountries();
  const flag =
    countries.find((c: CountryTypes) => c.name === country)?.flag ?? "";

  return (
    <form
      action={updateProfile}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col "
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          name="fullName"
          defaultValue={fullName}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          name="email"
          defaultValue={email}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="phone">Mobile Number</label>
        <input
          name="phone"
          type="tel"
          defaultValue={phone}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="country">Where are you from?</label>
          <Image
            src={countryFlag}
            width={50}
            height={50}
            alt="Country flag"
            className="rounded-sm"
          />
        </div>
        <select
          name="country"
          id="country"
          defaultValue={`${country}%${flag}`}
          className={
            "px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          }
        >
          <option value="">Select country...</option>
          {countries.map((country: CountryTypes) => (
            <option
              key={country.name}
              value={`${country.name}%${country.flag}`}
            >
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end items-center gap-6">
        <UpdateProfileButton />
      </div>
    </form>
  );
};

export default UpdateProfileForm;
