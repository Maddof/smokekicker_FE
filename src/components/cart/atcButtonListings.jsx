"use client";

import { useCart } from "@/app/context/CartContext";
import { Button } from "../ui/scn/button";
import { ShoppingCart } from "lucide-react";
import { useState, useMemo } from "react";
import { formatCurrency } from "@/lib/utils/currencyFormatter";

export default function AtcButtonListings({
  product,
  className = "",
}) {
  const { addToCart, loadingProductIds } = useCart();
  const [errorMessage, setErrorMessage] = useState(null);

  const tiers = useMemo(() => {
    const rawTiers =
      product?.category?.bulkDiscountTiers ?? [];
    const sorted = [...rawTiers].sort(
      (a, b) => a.minQuantity - b.minQuantity,
    );
    return [
      { id: "__single__", minQuantity: 1, percentage: "0" },
      ...sorted,
    ];
  }, [product]);

  const hasBulkTiers = tiers.length > 1;

  const [selectedTierId, setSelectedTierId] = useState(
    tiers[0]?.id ?? "__single__",
  );

  const selectedTier =
    tiers.find((t) => t.id === selectedTierId) ?? tiers[0];
  const selectedQuantity = selectedTier?.minQuantity ?? 1;
  const selectedDiscountedUnit = Math.round(
    product.price *
      (1 - parseFloat(selectedTier.percentage) / 100),
  );

  const isLoading = loadingProductIds.includes(product.id);
  const availableStock = Math.max(
    0,
    Number(product?.stock) || 0,
  );
  const isOutOfStock = availableStock < selectedQuantity;
  const isDisabled =
    isLoading || isOutOfStock || !!errorMessage;

  const handleAddToCart = async () => {
    if (isOutOfStock || isLoading) return;

    const result = await addToCart(
      product.id,
      selectedQuantity,
    );
    if (result?.error) {
      setErrorMessage(result.error);
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  const getButtonLabel = () => {
    if (availableStock === 0) return "OUT OF STOCK";
    if (isOutOfStock) return "NOT ENOUGH IN STOCK";
    if (isLoading) return "Adding...";
    return `Add ${selectedQuantity} to cart`;
  };

  return (
    <div className={className}>
      {hasBulkTiers && (
        <div className="mb-2 grid grid-cols-2 gap-1 lg:grid-cols-4">
          {tiers.map((tier) => {
            const rate = parseFloat(tier.percentage) / 100;
            const discountedUnit = Math.round(
              product.price * (1 - rate),
            );
            const hasDiscount =
              parseFloat(tier.percentage) > 0;
            const isSelected = tier.id === selectedTierId;
            const isTierOutOfStock =
              availableStock < tier.minQuantity;

            return (
              <button
                key={tier.id}
                type="button"
                disabled={isTierOutOfStock}
                onClick={() => setSelectedTierId(tier.id)}
                className={`flex flex-col items-center rounded border px-2 py-1 transition-colors disabled:opacity-40 ${
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:bg-primary/15"
                }`}
              >
                <span className="text-[125%] font-bold">
                  {tier.minQuantity}
                </span>
                {/* <span>
                  {formatCurrency(discountedUnit)}
                </span> */}
                {/* <span className="text-muted text-xs">
                  {hasDiscount
                    ? `-${tier.percentage}%`
                    : ""}
                </span> */}
              </button>
            );
          })}
          <div
            id="bulk-prices-summary"
            className="col-span-full mt-2 flex justify-between gap-1 text-sm"
          >
            <div>
              <span className="font-semibold">
                {formatCurrency(
                  selectedDiscountedUnit * selectedQuantity,
                )}
              </span>
            </div>
            <div className="text-muted-foreground text-[85%]">
              <span className="">
                {formatCurrency(selectedDiscountedUnit)}
                <span>/can</span>
              </span>
            </div>
          </div>
        </div>
      )}

      <Button
        onClick={handleAddToCart}
        disabled={isDisabled}
        className="w-full"
      >
        <ShoppingCart size={22} />
        {getButtonLabel()}{" "}
      </Button>

      {errorMessage && (
        <p
          className="text-destructive mt-1 text-sm"
          role="alert"
          aria-live="assertive"
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
}
