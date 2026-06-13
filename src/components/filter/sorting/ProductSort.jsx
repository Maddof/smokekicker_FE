"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/scn/select";

export const SORT_OPTIONS = [
  { value: "name-asc", label: "Name (A to Z)" },
  { value: "name-desc", label: "Name (Z to A)" },
  { value: "price-asc", label: "Price (Low to High)" },
  { value: "price-desc", label: "Price (High to Low)" },
  {
    value: "nicotine-asc",
    label: "Strength (Low to High)",
  },
  {
    value: "nicotine-desc",
    label: "Strength (High to Low)",
  },
];

export function sortProducts(products, sortValue) {
  if (!Array.isArray(products)) {
    return [];
  }

  const sorted = [...products];

  switch (sortValue) {
    case "name-asc":
      sorted.sort((a, b) =>
        (a?.slug ?? "").localeCompare(b?.slug ?? "", "en", {
          sensitivity: "base",
        }),
      );
      break;
    case "name-desc":
      sorted.sort((a, b) =>
        (b?.slug ?? "").localeCompare(a?.slug ?? "", "en", {
          sensitivity: "base",
        }),
      );
      break;
    case "price-asc":
      sorted.sort(
        (a, b) =>
          (Number.isFinite(a?.price) ? a.price : Infinity) -
          (Number.isFinite(b?.price) ? b.price : Infinity),
      );
      break;
    case "price-desc":
      sorted.sort(
        (a, b) =>
          (Number.isFinite(b?.price)
            ? b.price
            : -Infinity) -
          (Number.isFinite(a?.price) ? a.price : -Infinity),
      );
      break;
    case "nicotine-asc":
      sorted.sort(
        (a, b) =>
          (Number.isFinite(a?.details?.nicotineValue)
            ? a.details.nicotineValue
            : Infinity) -
          (Number.isFinite(b?.details?.nicotineValue)
            ? b.details.nicotineValue
            : Infinity),
      );
      break;
    case "nicotine-desc":
      sorted.sort(
        (a, b) =>
          (Number.isFinite(b?.details?.nicotineValue)
            ? b.details.nicotineValue
            : -Infinity) -
          (Number.isFinite(a?.details?.nicotineValue)
            ? a.details.nicotineValue
            : -Infinity),
      );
      break;
    default:
      break;
  }

  return sorted;
}

export default function ProductSort({
  value = "",
  onValueChange,
}) {
  return (
    <div className="w-full sm:w-56">
      {/* <p className="mb-2 font-medium">Sort by</p> */}
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger
          aria-label="Sort products"
          className="min-w-60"
        >
          <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
