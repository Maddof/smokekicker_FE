"use client";

import { Button } from "@/components/ui/scn/button";
import { AlertCircle } from "lucide-react";
import { useMemo, useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function PickNextShippingDate({ subscription, onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Check if subscription is active
  const isSubscriptionActive = subscription.status === "ACTIVE";

  // Convert the incoming date to an ISO date string (YYYY-MM-DD).
  const initialDate =
    typeof subscription.nextBillingDate === "string"
      ? subscription.nextBillingDate.slice(0, 10)
      : new Date(subscription.nextBillingDate).toISOString().slice(0, 10);

  // Calculate minimum date: nextBillingDate + 1 day
  const minDate = useMemo(() => {
    const nextBilling = new Date(subscription.nextBillingDate);
    const minDate = new Date(nextBilling);
    minDate.setDate(minDate.getDate() + 1);
    return minDate.toISOString().slice(0, 10);
  }, [subscription.nextBillingDate]);

  // Calculate tomorrow's date as minimum selectable date
  // const tomorrow = new Date();
  // tomorrow.setDate(tomorrow.getDate() + 1);
  // const minDate = tomorrow.toISOString().slice(0, 10);

  const [selectedDate, setSelectedDate] = useState(initialDate);

  // Disable the Confirm button if the user hasn't changed the date.
  // const isConfirmDisabled = selectedDate === initialDate || selectedDate === "";

  // Disable the Confirm button if the user hasn't changed the date or subscription isn't active
  const isConfirmDisabled =
    !isSubscriptionActive ||
    selectedDate === initialDate ||
    selectedDate === "";

  // Calculate max date as 6 months from initialDate
  const dateObj = new Date(initialDate);
  dateObj.setMonth(dateObj.getMonth() + 6);
  const maxDate = dateObj.toISOString().split("T")[0];

  const handleInputChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
  };

  const handleConfirm = async () => {
    if (!isSubscriptionActive) return;
    setError("");
    setSuccessMessage("");
    setIsLoading(true);
    try {
      const dateTimeString = selectedDate + "T12:00:00.000Z"; // Append fixed time (13.00 Stockholm time).
      const res = await fetch(
        `${API_BASE_URL}/subscriptions/${subscription.id}/update-shipping-date`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            shippingDate: dateTimeString,
          }),
        },
      );
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.error || "Failed to update next shipping date",
        );
      }

      const data = await res.json();

      if (data.internalSubscription) {
        // Create updated subscription object with new billing date
        onSuccess(data.internalSubscription);
        setSuccessMessage(`Nästa order datum ändrad till ${selectedDate}`);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // If subscription is not active, show disabled state with message
  if (!isSubscriptionActive) {
    return (
      <div>
        <div className="flex flex-col items-center gap-2 opacity-60 sm:flex-row">
          <input
            type="date"
            defaultValue={initialDate}
            disabled={true}
            className="dashboard_date-picker border-input w-full cursor-not-allowed rounded-md border px-3 py-2 sm:w-auto"
          />
          <Button disabled={true} className="w-full flex-1 cursor-not-allowed">
            Bekräfta nytt datum
          </Button>
        </div>
        <div className="mt-2 flex items-center gap-2 text-sm text-amber-600">
          <AlertCircle className="h-4 w-4" />
          <p>Du kan endast ändra leveransdatum för aktiva prenumerationer.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center gap-2 sm:flex-row">
        <input
          type="date"
          defaultValue={selectedDate}
          min={minDate}
          max={maxDate}
          onChange={handleInputChange}
          className="dashboard_date-picker border-input w-full rounded-md border px-3 py-2 sm:w-auto"
        />
        <Button
          disabled={isConfirmDisabled || isLoading}
          onClick={handleConfirm}
          className="w-full flex-1"
        >
          {isLoading ? "Ändrar..." : "Bekräfta nytt datum"}
        </Button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
    </div>
  );
}
