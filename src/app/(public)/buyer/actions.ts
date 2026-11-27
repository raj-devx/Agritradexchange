"use server";

import { redirect } from "next/navigation";
import { destroySession } from "@/lib/user-auth";

export async function buyerLogout() {
  await destroySession("buyer");
  redirect("/buyer/login");
}
