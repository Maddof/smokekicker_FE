"use client";

import { Minus, Plus } from "lucide-react";

/**
 * A reusable quantity selector component with plus/minus buttons
 *
 * @param {number} quantity - Current quantity value
 * @param {function} setQuantity - Function to update quantity
 * @param {number} maxQuantity - Maximum allowed quantity (defaults to 99)
 * @param {string} className - Additional CSS classes
 */
export default function QuantitySelector({
  quantity,
  setQuantity,
  maxQuantity = 99,
  className = "",
}) {
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const isMinDisabled = quantity <= 1;
  const isMaxDisabled = quantity >= maxQuantity;

  return (
    <div className={`inline-flex items-center ${className}`}>
      <button
        type="button"
        onClick={handleDecrease}
        disabled={isMinDisabled}
        className={`flex h-8 w-8 items-center justify-center rounded-l-md border transition-colors ${
          isMinDisabled
            ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
            : "border-primary/30 text-primary hover:bg-primary/5 hover:text-primary/80 focus:ring-primary/30 bg-white focus:ring-1 focus:outline-none"
        }`}
        aria-label="Minska antal"
      >
        <Minus className="h-3 w-3" />
      </button>

      <div className="border-primary/30 flex h-8 min-w-[2.5rem] items-center justify-center border-y bg-white px-2 text-center font-medium">
        {quantity}
      </div>

      <button
        type="button"
        onClick={handleIncrease}
        disabled={isMaxDisabled}
        className={`flex h-8 w-8 items-center justify-center rounded-r-md border transition-colors ${
          isMaxDisabled
            ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
            : "border-primary/30 text-primary hover:bg-primary/5 hover:text-primary/80 focus:ring-primary/30 bg-white focus:ring-1 focus:outline-none"
        }`}
        aria-label="Öka antal"
      >
        <Plus className="h-3 w-3" />
      </button>
    </div>
  );
}
