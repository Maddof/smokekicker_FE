import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value || null;

    if (!refreshToken) {
      return Response.json(
        { error: "No refresh token found" },
        { status: 401 },
      );
    }

    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Refresh-Token": refreshToken || "",
      },

      credentials: "include", // Important! Ensures cookies are sent & received
    });

    // console.log(response);

    if (!response.ok) {
      return Response.json(
        { error: "Failed to refresh token" },
        { status: 401 },
      );
    }

    const data = await response.json();
    return Response.json(data, { status: 200 }); // Send back new access token
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
