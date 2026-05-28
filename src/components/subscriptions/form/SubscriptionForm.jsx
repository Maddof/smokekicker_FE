"use client";

import { useState, useEffect, useCallback } from "react";
import SubscriptionIntervalSelector from "@/components/subscriptions/IntervalSelector";
import AtcButtonSubscription from "@/components/cart/atcButtonSubs";
import SubscriptionItemQuantitySelector from "@/components/subscriptions/QuantitySelector";
import DynamicList from "@/components/subscriptions/DynamicList";
import SubscriptionSummary from "./SubscriptionSummary";
import { getDefaultSelectedItems } from "@/lib/utils/subscriptions/formatSelectedItemsArray";

function SubscriptionForm({
  subscription,
  availableItems,
  UpdateButton, // A custom component for handling the action (update or add-to-cart)
}) {
  // Initialize with the default interval count from the subscription
  // Shared state from interval selector
  const [intervalCount, setIntervalCount] = useState(
    subscription.intervalCount,
  );

  const defaultSelectedItems = getDefaultSelectedItems(subscription);

  // The number of items is based on the default length,
  // or can be adjusted via the quantity selector.
  const [itemCount, setItemCount] = useState(defaultSelectedItems.length);

  // Initialize with an array of objects that by default is in box;
  // its length managed by the quantity selector.
  const [selectedItems, setSelectedItems] = useState(defaultSelectedItems);

  // State to hold the current total price.
  // Initially, it is the base subscription price.
  const [currentTotal, setCurrentTotal] = useState(subscription.price);

  // When itemCount changes, adjust the selectedItems array accordingly.
  useEffect(() => {
    setSelectedItems((prev) => {
      if (prev.length > itemCount) {
        return prev.slice(0, itemCount);
      } else if (prev.length < itemCount) {
        // Fill new slots with an object having empty productId and price 0.
        return [...prev, ...Array(itemCount - prev.length).fill(null)];
      }
      return prev;
    });
  }, [itemCount]);

  // Recalculate the current total whenever selectedItems change.
  useEffect(() => {
    // Calculate additional cost from selected items.
    const total = selectedItems.reduce(
      (sum, item) => sum + (item?.price || 0) * (item?.quantity || 1),
      0,
    );
    setCurrentTotal(total);
  }, [selectedItems]);

  // A helper to update the selected item at a given index.
  // Memoize the update function so its reference doesn't change when intervalCount changes.
  const updateSelectedItem = useCallback(
    (index, newProductId) => {
      setSelectedItems((prev) => {
        // Find the selected product in availableItems
        const product = availableItems.find((item) => item.id === newProductId);
        const newObj = {
          productId: newProductId,
          price: product ? product.price : 0,
          quantity: prev[index]?.quantity || 1, // retain existing quantity or default to 1
          stock: product.stock,
        };
        const newItems = [...prev];
        newItems[index] = newObj;
        return newItems;
      });
    },
    [availableItems],
  );

  // New function: update the quantity of a selected item.
  const updateSelectedItemQuantity = useCallback((index, newQuantity) => {
    setSelectedItems((prev) => {
      const newItems = [...prev];
      const currentItem = newItems[index] || {};
      newItems[index] = { ...currentItem, quantity: newQuantity };
      return newItems;
    });
  }, []);

  // Function to handle removing an item
  const removeItem = useCallback((indexToRemove) => {
    // Reduce the item count by 1
    setItemCount((prevCount) => prevCount - 1);

    // Remove the item at the specified index
    setSelectedItems((prevItems) => {
      const newItems = [...prevItems];
      newItems.splice(indexToRemove, 1);
      return newItems;
    });
  }, []);

  return (
    <div>
      <SubscriptionItemQuantitySelector
        count={itemCount}
        setCount={setItemCount}
      >
        <DynamicList
          count={itemCount}
          selectedItems={selectedItems}
          availableItems={availableItems}
          updateSelectedItem={updateSelectedItem}
          updateSelectedItemQuantity={updateSelectedItemQuantity}
          removeItem={removeItem}
        />
      </SubscriptionItemQuantitySelector>

      <SubscriptionIntervalSelector
        value={intervalCount}
        onChange={setIntervalCount}
      />

      <SubscriptionSummary
        currentTotal={currentTotal}
        intervalCount={intervalCount}
      />

      {UpdateButton ? (
        <UpdateButton
          subscription={subscription}
          intervalCount={intervalCount}
          selectedItems={selectedItems}
        />
      ) : (
        // Default behavior for shop pages:
        <AtcButtonSubscription
          subscription={subscription}
          intervalCount={intervalCount}
          selectedItems={selectedItems}
        />
      )}
    </div>
  );
}

export default SubscriptionForm;
