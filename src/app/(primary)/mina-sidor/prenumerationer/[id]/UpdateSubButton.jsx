"use client";

import { useAuth } from "@/app/context/AuthContext";
import { Button } from "@/components/ui/scn/button";
import { getDefaultSelectedItems } from "@/lib/utils/subscriptions/formatSelectedItemsArray";
import { useEffect, useState } from "react";
import { updateSubscriptionDetails } from "@/lib/utils/subscriptions/subscriptionManagement";
import { AlertCircle } from "lucide-react";

export default function UpdateSubscriptionButton({
  subscription,
  intervalCount,
  selectedItems,
  onUpdateSuccess, // Callback to handle successful update
}) {
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  const isSubscriptionActive = subscription.status === "ACTIVE";

  // Fallback if values are undefined
  if (intervalCount === undefined) {
    intervalCount = subscription.intervalCount;
  }
  if (selectedItems === undefined) {
    selectedItems = getDefaultSelectedItems(subscription);
  }

  // Filter out any null values.
  const filteredItems = selectedItems.filter((item) => item !== null);

  // Check if there are any changes from the original subscription
  useEffect(() => {
    // Check if interval count changed
    const intervalChanged = intervalCount !== subscription.intervalCount;

    // Check if items changed (different items or quantities)
    let itemsChanged = false;

    // Get original items in a simple format for comparison
    const originalItems = getDefaultSelectedItems(subscription);

    // Different number of items is definitely a change
    if (filteredItems.length !== originalItems.length) {
      itemsChanged = true;
    } else {
      // Check each item and quantity
      const itemMap = new Map();

      // Create a map of original items with productId as key
      originalItems.forEach((item) => {
        itemMap.set(item.productId, item.quantity);
      });

      // Check if any new item has different product or quantity
      for (const item of filteredItems) {
        if (
          !itemMap.has(item.productId) ||
          itemMap.get(item.productId) !== item.quantity
        ) {
          itemsChanged = true;
          break;
        }
      }
    }

    setHasChanges(intervalChanged || itemsChanged);
  }, [intervalCount, filteredItems, subscription]);

  // Check for out-of-stock items.
  const hasOutOfStock = filteredItems.some((item) => item.stock <= 0);

  const buttonLabel = hasOutOfStock
    ? "Slut i lager"
    : isLoading
      ? "Uppdaterar..."
      : "Uppdatera prenumeration";

  const handleUpdateSubscription = async () => {
    // Clear previous messages.
    setErrorMessage("");
    setSuccessMessage("");
    // Add check for subscription status
    if (
      !isAuthenticated ||
      isLoading ||
      hasOutOfStock ||
      !isSubscriptionActive
    ) {
      console.warn(
        "Cannot update subscription due to authentication, loading, stock issues, or inactive status.",
      );
      return;
    }

    setIsLoading(true);
    try {
      const data = await updateSubscriptionDetails({
        subscriptionId: subscription.id,
        intervalCount,
        selectedItems: filteredItems,
      });

      setSuccessMessage("Prenumerationen uppdaterad!");
      if (onUpdateSuccess) {
        // onUpdateSuccess(data.subscription);

        // Delay the callback to show the message first
        setTimeout(() => {
          onUpdateSuccess(data.subscription);
        }, 1500);
      }
    } catch (error) {
      console.error("Error updating subscription:", error);
      setErrorMessage(error.message || "Failed to update subscription");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6 flex flex-col items-center gap-6">
      <Button
        onClick={handleUpdateSubscription}
        disabled={
          !isAuthenticated ||
          isLoading ||
          hasOutOfStock ||
          !isSubscriptionActive ||
          !hasChanges
        }
      >
        {buttonLabel}
      </Button>

      {/* Show warning message when subscription is not active */}
      {!isSubscriptionActive && (
        <div className="flex items-center gap-2 text-sm text-amber-600">
          <AlertCircle className="h-4 w-4" />
          <p>Du kan endast uppdatera aktiva prenumerationer.</p>
        </div>
      )}

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
    </div>
  );
}
