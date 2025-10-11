export type SelectCountryProps = {
  defaultCountry: string;
  name: string;
  id: string;
};

export type CountryTypes = { name: string; flag: string };

export type UpdateProfileProps = {
  user: {
    fullName: string;
    email: string;
    country: string;
    phone: string;
    countryFlag: string;
  };
};


