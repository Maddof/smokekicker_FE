"use server";

import { getAccessTokenFromCookies } from "@/lib/utils/cookies/cookies";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function submitFormTest(prevState, formData) {
  const token = await getAccessTokenFromCookies();
  // No need to include givenName and surname explicitly
  // as we are not using them in the formValues object.
  // Can uncomment if needed for future use.
  // We do this to prevent tampering with the form on front-end
  // const givenName = prevState.data?.givenName || formData.get("givenName");
  // const surname = prevState.data?.surname || formData.get("surname");

  const formValues = {
    // givenName, // Include the name explicitly
    // surname,
    email: formData.get("email"),
    phone: formData.get("phone"),
    postalCode: formData.get("postalCode"),
    city: formData.get("city"),
    line1: formData.get("line1"),
  };

  try {
    const response = await fetch(`${API_BASE_URL}/user/update/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token
      },
      body: JSON.stringify(formValues),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        data: errorData.data,
        errors: errorData.error, // Field-specific errors
      };
    }

    // Parse the response JSON
    const data = await response.json();
    const returnData = {
      givenName: data?.data.givenName || "",
      surname: data?.data.surname || "",
      email: data?.data.email || "",
      phone: data?.data.phone || "",
      city: data?.data.addresses?.[0]?.city || "",
      postalCode: data?.data.addresses?.[0]?.postalCode || "",
      line1: data?.data.addresses?.[0]?.line1 || "",
    };
    return {
      success: true,
      data: returnData,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      errors: { server: "An error occurred. Please try again." },
    };
  }
}
