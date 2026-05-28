import { getAccessTokenFromCookies } from "../cookies/cookies";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getUserAndAddressById = async () => {
  try {
    const token = await getAccessTokenFromCookies();
    const response = await fetch(`${API_BASE_URL}/user/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user info.");
    }

    const data = await response.json();
    return data; // Return the data to the caller
  } catch (error) {
    console.error("Error getting user by id:", error);
    throw error; // Let the caller handle the error
  }
};

const getUserInfoAndPersonDataById = async () => {
  try {
    const token = await getAccessTokenFromCookies();
    const response = await fetch(`${API_BASE_URL}/user/persondata`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user and person data.");
    }

    const data = await response.json();
    return data; // Return the data to the caller
  } catch (error) {
    console.error("Error getting user and person data by id:", error);
    throw error; // Let the caller handle the error
  }
};

export { getUserAndAddressById, getUserInfoAndPersonDataById };
