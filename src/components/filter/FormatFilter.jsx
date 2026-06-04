"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/scn/button";

export default function FormatFilter({
  items,
  value = [],
  onValueChange,
}) {
  const formatOptions = useMemo(() => {
    const unique = new Set();

    items.forEach((item) => {
      const format = item?.details?.format;
      if (typeof format === "string" && format) {
        unique.add(format);
      }
    });

    return Array.from(unique)
      .sort((a, b) => a.localeCompare(b, "en"))
      .map((format) => ({
        value: format,
        label:
          format.charAt(0).toUpperCase() +
          format.slice(1).toLowerCase(),
      }));
  }, [items]);

  return (
    <div className="w-full">
      <p className="mb-2 font-medium">Format</p>
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

        {formatOptions.map((option) => {
          const isSelected = value.includes(option.value);

          return (
            <Button
              key={option.value}
              type="button"
              size="sm"
              variant={isSelected ? "default" : "outline"}
              className="normal-case"
              onClick={() => {
                if (isSelected) {
                  onValueChange(
                    value.filter((v) => v !== option.value),
                  );
                  return;
                }

                onValueChange([...value, option.value]);
              }}
              aria-pressed={isSelected}
            >
              {option.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
