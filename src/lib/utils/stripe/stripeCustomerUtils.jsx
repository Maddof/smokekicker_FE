const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

import getStripeInstance from "./stripeConfig"; // Singleton instance of stripe api config
import { getAccessTokenFromCookies } from "../cookies/cookies";

const stripe = getStripeInstance();

export const findStripeCustomerId = async (email) => {
  try {
    const existingCustomers = await stripe.customers.list({
      email,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      return existingCustomers.data[0].id;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error in findCustomer:", error);
    throw error;
  }
};

export const createNewStripeCustomer = async (fullName) => {
  try {
    const newCustomer = await stripe.customers.create({
      name: fullName,
    });

    // Updates the customer stripe id in db.
    const upatedStripeId = await updateCustStripeId(newCustomer.id);
    return newCustomer.id;
  } catch (error) {
    console.error("Error in createNewStripeCustomer:", error);
    throw error;
  }
};

// Updates the customer stripe id in db.
export const updateCustStripeId = async (stripeId) => {
  try {
    const token = await getAccessTokenFromCookies();

    const response = await fetch(`${API_BASE_URL}/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token
      },
      body: JSON.stringify({ stripeId }),
    });

    if (!response.ok) {
      throw new Error("Failed to update stripe customer id.");
    }

    const data = await response.json();
    return data; // Return the data to the caller
  } catch (error) {
    console.error("Error during update of stripe customer id:", error);
    throw error; // Let the caller handle the error
  }
};
