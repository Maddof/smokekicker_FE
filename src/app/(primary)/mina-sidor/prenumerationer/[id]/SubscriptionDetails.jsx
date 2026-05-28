"use client";

import SubscriptionStatusBadge from "@/components/dashboard/subscriptions/SubStatusBadge";
import { formatDate } from "@/lib/utils/dateFormatter";
import { formatCurrency } from "@/lib/utils/currencyFormatter";
import { AlertCircle, Package, PlusCircle, Receipt } from "lucide-react";
import SubscriptionItemsList from "./SubscriptionItemsList";
import OneTimeItemsList from "./OneTimeItemsList";
import { useEffect, useState } from "react";

export default function SubscriptionDetails({ subscription, onUpdate }) {
  const [localOneTimeItems, setLocalOneTimeItems] = useState(
    subscription.oneTimeItems || [],
  );

  // Add this effect to keep localOneTimeItems in sync with subscription props
  useEffect(() => {
    setLocalOneTimeItems(subscription.oneTimeItems || []);
  }, [subscription]);

  // Calculate one-time items total
  // const pendingOneTimeItems =
  //   localOneTimeItems?.filter((item) => item.status === "PENDING") || [];

  // Filter one-time items for the current cycle
  const pendingOneTimeItems =
    localOneTimeItems?.filter(
      (item) =>
        // Must be pending status
        item.status === "PENDING" &&
        // Must be for the current cycle (matching next billing date)
        (item.targetBillingCycle === subscription.nextBillingDate ||
          new Date(item.targetBillingCycle).toISOString() ===
            new Date(subscription.nextBillingDate).toISOString()),
    ) || [];

  const oneTimeItemsTotal = pendingOneTimeItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // Calculate total for next billing cycle
  const totalNextBox = subscription.price + oneTimeItemsTotal;

  // Calculate total regular items
  const totalRegularItems = subscription.items.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  // Calculate total one-time items
  const totalOneTimeItems = pendingOneTimeItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  // Handle item removal
  const handleItemRemoved = (removedItemId) => {
    // Update local state first for immediate UI feedback
    const updatedItems = localOneTimeItems.filter(
      (item) => item.id !== removedItemId,
    );
    setLocalOneTimeItems(updatedItems);

    // Update parent component state if callback exists
    if (onUpdate) {
      const updatedSubscription = {
        ...subscription,
        oneTimeItems: updatedItems,
      };
      onUpdate(updatedSubscription);
    }
  };

  return (
    <>
      <div className="mb-4 flex items-center gap-2 border-b pb-3">
        <h3 className="font-semibold">{subscription.name}</h3>
        <SubscriptionStatusBadge status={subscription.status} />
      </div>

      {/* PAST_DUE explanation */}
      {subscription.status === "PAST_DUE" && (
        <div className="text-foreground mb-4 flex items-start gap-2 rounded-md bg-yellow-50 p-3">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium">Betalningen misslyckades</p>
            <p className="text-xs">
              Betalningen för din prenumeration har misslyckats och kommer att
              försökas igen. Vänligen kontrollera din betalningsmetod för att
              säkerställa att framtida betalningar går igenom.
            </p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <p>
          <span className="font-semibold">Nästa order datum:</span>{" "}
          {formatDate(subscription.nextBillingDate)}
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Regular subscription items */}
          <div className="flex flex-col">
            <div className="text-muted-foreground mb-2 flex items-center gap-1">
              <Package className="h-4 w-4" /> Prenumerationsartiklar
            </div>
            <SubscriptionItemsList items={subscription.items} />
            <p className="text-muted-foreground mt-auto text-sm">
              <span className="font-medium">Totalt:</span> {totalRegularItems}{" "}
              artiklar
            </p>
          </div>

          {/* One-time items */}
          <div className="flex flex-col">
            <div className="text-muted-foreground mb-2 flex items-center gap-1">
              <PlusCircle className="h-4 w-4" /> Engångsartiklar nästa leverans
            </div>

            <OneTimeItemsList
              pendingOneTimeItems={pendingOneTimeItems}
              subscriptionId={subscription.id}
              onItemRemoved={handleItemRemoved}
            />
            <p className="text-muted-foreground mt-auto text-sm">
              <span className="font-medium">Totalt:</span> {totalOneTimeItems}{" "}
              artiklar
            </p>
          </div>

          {/* Price breakdown */}
          <div className="flex flex-col">
            <div className="text-muted-foreground mb-2 flex items-center gap-1">
              <Receipt className="h-4 w-4" /> Prissammanställning
            </div>

            <div className="bg-primary/5 rounded-md p-3">
              <p className="text-sm">
                <span className="font-medium">Grundpris:</span>{" "}
                {formatCurrency(subscription.price)}
              </p>

              {oneTimeItemsTotal > 0 && (
                <p className="text-sm">
                  <span className="font-medium">Engångsartiklar:</span>{" "}
                  {formatCurrency(oneTimeItemsTotal)}
                </p>
              )}

              <p className="border-primary/20 mt-2 border-t pt-2 text-sm font-medium">
                <span className="font-semibold">Nästa faktura:</span>{" "}
                {formatCurrency(totalNextBox)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
