"use server";

import { redirect } from "next/navigation";
import { createClient } from "../_utils/supabase/server";
import { revalidatePath } from "next/cache";
import { addNewUserEmail } from "../_services/dataService";

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.log(error.message);
  } else {
    await addNewUserEmail(data.email);
  }

  revalidatePath("/", "layout");
  redirect("/");
}
