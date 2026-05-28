"use client";

import { useState } from "react";
import SubscriptionDetails from "./SubscriptionDetails";
import ShipNowButton from "./ShipNowButton";
import CancelSubscriptionButton from "@/components/subscriptions/management/CancelButton";
import PickNextShippingDate from "./DatePicker";
import {
  CalendarDays,
  PackageCheck,
  AlertCircle,
  Pause,
  ArrowBigDownDash,
  Calendar,
  Wrench,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/scn/button";
import UpdateSubscriptionButton from "./UpdateSubButton";
import SubscriptionForm from "@/components/subscriptions/form/SubscriptionForm";
import StepHeading from "@/components/subscriptions/StepHeading";
import PaymentMethodDisplay from "./PaymentMethodDisplay";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function ManageSubscription({
  initialSubscription,
  availableItems,
}) {
  // Manage subscription state in this component
  const [subscription, setSubscription] = useState(initialSubscription);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Handler for subscription updates
  const handleSubscriptionUpdate = (updatedSubscription) => {
    setSubscription(updatedSubscription);
  };

  // Custom UpdateButton that passes the update handler
  const CustomUpdateButton = (props) => (
    <UpdateSubscriptionButton
      {...props}
      onUpdateSuccess={handleSubscriptionUpdate}
    />
  );

  // Handler for updating payment method
  const handleUpdatePaymentMethod = async () => {
    try {
      setIsRedirecting(true);

      const response = await fetch(
        `${API_BASE_URL}/subscriptions/${subscription.id}/create-portal-session-flow-update-payment-method`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to create customer portal session");
      }

      const { url } = await response.json();

      if (url) {
        // Redirect to Stripe Customer Portal
        window.location.href = url;
      } else {
        throw new Error("No portal URL returned");
      }
    } catch (error) {
      console.error("Error creating portal session:", error);
      // toast.error(
      //   "Det gick inte att öppna betalningssidan. Försök igen senare.",
      // );
      setIsRedirecting(false);
    }
  };

  return (
    <div className="mb-8 space-y-8">
      {/* Primary Information - Always at top */}
      <div className="border-primary/50 rounded-lg border p-6">
        <SubscriptionDetails
          subscription={subscription}
          onUpdate={handleSubscriptionUpdate}
        />
      </div>

      {/* Management Options - Clear sections with icons, stack on mobile */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Shipping Management Section */}
        <div className="border-primary/50 rounded-lg border p-6">
          <h3 className="mb-4 flex items-center gap-2 font-medium">
            <PackageCheck className="text-primary h-5 w-5" />
            <span>Hantera leverans</span>
          </h3>

          <div className="flex flex-col gap-4">
            <div className="pb-4">
              <h4 className="mb-2 flex items-center gap-1 text-sm font-medium">
                <ArrowBigDownDash className="h-4 w-4 text-blue-500" />
                Skicka nu
              </h4>
              <p className="text-muted-foreground mb-4">
                Detta kommer att skapa en ny beställning från innehållet i din
                nästa leverans och vi kommer att processa den omedelbart.
              </p>
              <ShipNowButton
                subscription={subscription}
                onSuccess={handleSubscriptionUpdate}
              />
            </div>

            <div className="border-primary/25 border-t pt-4">
              <h4 className="mb-2 flex items-center gap-1 text-sm font-medium">
                <Calendar className="h-4 w-4 text-blue-500" />
                Ändra leveransdag
              </h4>
              <p className="text-muted-foreground mb-4">
                Välj ett nytt datum för nästa leverans.
              </p>
              <PickNextShippingDate
                subscription={subscription}
                onSuccess={handleSubscriptionUpdate}
              />
            </div>
          </div>
        </div>

        {/* Subscription Management Section */}
        <div className="border-primary/50 rounded-lg border p-6">
          <h3 className="mb-4 flex items-center gap-2 font-medium">
            <CalendarDays className="text-primary h-5 w-5" />
            <span>Hantera prenumeration</span>
          </h3>

          {/* Payment Method Update Section */}
          <div className="border-primary/25 mb-6 border-t pt-4">
            <h4 className="mb-2 flex items-center gap-1 text-sm font-medium">
              <CreditCard className="h-4 w-4 text-green-500" />
              <span>Betalningsmetod</span>
            </h4>

            {/* Use the extracted PaymentMethodDisplay component */}
            <PaymentMethodDisplay subscriptionId={subscription.id} />

            <p className="text-muted-foreground mb-4">
              Ändra betalningsmetod för din prenumeration.
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleUpdatePaymentMethod}
              disabled={isRedirecting}
            >
              {isRedirecting ? "Omdirigerar..." : "Hantera betalningsmetod"}
            </Button>
          </div>

          <div className="border-primary/25 border-t pt-4">
            <h4 className="mb-2 flex items-center gap-1 text-sm font-medium">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <span>Avsluta prenumeration</span>
            </h4>
            <p className="text-muted-foreground mb-4">
              Stänger av prenumerationen och du kommer inte att bli debiterad
              för framtida beställningar.
            </p>
            <CancelSubscriptionButton
              subscription={subscription}
              onSuccess={handleSubscriptionUpdate}
            />
          </div>
        </div>

        {/* Subscription Form */}
        <div className="border-primary/50 flex flex-col items-center rounded-lg border p-4 md:col-span-2">
          <h3 className="mb-2 flex items-center gap-2 text-center font-medium">
            <Wrench className="text-primary h-5 w-5" />
            Uppdatera prenumeration
          </h3>
          <p className="text-muted-foreground mb-16 max-w-96 text-center">
            Hantera din prenumeration genom att uppdatera dina valda produkter
            och leveransintervall.
          </p>

          <StepHeading
            title="Välj antal och smaker i varje låda"
            description="Välj hur många smaker du vill ha i din låda. Du kan välja mellan 1-8 smaker per låda."
          />

          <SubscriptionForm
            subscription={subscription}
            availableItems={availableItems}
            UpdateButton={CustomUpdateButton}
          />
        </div>
      </div>
    </div>
  );
}
