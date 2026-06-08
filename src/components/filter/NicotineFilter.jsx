"use client";

import { Slider } from "@/components/ui/scn/slider";

export default function NicotineFilter({
  minNicotine,
  maxNicotine,
  value,
  onValueChange,
}) {
  const currentMin = value?.[0] ?? minNicotine;
  const currentMax = value?.[1] ?? maxNicotine;
  const isDisabled = minNicotine >= maxNicotine;

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="font-medium">Nicotine/pouch</p>
        <p className="text-muted-foreground text-sm">
          {currentMin} – {currentMax} mg
        </p>
      </div>

      <Slider
        value={[currentMin, currentMax]}
        onValueChange={onValueChange}
        min={minNicotine}
        max={maxNicotine}
        step={1}
        minStepsBetweenThumbs={1}
        disabled={isDisabled}
      />
    </div>
  );
}
