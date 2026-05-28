"use client";

import { useCart } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext";
import { Button } from "../ui/scn/button";
import { getDefaultSelectedItems } from "@/lib/utils/subscriptions/formatSelectedItemsArray";

export default function AtcButtonSubscription({
  subscription,
  intervalCount,
  selectedItems,
}) {
  const { addSubscriptionToCart, loadingBoxIds } =
    useCart();
  const { isAuthenticated, user } = useAuth();
  const isLoading = loadingBoxIds.includes(subscription.id); // Check if this product is loading

  // If undefined, it means user used the atc button from the shop page,
  // So we set the box default values since we will receive undefined from
  // intervalCount and selectedItems
  if (intervalCount === undefined) {
    intervalCount = subscription.intervalCount;
  }

  if (selectedItems === undefined) {
    selectedItems = getDefaultSelectedItems(subscription);
  }

  // Filter out any null values from the selectedItems array.
  // Happens if user adds to cart with superflous item count
  // without picking a item/flavor in shop/[slug] page
  const filteredItems = selectedItems.filter(
    (item) => item !== null,
  );

  // Check if any of the filtered items has stock equal to zero.
  const hasOutOfStock = filteredItems.some(
    (item) => item.stock <= 0,
  );

  const tooltipMessage = hasOutOfStock
    ? "En av de valda produkterna är slut i lager."
    : isAuthenticated
      ? `Ändra, pausa, avbryt, hur och när du vill`
      : "Du måste vara inloggad för att handla";

  const buttonLabel = hasOutOfStock
    ? "Slut i lager"
    : !isAuthenticated
      ? "Logga in för att handla (kommer snart)"
      : isLoading
        ? "Lägger till..."
        : "Lägg i varukorg";

  const handleAddToCart = () => {
    // Pass both the box id and the selected interval count.

    if (!isAuthenticated || isLoading || hasOutOfStock) {
      console.warn(
        "Cannot add to cart: some items are out of stock.",
      );
      return;
    }

    addSubscriptionToCart({
      boxId: subscription.id,
      intervalCount,
      selectedItems: filteredItems,
    });
  };

  return (
    <div className="mt-6 flex flex-col items-center gap-6">
      <p className="text-muted-foreground max-w-64 text-center">
        Ändra, pausa, avbryt, hur och när du vill
      </p>
      <Button
        onClick={handleAddToCart}
        disabled={
          !isAuthenticated || isLoading || hasOutOfStock
        }
      >
        {buttonLabel}
      </Button>
    </div>
  );
}
