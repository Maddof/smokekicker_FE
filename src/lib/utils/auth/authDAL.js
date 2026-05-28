import "server-only";

import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { cache } from "react";

/**
 * Verifies the provided JWT and returns the decoded payload.
 * @param {string} token - The JWT to verify.
 * @returns {Object|null} - Decoded payload or null if invalid/expired.
 */
const verifyAccessToken = async (token) => {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.error("Access token verification failed:", error.message);
    return null;
  }
};

/**
 * Retrieves the authenticated user session from the request.
 * @param {Request} req - The request object.
 * @returns {Object|null} - Authenticated user data if valid, otherwise null.
 */
export const fetchSession = cache(async () => {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    console.log("No token found in request.");
    return null;
  }

  const user = await verifyAccessToken(token);

  if (!user) {
    return null;
  }

  // Here I return entire user object with full payload as set in
  // backend (express.js server)
  // return user || null;

  // Filter out sensitive properties before returning
  const { userId, isAdmin, ...safeUser } = user;

  return safeUser;
});
