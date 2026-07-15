"use server";

import { getAccessTokenFromCookies } from "@/lib/utils/cookies/cookies";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const allowedCountries = ["SE", "DK", "FI", "NO", "DE"];

// Merge the API response over the submitted form values.
function buildReturnData(data, formValues) {
  const address = data?.data?.addresses?.[0];
  return {
    givenName: data?.data.givenName || formValues.givenName,
    surname: data?.data.surname || formValues.surname,
    email: data?.data.email || formValues.email,
    phone: data?.data.phone || formValues.phone,
    city: address?.city || formValues.city,
    postalCode:
      address?.postalCode || formValues.postalCode,
    line1: address?.line1 || formValues.line1,
    line2: address?.line2 || formValues.line2,
    country: formValues.country,
    region: address?.region || formValues.region,
  };
}

export async function submitCheckoutFormAddressData(
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
    region: formData.get("region"),
    postalCode: formData.get("postalCode"),
    city: formData.get("city"),
    line1: formData.get("line1"),
    line2: formData.get("line2"),
  };

  // Guest checkout validates the profile; logged-in checkout updates it.
  const endpoint = token
    ? `${API_BASE_URL}/user/update/`
    : `${API_BASE_URL}/orders/validate-user-profile/`;
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(formValues),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        data: formValues,
        errors: errorData.error,
      };
    }

    const data = await response.json();
    return {
      success: true,
      data: buildReturnData(data, formValues),
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
