// app/api/auth/session/route.js
import { NextResponse } from "next/server";
import { fetchSession } from "@/lib/utils/auth/authDAL";

export async function GET() {
  const session = await fetchSession();
  if (session) {
    return NextResponse.json(session, { status: 200 });
  } else {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
}
