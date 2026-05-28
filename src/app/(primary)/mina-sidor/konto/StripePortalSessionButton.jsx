"use client";

import { Button } from "@/components/ui/scn/button";
import { useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function StripePortalSessionButton({ disabled = false }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRedirectToPortal = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${API_BASE_URL}/user/create-portal-session`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to create portal session");
      }

      const data = await response.json();
      if (data.sessionUrl) {
        window.location.href = data.sessionUrl; // Redirect to the Stripe Customer Portal
      } else {
        throw new Error("No URL returned from server");
      }
    } catch (err) {
      console.error("Error redirecting to portal:", err);
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={handleRedirectToPortal}
        disabled={loading || disabled}
        className={"w-full"}
      >
        {loading ? "Laddar..." : "Hantera betalningsmetoder"}
      </Button>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </>
  );
}
