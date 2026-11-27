"use server";

import { redirect } from "next/navigation";
import { destroySession } from "@/lib/user-auth";

export async function farmerLogout() {
  await destroySession("farmer");
  redirect("/farmer/login");
}
