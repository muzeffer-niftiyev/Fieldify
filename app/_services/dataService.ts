import { supabase } from "./supabase";

export const getFields = async () => {
  const { data, error } = await supabase.from("fields").select("*");
  if (error) {
    console.log(error.message);
  }
  return data;
};
