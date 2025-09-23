"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/app/_utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const credentials = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const {  error } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    console.log(error.message);
    return;
  }

  revalidatePath("/", "layout");
  redirect("/");
}
