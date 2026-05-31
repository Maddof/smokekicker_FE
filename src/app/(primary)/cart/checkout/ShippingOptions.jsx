"use client";
import Spinner from "@/components/ui/custom/spinner";
import { formatCurrency } from "@/lib/utils/currencyFormatter";
import { useCheckout } from "@stripe/react-stripe-js/checkout";
import { useEffect } from "react";

const ShippingOptions = ({ selectedOption, onOptionChange }) => {
  const checkoutState = useCheckout();

  useEffect(() => {
    // When checkout data is ready.
    // Updates the UI with the default shipping option
    if (checkoutState.type !== "success") return;
    const { shipping } = checkoutState.checkout;

    // update the Checkout context and OrderSummary ui
    if (shipping?.shippingOption) {
      onOptionChange(shipping.shippingOption);
    }
    // onOptionChange(shipping.shippingOption);
  }, [checkoutState]);

  if (checkoutState.type === "loading") {
    return (
      <div className="mb-6">
        <h3>Fraktsätt</h3>
        <div className="flex items-center gap-2 py-4">
          <Spinner />
          <p className="text-muted-foreground">Laddar fraktalternativ...</p>
        </div>
      </div>
    );
  } else if (checkoutState.type === "error") {
    return (
      <div className="mb-6">
        <h3>Fraktsätt</h3>
        <p className="text-red-500">Error: {checkoutState.error.message}</p>
      </div>
    );
  }

  // Only proceed if we have checkout data
  const { shipping, shippingOptions, updateShippingOption } =
    checkoutState.checkout;

  const handleChange = (shippingOption) => () => {
    updateShippingOption(shippingOption.id);
    onOptionChange(shippingOption);
  };

  if (!shippingOptions || shippingOptions.length === 0) {
    return (
      <div className="mb-6">
        <h3>Fraktsätt</h3>
        {/* <p className="text-muted-foreground">
          ✓ Leverans ingår för prenumerationsprodukter.
        </p> */}
        <p className="mt-1">Fri leverans ingår</p>
        <p className="text-muted-foreground mt-1">
          ✓ För prenumerationsvaror ingår alltid leverans utan extra kostnad.
          Leveransinställningar kan justeras från din kontosida efter
          beställning.
        </p>
      </div>
    );
  }

  return (
    <form>
      <h3>Fraktsätt</h3>
      <p className="text-muted-foreground mb-4">
        Välj ett fraktsätt för din beställning. Fri frakt över 199 kr.
      </p>
      <ul>
        {shippingOptions.map((option) => {
          const isSelected = shipping?.shippingOption?.id === option.id;
          return (
            <li
              key={option.id}
              className={`relative mb-4 flex cursor-pointer gap-2 rounded-lg border p-4 ${
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 hover:border-gray-300"
              } transition-colors`}
              onClick={handleChange(option)} // Klickbar hela raden
            >
              <input
                id={option.id}
                type="radio"
                name="shippingOption"
                value={option.id}
                checked={isSelected}
                onChange={() => {}}
                // onChange={handleChange(option)}
              />
              <label htmlFor={option.id} className="cursor-pointer">
                <span
                  className={`font-medium ${isSelected ? "text-primary" : ""}`}
                >
                  {option.displayName}
                </span>
              </label>
              <span
                className={`ml-auto font-medium ${isSelected ? "text-primary" : ""}`}
              >
                {formatCurrency(option.minorUnitsAmount || 0)}
              </span>
            </li>
          );
        })}
      </ul>
    </form>
  );
};

export default ShippingOptions;
