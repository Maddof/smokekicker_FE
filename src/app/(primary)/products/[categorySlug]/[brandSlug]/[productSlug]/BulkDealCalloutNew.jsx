"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/utils/currencyFormatter";
import AtcButtonDefault from "@/components/cart/atcButton";

export default function BulkDealCalloutNew({
  product,
  unitPrice,
  tiers = [],
  className = "",
}) {
  const safeUnitPrice = Math.max(unitPrice ?? 0, 0);

  const sortedTiers = [...tiers].sort(
    (a, b) => a.minQuantity - b.minQuantity,
  );

  const singleCanTier = {
    id: "__single__",
    minQuantity: 1,
    percentage: "0",
  };
  const allTiers = [...sortedTiers];

  const [selectedTierId, setSelectedTierId] = useState(
    allTiers[0]?.id ?? null,
  );

  if (!allTiers.length) return null;

  const selectedTier = allTiers.find(
    (t) => t.id === selectedTierId,
  );
  const selectedQuantity = selectedTier?.minQuantity ?? 1;

  return (
    <div
      className={`rounded-lg border border-slate-200 bg-white/80 shadow-sm ${className}`}
    >
      <div className="mb-2 border-b px-3 py-3 sm:px-4">
        <p className="text-xs font-semibold tracking-wide uppercase">
          Bulk deal — buy more, save more
        </p>
      </div>

      <ul className="flex flex-row justify-between gap-1 p-2 sm:gap-2 sm:p-3">
        {allTiers.map((tier) => {
          const rate = parseFloat(tier.percentage) / 100;
          const discountedUnit = Math.round(
            safeUnitPrice * (1 - rate),
          );
          const packTotal =
            discountedUnit * tier.minQuantity;
          const hasDiscount =
            parseFloat(tier.percentage) > 0;

          const isSelected = tier.id === selectedTierId;

          return (
            <li
              key={tier.id}
              className="flex w-full flex-col items-center gap-2 text-center sm:gap-4"
            >
              <button
                type="button"
                onClick={() => setSelectedTierId(tier.id)}
                className={`flex w-full flex-col flex-wrap items-center justify-center gap-2 border text-left transition-colors sm:gap-3 ${
                  isSelected
                    ? "bg-primary/5 ring-primary ring-1 ring-inset"
                    : "hover:bg-slate-50"
                }`}
              >
                <div className="bg-primary/75 flex w-full items-center justify-center py-1.5">
                  <p
                    className={`text-secondary font-semibold`}
                  >
                    {hasDiscount
                      ? `-${tier.percentage}%`
                      : "—"}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-2 text-center">
                  <span
                    className={`block rounded font-bold uppercase`}
                  >
                    {tier.minQuantity}{" "}
                    {tier.minQuantity > 1 ? "cans" : "can"}
                  </span>
                  {/* <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                      isSelected
                        ? "border-primary bg-primary"
                        : "border-slate-300"
                    }`}
                  >
                    {isSelected && (
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    )}
                  </span> */}
                </div>

                <div className="flex flex-col items-center gap-1 text-center">
                  <p className="text-muted-foreground text-xs">
                    Per unit
                  </p>
                  <p className="font-semibold">
                    {formatCurrency(discountedUnit)}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-1 text-center">
                  <p className="text-muted-foreground text-xs">
                    Total
                  </p>
                  <p className="font-semibold">
                    {formatCurrency(packTotal)}
                  </p>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="border-t p-3 sm:p-4">
        <AtcButtonDefault
          className="w-full"
          product={product}
          quantity={selectedQuantity}
        />
      </div>
    </div>
  );
}
