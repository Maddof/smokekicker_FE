"use client";

import { useState } from "react";
import BrandCard from "@/app/(primary)/varumarken/BrandCard";
// import BrandFilter from "./BrandFilter";
import SearchFilter from "./SearchFilter";

export default function BrandFilterWrapper({ initialBrands }) {
  const [filteredBrands, setFilteredBrands] = useState(initialBrands);

  return (
    <>
      <SearchFilter
        items={initialBrands}
        onFilterChange={setFilteredBrands}
        placeholder="Sök varumärke..."
        searchField="name"
      />

      {filteredBrands.length === 0 ? (
        <div className="border-primary my-12 rounded-lg border border-dashed p-8 text-center">
          <p>Inga varumärken matchar din sökning.</p>
          <p className="text-muted-foreground mt-1 text-sm">
            Försök med ett annat sökord.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
          {filteredBrands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      )}
    </>
  );
}
