import { getAccessTokenFromCookies } from "../cookies/cookies";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetchUserSubscriptions = async (page = "1") => {
  try {
    const token = await getAccessTokenFromCookies(); // Await the token retrieval

    const response = await fetch(
      `${API_BASE_URL}/subscriptions/user?page=${page}&limit=5`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token
        },
        credentials: "include", // Ensure cookies are sent & received
      },
    );

    if (response.status === 401) {
      console.error("User is unauthenticated or token is invalid.");
      throw new Error("Unauthorized. Please log in.");
    }

    if (!response.ok) {
      console.error("Failed to fetch user orders.");
      throw new Error("Failed to fetch user orders.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return { error: error.message }; // Explicitly return error message
  }
};

const fetchUserActiveAndPastDueSubscriptions = async () => {
  try {
    const token = await getAccessTokenFromCookies(); // Await the token retrieval

    const response = await fetch(
      `${API_BASE_URL}/subscriptions/user/activeAndPastDue`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token
        },
      },
    );

    if (response.status === 401) {
      console.error("User is unauthenticated or token is invalid.");
      throw new Error("Unauthorized. Please log in.");
    }

    if (!response.ok) {
      console.error("Failed to fetch user active subscriptions.");
      throw new Error("Failed to fetch user active subscriptions.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user active subscriptions:", error);
    return { error: error.message }; // Explicitly return error message
  }
};

const fetchsubscriptionDetails = async (subscriptionId) => {
  try {
    const token = await getAccessTokenFromCookies(); // Await the token retrieval

    const response = await fetch(
      `${API_BASE_URL}/subscriptions/user/${subscriptionId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token
        },
      },
    );

    if (response.status === 401) {
      console.error("User is unauthenticated or token is invalid.");
      throw new Error("Unauthorized. Please log in.");
    }

    if (!response.ok) {
      console.error("Failed to fetch subscription details.");
      throw new Error("Failed to fetch subscription details.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching subscription details:", error);
    return { error: error.message }; // Explicitly return error message
  }
};

export {
  fetchUserSubscriptions,
  fetchUserActiveAndPastDueSubscriptions,
  fetchsubscriptionDetails,
};
