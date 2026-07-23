"use server";

import { cookies } from "next/headers";

const AGE_VERIFICATION_COOKIE = "smokekicker_age_verified";

export async function confirmLegalAge() {
  const cookieStore = await cookies();

  cookieStore.set(AGE_VERIFICATION_COOKIE, "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}
