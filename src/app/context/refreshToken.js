const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function refreshAccessToken() {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include", // Include cookies for fallback
    });

    if (!response.ok) {
      console.error("Failed to refresh token");
      return false;
    }

    console.log("Successfully refreshed token.");
    return true;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return false;
  }
}
