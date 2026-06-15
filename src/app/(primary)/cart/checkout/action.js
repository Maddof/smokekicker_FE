"use server";

import { getAccessTokenFromCookies } from "@/lib/utils/cookies/cookies";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const allowedCountries = ["SE", "DK", "FI", "NO", "DE"];

export async function submitCheckoutFormData(
  prevState,
  formData,
) {
  const token = await getAccessTokenFromCookies();
  const formValues = {
    givenName: formData.get("givenName"),
    surname: formData.get("surname"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    country: formData.get("country") || "SE",
    postalCode: formData.get("postalCode"),
    city: formData.get("city"),
    line1: formData.get("line1"),
    line2: formData.get("line2"),
  };

  // Guest checkout: just validate locally/server-side
  if (!token) {
    // Basic validation example (you can expand this as needed)
    const errors = {};

    if (!formValues.givenName)
      errors.givenName = "First name is required";
    if (!formValues.surname)
      errors.surname = "Last name is required";
    if (!formValues.email)
      errors.email = "Email is required";
    if (!formValues.phone)
      errors.phone = "Phone is required";
    if (!formValues.postalCode)
      errors.postalCode = "Postal code is required";
    if (!formValues.city) errors.city = "City is required";
    if (!formValues.line1)
      errors.line1 = "Address is required";
    if (!allowedCountries.includes(formValues.country)) {
      errors.country = "We do not ship to this country yet";
    }

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        data: formValues,
        errors,
      };
    }

    return {
      success: true,
      data: formValues,
    };
  }

  // Logged-in checkout: update profile/address and validate
  try {
    const response = await fetch(
      `${API_BASE_URL}/user/update/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token
        },
        body: JSON.stringify(formValues),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();

      return {
        success: false,
        data: formValues,
        errors: errorData.error,
      };
    }

    // Parse the response JSON
    const data = await response.json();
    const returnData = {
      givenName:
        data?.data.givenName || formValues.givenName,
      surname: data?.data.surname || formValues.surname,
      email: data?.data.email || formValues.email,
      phone: data?.data.phone || formValues.phone,
      city:
        data?.data.addresses?.[0]?.city || formValues.city,
      postalCode:
        data?.data.addresses?.[0]?.postalCode ||
        formValues.postalCode,
      line1:
        data?.data.addresses?.[0]?.line1 ||
        formValues.line1,
      country: formValues.country,
    };
    return {
      success: true,
      data: returnData,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      data: formValues,
      errors: {
        server: "An error occurred. Please try again.",
      },
    };
  }
}
