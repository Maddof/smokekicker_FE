"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/scn/button";

export default function FlavorProfileFilter({
  items,
  value = [],
  onValueChange,
}) {
  const flavorProfileOptions = useMemo(() => {
    const uniqueFlavorProfiles = new Map();

    items.forEach((item) => {
      item?.flavorProfiles?.forEach((profile) => {
        const slug = profile?.slug;
        const name = profile?.name;

        if (!slug || !name) {
          return;
        }

        if (!uniqueFlavorProfiles.has(slug)) {
          uniqueFlavorProfiles.set(slug, { slug, name });
        }
      });
    });

    return Array.from(uniqueFlavorProfiles.values()).sort((a, b) =>
      a.name.localeCompare(b.name, "sv"),
    );
  }, [items]);

  return (
    <div className="w-full">
      <p className="mb-2 font-medium">Smakprofil</p>
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

        {flavorProfileOptions.map((profile) => {
          const isSelected = value.includes(profile.slug);

          return (
            <Button
              key={profile.slug}
              type="button"
              size="sm"
              variant={isSelected ? "default" : "outline"}
              className="normal-case"
              onClick={() => {
                if (isSelected) {
                  onValueChange(
                    value.filter(
                      (selectedSlug) => selectedSlug !== profile.slug,
                    ),
                  );
                  return;
                }

                onValueChange([...value, profile.slug]);
              }}
              aria-pressed={isSelected}
            >
              {profile.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
