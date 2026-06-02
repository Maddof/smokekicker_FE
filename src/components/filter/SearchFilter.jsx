"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/scn/input";

export default function SearchFilter({
  items,
  onFilterChange,
  placeholder = "Search...",
  searchField = "name",
}) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter items whenever search term changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      // If search is empty, return all items
      onFilterChange(items);
      return;
    }

    const normalizedSearch = searchTerm
      .toLowerCase()
      .trim();
    const filteredResults = items.filter((item) => {
      // Allow searching in nested fields with dot notation (e.g., "category.name")
      if (searchField.includes(".")) {
        const [parent, child] = searchField.split(".");
        return (
          item[parent] &&
          item[parent][child] &&
          item[parent][child]
            .toLowerCase()
            .includes(normalizedSearch)
        );
      }

      // Regular field search
      return (
        item[searchField] &&
        item[searchField]
          .toLowerCase()
          .includes(normalizedSearch)
      );
    });

    onFilterChange(filteredResults);
  }, [searchTerm, items, onFilterChange, searchField]);

  // Clear search field
  const handleClear = () => {
    setSearchTerm("");
  };

  return (
    <div className="w-full">
      <p className="mb-2 font-medium">Search</p>
      <div className="relative">
        <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />

        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="pr-9 pl-9"
          aria-label={`Filter ${placeholder.toLowerCase()}`}
        />

        {searchTerm && (
          <button
            onClick={handleClear}
            className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 transition-colors"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
