"use client";

import { useState, useEffect } from "react";
import { CreditCard, Loader2 } from "lucide-react";
import Spinner from "@/components/ui/custom/spinner";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function PaymentMethodDisplay({ subscriptionId }) {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [loadingPaymentMethod, setLoadingPaymentMethod] = useState(true);

  // Fetch payment method on component mount
  useEffect(() => {
    const fetchPaymentMethod = async () => {
      try {
        setLoadingPaymentMethod(true);
        const response = await fetch(
          `${API_BASE_URL}/subscriptions/${subscriptionId}/retrieve-default-payment-method`,
          {
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch payment method");
        }

        const data = await response.json();
        setPaymentMethod(data.paymentMethod);
      } catch (error) {
        console.error("Error fetching payment method:", error);
      } finally {
        setLoadingPaymentMethod(false);
      }
    };

    if (subscriptionId) {
      fetchPaymentMethod();
    }
  }, [subscriptionId]);

  if (loadingPaymentMethod) {
    return (
      <div className="flex items-center gap-2 py-2">
        <Spinner />
        <span className="text-muted-foreground text-sm">
          Laddar betalningsinfo...
        </span>
      </div>
    );
  }

  if (!paymentMethod) {
    return (
      <p className="my-2 rounded-md text-sm text-amber-700">
        Ingen betalningsmetod hittades
      </p>
    );
  }

  // Handle card payment methods
  if (paymentMethod.type === "card" && paymentMethod.card) {
    const { card } = paymentMethod;
    const brandDisplay = card.display_brand || card.brand || "Card";
    const formattedBrand =
      brandDisplay === "visa"
        ? "Visa"
        : brandDisplay === "mastercard"
          ? "Mastercard"
          : brandDisplay.charAt(0).toUpperCase() + brandDisplay.slice(1);

    return (
      <div className="bg-primary/5 border-primary/10 my-3 flex items-center gap-3 rounded-md border p-3">
        <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
          <CreditCard className="text-primary h-5 w-5" />
        </div>
        <div>
          <p className="font-medium">
            {formattedBrand} •••• {card.last4}
          </p>
          <p className="text-muted-foreground text-xs">
            Går ut {card.exp_month}/{card.exp_year}
          </p>
        </div>
      </div>
    );
  }

  // Generic display for other payment methods
  return (
    <div className="bg-primary/5 border-primary/10 my-3 flex items-center gap-3 rounded-md border p-3">
      <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
        <CreditCard className="text-primary h-5 w-5" />
      </div>
      <div>
        <p className="font-medium">
          {paymentMethod.type.charAt(0).toUpperCase() +
            paymentMethod.type.slice(1)}
          {paymentMethod.card?.last4 ? ` •••• ${paymentMethod.card.last4}` : ""}
        </p>
        <p className="text-muted-foreground text-xs">Betalningsmetod</p>
      </div>
    </div>
  );
}
