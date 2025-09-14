import { supabase } from "./supabase";
import { authType } from "../_types/auth";

export const signUp = async ({ email, password }: authType) => {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) throw error;

  if (data.user) {
    await supabase.from("profiles").insert([
      {
        id: data.user.id,
        email: data.user.email,
      },
    ]);
  }

  return data;
};

export const signIn = async ({ email, password }: authType) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};
