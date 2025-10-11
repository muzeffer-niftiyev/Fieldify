import { notFound } from "next/navigation";
import { supabase } from "../_utils/supabase/client";

export const getFields = async () => {
  const { data, error } = await supabase.from("fields").select("*");
  if (error) {
    console.log(error.message);
  }
  return data;
};

export const getField = async (id: number) => {
  const { data, error } = await supabase
    .from("fields")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    notFound();
  }
  return data;
};

export const addNewUserEmail = async (email: string) => {
  const { error } = await supabase.from("users").insert([{ email }]);

  if (error) {
    console.log(error);
  }
};

export const getUser = async (email: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  return data;
};

export const createUser = async (newUser: { email: string; name: string }) => {
  const { data, error } = await supabase.from("users").insert([newUser]);

  if (error) {
    console.log(error);
  }

  return data;
};

export const getCountries = async () => {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag"
    );
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error("Could not fetch countries");
  }
};
