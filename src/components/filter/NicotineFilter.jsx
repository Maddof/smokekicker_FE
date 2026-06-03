"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/scn/button";

export default function NicotineFilter({
  items,
  value = [],
  onValueChange,
}) {
  const nicotineOptions = useMemo(() => {
    const values = items
      .map((item) => item?.details?.nicotineValue)
      .filter((nicotineValue) =>
        Number.isFinite(nicotineValue),
      );

    return [...new Set(values)].sort((a, b) => a - b);
  }, [items]);

  return (
    <div className="w-full">
      <p className="mb-2 font-medium">Nicotine/pouch</p>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          variant={
            value.length === 0 ? "default" : "outline"
          }
          className="normal-case"
          onClick={() => onValueChange([])}
          aria-pressed={value.length === 0}
        >
          All
        </Button>

        {nicotineOptions.map((nicotineValue) => {
          const isSelected = value.includes(nicotineValue);

          return (
            <Button
              key={nicotineValue}
              type="button"
              size="sm"
              variant={isSelected ? "default" : "outline"}
              className="normal-case"
              onClick={() => {
                if (isSelected) {
                  onValueChange(
                    value.filter(
                      (selected) =>
                        selected !== nicotineValue,
                    ),
                  );
                  return;
                }

                onValueChange(
                  [...value, nicotineValue].sort(
                    (a, b) => a - b,
                  ),
                );
              }}
              aria-pressed={isSelected}
            >
              {nicotineValue} mg
            </Button>
          );
        })}
      </div>
    </div>
  );
}
