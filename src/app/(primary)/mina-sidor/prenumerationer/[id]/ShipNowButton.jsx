"use client";

import { useState } from "react";
import { Button } from "@/components/ui/scn/button";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function ShipNowButton({ subscription, onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleShipNow = async () => {
    // Show a confirmation popup with a brief description.
    const confirmed = window.confirm(
      "Är du säker på att du vill ha din beställning skickad nu? Ditt kontokort kommer att debiteras och vi kommer att påbörja processen av din beställning.",
    );
    if (!confirmed) return;
    setError("");
    setSuccessMessage("");
    setIsLoading(true);
    try {
      const res = await fetch(
        `${API_BASE_URL}/subscriptions/${subscription.id}/ship-now`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      const data = await res.json();

      if (!res.ok) {
        // If there's an error but we received subscription data, use it
        if (data.internalSubscription) {
          // Update the subscription state in the parent component
          if (onSuccess) onSuccess(data.internalSubscription);

          // Show payment-specific error if subscription is now PAST_DUE
          if (data.internalSubscription.status === "PAST_DUE") {
            throw new Error(
              "Betalningen misslyckades. Vänligen uppdatera din betalningsmetod för att fortsätta.",
            );
          } else {
            throw new Error(data.error || "Failed to update subscription");
          }
        } else {
          // No subscription data in the error response
          throw new Error(data.error || "Failed to update subscription");
        }
      }

      setSuccessMessage("En ny beställning har skapats!");
      if (onSuccess && data.internalSubscription) {
        onSuccess(data.internalSubscription);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button
        onClick={handleShipNow}
        disabled={isLoading || subscription.status !== "ACTIVE"}
        className="w-full"
      >
        {isLoading ? "Skickar..." : "Skicka nu"}
      </Button>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      {successMessage && (
        <p className="mt-2 text-sm text-green-500">{successMessage}</p>
      )}
    </div>
  );
}
