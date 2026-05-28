// import { fetchSession } from "../auth/authDAL";
import { getAccessTokenFromCookies } from "../cookies/cookies";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// const createPendingOrder = async ({
//   userId,
//   cartItems,
//   totalAmount,
//   currency,
// }) => {
//   try {
//     const user = await fetchSession();
//     const token = await getAccessTokenFromCookies(); // Await the token retrieval

//     if (!user) {
//       throw new Error("User not authenticated");
//     }

//     const orderResponse = await fetch(`${API_BASE_URL}/orders`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`, // Include the token
//       },

//       body: JSON.stringify({
//         userId,
//         cartItems,
//         totalAmount,
//         currency,
//         stripePaymentIntentId: null, // Set as null initially
//       }),
//     });

//     if (!orderResponse.ok) {
//       const errorData = await orderResponse.json();
//       console.error("Error creating order:", errorData.error);
//       throw new Error(errorData.error || "Failed to create order");
//     }

//     const order = await orderResponse.json();

//     return order;
//   } catch (error) {
//     console.error("Error creating order:", error.message);
//     throw new Error("Error creating pending order");
//   }
// };

const fetchUserOrders = async (page = "1") => {
  try {
    const token = await getAccessTokenFromCookies(); // Await the token retrieval

    const response = await fetch(
      `${API_BASE_URL}/orders/user?page=${page}&limit=8`,
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

const fetchRecentOrders = async () => {
  try {
    const token = await getAccessTokenFromCookies(); // Await the token retrieval

    const response = await fetch(`${API_BASE_URL}/orders/user/recent`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token
      },
    });

    if (response.status === 401) {
      console.error("User is unauthenticated or token is invalid.");
      throw new Error("Unauthorized. Please log in.");
    }

    if (!response.ok) {
      console.error("Failed to fetch recent orders.");
      throw new Error("Failed to fetch recent orders.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recent orders:", error);
    return { error: error.message }; // Explicitly return error message
  }
};

const fetchOrderDetails = async (orderId) => {
  try {
    const token = await getAccessTokenFromCookies(); // Await the token retrieval

    const response = await fetch(`${API_BASE_URL}/orders/user/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token
      },
    });

    if (response.status === 401) {
      console.error("User is unauthenticated or token is invalid.");
      throw new Error("Unauthorized. Please log in.");
    }

    if (!response.ok) {
      console.error("Failed to fetch orderdetails.");
      throw new Error("Failed to fetch orderdetails.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching orderdetails:", error);
    return { error: error.message }; // Explicitly return error message
  }
};

export { fetchUserOrders, fetchRecentOrders, fetchOrderDetails };
