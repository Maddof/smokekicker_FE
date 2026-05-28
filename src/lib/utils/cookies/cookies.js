import { cookies } from "next/headers";

/**
 * Extracts the token from cookies.
 *
 * @returns {string | null} The token value or null if it doesn't exist.
 */
export async function getAccessTokenFromCookies() {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("token");
  return tokenCookie?.value || null; // Return the token value or null
}

export async function getRefreshTokenFromCookies() {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("refreshToken");
  return tokenCookie?.value || null; // Return the token value or null
}
