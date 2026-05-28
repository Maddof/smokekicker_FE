"use client";

import { Slider } from "@/components/ui/scn/slider";
import { formatCurrency } from "@/lib/utils/currencyFormatter";

export default function PriceFilter({
  minPrice,
  maxPrice,
  value,
  onValueChange,
}) {
  const currentMin = value?.[0] ?? minPrice;
  const currentMax = value?.[1] ?? maxPrice;
  const isDisabled = minPrice >= maxPrice;

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="font-medium">Pris</p>
        <p className="text-muted-foreground text-sm">
          {formatCurrency(currentMin)} – {formatCurrency(currentMax)}
        </p>
      </div>

      <Slider
        value={[currentMin, currentMax]}
        onValueChange={onValueChange}
        min={minPrice}
        max={maxPrice}
        step={100}
        minStepsBetweenThumbs={1}
        disabled={isDisabled}
      />
    </div>
  );
}
