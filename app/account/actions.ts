"use server";

import { createClient } from "@/app/_utils/supabase/server";
import { redirect } from "next/navigation";

export const signoutAction = async () => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Signout failed:", error.message);
    return;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user);
  if (!user) {
    console.log("✅ User is signed out");
  } else {
    console.log("⚠️ User still signed in:", user.email);
  }

  redirect("/fields");
};
