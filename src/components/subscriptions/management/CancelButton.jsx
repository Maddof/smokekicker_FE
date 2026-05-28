"use client";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

import { useState } from "react";
import { Button } from "@/components/ui/scn/button";
import { AlertCircle } from "lucide-react";
import { translateSubscriptionStatus } from "@/lib/utils/translations";

export default function CancelSubscriptionButton({ subscription, onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Check if subscription can be cancelled (ACTIVE or PAST_DUE)
  const canCancel =
    subscription.status === "ACTIVE" || subscription.status === "PAST_DUE";

  const handleCancel = async () => {
    // Show a confirmation popup with a brief description.
    const confirmed = window.confirm(
      "Är du säker på att du vill avbryta prenumerationen? Detta kommer att stänga ner din prenumeration och du kommer inte att bli debiterad för framtida beställningar.",
    );
    if (!confirmed) return;

    setIsLoading(true);
    setError(null);
    setSuccessMessage("");
    try {
      const res = await fetch(
        `${API_BASE_URL}/subscriptions/${subscription.id}/cancel`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to cancel subscription");
      }

      const data = await res.json();

      if (data.subscription) {
        // Create an updated subscription object with the new status
        const updatedSubscription = {
          ...subscription,
          status: data.subscription.status,
        };

        // Call onSuccess with the updated subscription
        if (onSuccess) {
          onSuccess(updatedSubscription);
        }

        setSuccessMessage("Prenumerationen har avslutats");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // If subscription can't be cancelled, explain why
  // if (!canCancel) {
  //   return (
  //     <div>
  //       <Button
  //         disabled={true}
  //         variant="destructive"
  //         className="w-full opacity-60"
  //       >
  //         Avbryt prenumeration
  //       </Button>
  //       <div className="mt-2 flex items-center gap-2 text-sm text-amber-600">
  //         <AlertCircle className="h-4 w-4" />
  //         <p>
  //           Denna prenumeration är redan{" "}
  //           {translateSubscriptionStatus(subscription.status)}.
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <Button
        onClick={handleCancel}
        disabled={isLoading || !canCancel}
        variant="destructive"
        className="w-full"
      >
        {isLoading ? "Avbryter..." : "Avbryt prenumeration"}
      </Button>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      {successMessage && (
        <p className="mt-2 text-sm text-green-500">{successMessage}</p>
      )}
    </div>
  );
}
