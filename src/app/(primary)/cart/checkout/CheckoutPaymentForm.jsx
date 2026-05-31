"use client";

import React, { useState } from "react";
import { PaymentElement, useCheckout } from "@stripe/react-stripe-js/checkout";
import { Button } from "@/components/ui/scn/button";
import Spinner from "@/components/ui/custom/spinner";
import Link from "next/link";
import { ROUTES } from "@/config/routes";

const StripeForm = ({ shippingDetails }) => {
  const checkoutState = useCheckout();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  if (checkoutState.type === "loading") {
    return <div>Loading...</div>;
  } else if (checkoutState.type === "error") {
    return <div>Error: {checkoutState.error.message}</div>;
  }

  const { checkout } = checkoutState;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    // await checkout.updateEmail(shippingDetails.email);
    await checkout.updatePhoneNumber(shippingDetails.phone);

    await checkout.updateShippingAddress({
      name: `${shippingDetails.givenName} ${shippingDetails.surname}`,
      address: {
        line1: shippingDetails.line1,
        city: shippingDetails.city,
        postal_code: shippingDetails.postalCode,
        country: shippingDetails.country,
      },
    });

    await checkout.updateBillingAddress({
      name: `${shippingDetails.givenName} ${shippingDetails.surname}`,
      address: {
        line1: shippingDetails.line1,
        city: shippingDetails.city,
        postal_code: shippingDetails.postalCode,
        country: shippingDetails.country,
      },
    });

    const confirmResult = await checkout.confirm();

    setMessage(null);

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.

    if (confirmResult.type === "error") {
      setMessage(confirmResult.error.message);
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <h3>Betalningsinformation</h3>
      <p className="text-muted-foreground mb-4">
        Vänligen fyll i dina betalningsuppgifter
      </p>

      <PaymentElement
        id="payment-element"
        className="border-primary/50 my-4 rounded-lg border"
        options={{
          fields: { billingDetails: "never" },
          layout: {
            type: "accordion",
            defaultCollapsed: false,
          },
        }}
      />
      <label className="mt-6 mb-2 flex items-start gap-2 text-sm">
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          className="accent-primary mt-0.5 h-4 w-4 shrink-0 cursor-pointer"
        />
        <span>
          Jag har läst och godkänner{" "}
          <Link href={ROUTES.TERMS} target="_blank">
            köpvillkoren
          </Link>
          .
        </span>
      </label>
      <Button
        disabled={isLoading || !termsAccepted}
        id="submit"
        className="mt-4 w-full"
      >
        {isLoading ? (
          <Spinner color="accent" />
        ) : (
          `Slutför köp (${checkout.total.total.amount}}`
        )}
      </Button>
      <p className="text-muted-foreground mt-2 text-xs">
        Din betalning är säker och krypterad.
      </p>
      {/* Show any error or success messages */}
      {message && (
        <div
          id="payment-message"
          className="mt-4 rounded border border-red-700/50 p-2 text-[#df1b41]"
        >
          {message}
        </div>
      )}
    </form>
  );
};

export default StripeForm;
