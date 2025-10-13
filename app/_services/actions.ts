"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "../_utils/supabase/client";
import { auth, signIn, signOut } from "./auth";
import { redirect } from "next/navigation";
import { getReservations } from "./dataService";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateProfile(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const phone = formData.get("phone") as string;
  const countryData = formData.get("country") as string;
  const [country, countryFlag] = countryData.split("%");

  if (phone && !/^\+?[0-9]{7,15}$/.test(phone)) {
    throw new Error("Please provide valid mobile number");
  }

  const updateData = { country, countryFlag, phone };

  const { error } = await supabase
    .from("users")
    .update(updateData)
    .eq("id", session.user.userId);

  if (error) throw new Error("Profile data coud not be updated");
  revalidatePath("/account");
  redirect("/fields");
}

export async function deleteReservation(reservationId: number) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const userReservations = await getReservations(session.user.userId);
  const userReservationIds = userReservations.map(
    (reservation) => reservation.id
  );

  if (!userReservationIds.includes(reservationId)) {
    throw new Error("You can't delete other's reservations");
  }

  const { error } = await supabase
    .from("reservations")
    .delete()
    .eq("id", reservationId);

  if (error) throw new Error("Error deleting the reservation!");
  revalidatePath("/account/reservations");
}
