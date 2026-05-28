const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getUserInfoAndCart = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/cart/`, {
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

const fetchCartFromBackend = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cart`, {
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
    console.error("Error fetching cart:", error);
    throw error; // Let the caller handle the error
  }
};

const handleLogout = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      window.location.href = "/"; // Redirect to home page
    } else {
      console.error("Failed to logout:", response.statusText);
    }
  } catch (error) {
    console.error("An error occurred during logout:", error);
  }
};

export { getUserInfoAndCart, fetchCartFromBackend, handleLogout };
