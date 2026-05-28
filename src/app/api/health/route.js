// src/app/api/health/route.js
// A simple health check endpoint

import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse("OK", { status: 200 });
}
