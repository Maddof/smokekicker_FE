"use client";

import { useCart } from "@/app/context/CartContext";
import { Button } from "../ui/scn/button";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

export default function AtcButtonDefault({
  product,
  quantity = 1,
  sameBrandProductPickerButton = false,
  className = "",
}) {
  const { addToCart, loadingProductIds } = useCart();
  const [errorMessage, setErrorMessage] = useState(null);

  const isLoading = loadingProductIds.includes(product.id);
  const safeQuantity = Math.max(1, Number(quantity) || 1);
  const availableStock = Math.max(
    0,
    Number(product?.stock) || 0,
  );
  const isOutOfStock = availableStock < safeQuantity;
  const isDisabled =
    isLoading || isOutOfStock || !!errorMessage;

  const handleAddToCart = async () => {
    if (isOutOfStock || isLoading) return;

    const result = await addToCart(
      product.id,
      safeQuantity,
    );
    if (result?.error) {
      setErrorMessage(result.error);
      setTimeout(() => setErrorMessage(null), 3000); // Clear error after 3 seconds
    }
  };

  const getButtonLabel = () => {
    if (availableStock === 0) return "OUT OF STOCK";
    if (isOutOfStock) return "NOT ENOUGH IN STOCK";
    if (isLoading) return "Adding...";
    return sameBrandProductPickerButton
      ? "Buy"
      : `Buy (${safeQuantity})`;
  };

  return (
    <>
      <Button
        onClick={handleAddToCart}
        disabled={isDisabled}
        // disabled
        className={className}
      >
        {sameBrandProductPickerButton ? (
          // If it's the same brand product picker, show only the cart icon
          <>
            {!errorMessage && <ShoppingCart />}
            {errorMessage &&
              sameBrandProductPickerButton && (
                <p
                  className="text-sm text-white"
                  role="alert"
                  aria-live="assertive"
                >
                  {errorMessage}
                </p>
              )}
          </>
        ) : (
          // Otherwise, show the full label with icon
          <>
            <ShoppingCart size={22} />
            {getButtonLabel()}
          </>
        )}
      </Button>
      {errorMessage && !sameBrandProductPickerButton && (
        <p
          className="text-destructive text-sm"
          role="alert"
          aria-live="assertive"
        >
          {errorMessage}
        </p>
      )}
    </>
  );
}
