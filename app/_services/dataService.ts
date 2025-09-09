import { notFound } from "next/navigation";
import { supabase } from "./supabase";

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
