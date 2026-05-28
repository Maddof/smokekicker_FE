"use client";

import { useState, useEffect } from "react";
import { CreditCard } from "lucide-react";
import Spinner from "@/components/ui/custom/spinner";
import StripePortalSessionButton from "./StripePortalSessionButton";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function CustomerStripePaymentMethodsDisplay() {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loadingPaymentMethods, setLoadingPaymentMethods] = useState(true);

  // Fetch payment method on component mount
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        setLoadingPaymentMethods(true);
        const response = await fetch(`${API_BASE_URL}/user/payment-methods`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch payment methods");
        }

        const data = await response.json();
        setPaymentMethods(data.paymentMethods || []);
      } catch (error) {
        console.error("Error fetching payment method:", error);
      } finally {
        setLoadingPaymentMethods(false);
      }
    };
    fetchPaymentMethods();
  }, []);

  const getBrandDisplayName = (brand) => {
    const brandMap = {
      visa: "Visa",
      mastercard: "Mastercard",
      amex: "American Express",
      discover: "Discover",
      jcb: "JCB",
      diners: "Diners Club",
      unionpay: "UnionPay",
    };
    return brandMap[brand] || brand.charAt(0).toUpperCase() + brand.slice(1);
  };

  if (loadingPaymentMethods) {
    return (
      <div className="flex items-center gap-2 py-2">
        <Spinner />
        <span className="text-muted-foreground text-sm">
          Laddar betalningsinfo...
        </span>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      <div className="mb-2 flex items-center gap-2 text-sm font-medium">
        <CreditCard className="text-primary/70 h-4 w-4" />
        <span>Betalmetoder</span>
      </div>

      {!paymentMethods.length && (
        <p className="my-2 rounded-md text-sm text-amber-700">
          Inga betalningsmetoder hittades
        </p>
      )}

      {paymentMethods.map((method) => (
        <div
          key={method.id}
          className="border-primary/40 rounded-md border p-4"
        >
          <div className="flex items-center gap-3">
            {/* Card payment method */}
            {method.type === "card" && (
              <>
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                  <CreditCard className="text-primary h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">
                    {getBrandDisplayName(method.card.brand)} ••••{" "}
                    {method.card.last4}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Går ut {method.card.exp_month}/{method.card.exp_year}
                  </p>
                </div>
              </>
            )}

            {/* Klarna payment method */}
            {method.type === "klarna" && (
              <>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100">
                  <span className="font-semibold text-pink-600">K</span>
                </div>
                <div>
                  <p className="font-medium">Klarna</p>
                  <p className="text-muted-foreground text-xs">
                    Fakturabetalning
                  </p>
                </div>
              </>
            )}

            {/* Generic fallback for other payment methods */}
            {method.type !== "card" && method.type !== "klarna" && (
              <>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                  <CreditCard className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium">
                    {method.type.charAt(0).toUpperCase() + method.type.slice(1)}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Betalningsmetod
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
      <StripePortalSessionButton disabled={!paymentMethods.length} />
    </div>
  );
}
