"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/scn/button";

export default function BrandFilter({ items, value = [], onValueChange }) {
  const brandOptions = useMemo(() => {
    const uniqueBrands = new Map();

    items.forEach((item) => {
      const slug = item?.brand?.slug;
      const name = item?.brand?.name;

      if (!slug || !name) {
        return;
      }

      if (!uniqueBrands.has(slug)) {
        uniqueBrands.set(slug, { slug, name });
      }
    });

    return Array.from(uniqueBrands.values()).sort((a, b) =>
      a.name.localeCompare(b.name, "sv"),
    );
  }, [items]);

  return (
    <div className="w-full">
      <p className="mb-2 font-medium">Varumärke</p>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          variant={value.length === 0 ? "default" : "outline"}
          className="normal-case"
          onClick={() => onValueChange([])}
          aria-pressed={value.length === 0}
        >
          Alla
        </Button>

        {brandOptions.map((brand) => {
          const isSelected = value.includes(brand.slug);

          return (
            <Button
              key={brand.slug}
              type="button"
              size="sm"
              variant={isSelected ? "default" : "outline"}
              className="normal-case"
              onClick={() => {
                if (isSelected) {
                  onValueChange(
                    value.filter((selectedSlug) => selectedSlug !== brand.slug),
                  );
                  return;
                }

                onValueChange([...value, brand.slug]);
              }}
              aria-pressed={isSelected}
            >
              {brand.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
