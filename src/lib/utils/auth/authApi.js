const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const registerUser = async (personalNumber, givenName, surname) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ personalNumber, givenName, surname }),
      credentials: "include", // Include cookies
    });

    if (!response.ok) {
      throw new Error("Failed to register or log in the user.");
    }

    const data = await response.json();
    return data; // Return the data to the caller
  } catch (error) {
    console.error("Error during user registration:", error);
    throw error; // Let the caller handle the error
  }
};

const logout = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include", // Include cookies
    });

    if (!response.ok) {
      throw new Error("Failed to log out.");
    }

    console.log("Logout successful");
    return true; // Indicate success to the caller
  } catch (error) {
    console.error("Error during logout:", error);
    throw error; // Let the caller handle the error
  }
};

export { registerUser, logout };
