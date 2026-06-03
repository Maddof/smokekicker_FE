"use client";

import { useEffect, useMemo, useState } from "react";
import SearchFilter from "@/components/filter/SearchFilter";
import NicotineFilter from "@/components/filter/NicotineFilter";
import PriceFilter from "@/components/filter/PriceFilter";
import BrandFilter from "@/components/filter/BrandFilter";
import FlavorProfileFilter from "@/components/filter/FlavorProfileFilter";
import ProductCard from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/scn/button";

export default function ProductFilterWrapper({
  products,
  productCount,
  initialDisplayCount = 8,
}) {
  const [
    searchFilteredProducts,
    setSearchFilteredProducts,
  ] = useState(products);
  const [selectedBrandSlugs, setSelectedBrandSlugs] =
    useState([]);
  const [
    selectedFlavorProfileSlugs,
    setSelectedFlavorProfileSlugs,
  ] = useState([]);
  const [
    selectedNicotineValues,
    setSelectedNicotineValues,
  ] = useState([]);

  const [minProductPrice, maxProductPrice] = useMemo(() => {
    const prices = products
      .map((product) => product?.price)
      .filter((price) => Number.isFinite(price));

    if (prices.length === 0) {
      return [0, 0];
    }

    return [Math.min(...prices), Math.max(...prices)];
  }, [products]);

  const [selectedPriceRange, setSelectedPriceRange] =
    useState([minProductPrice, maxProductPrice]);
  const [visibleProductCount, setVisibleProductCount] =
    useState(initialDisplayCount);

  useEffect(() => {
    setSelectedPriceRange([
      minProductPrice,
      maxProductPrice,
    ]);
  }, [minProductPrice, maxProductPrice]);

  useEffect(() => {
    setVisibleProductCount(initialDisplayCount);
  }, [
    initialDisplayCount,
    searchFilteredProducts,
    selectedBrandSlugs,
    selectedFlavorProfileSlugs,
    selectedNicotineValues,
    selectedPriceRange,
  ]);

  const filteredProducts = useMemo(() => {
    let result = searchFilteredProducts;

    if (selectedBrandSlugs.length > 0) {
      result = result.filter(
        (product) =>
          typeof product?.brand?.slug === "string" &&
          selectedBrandSlugs.includes(product.brand.slug),
      );
    }

    if (selectedFlavorProfileSlugs.length > 0) {
      result = result.filter((product) =>
        Array.isArray(product?.flavorProfiles)
          ? product.flavorProfiles.some(
              (profile) =>
                typeof profile?.slug === "string" &&
                selectedFlavorProfileSlugs.includes(
                  profile.slug,
                ),
            )
          : false,
      );
    }

    if (selectedNicotineValues.length > 0) {
      result = result.filter(
        (product) =>
          Number.isFinite(
            product?.details?.nicotineValue,
          ) &&
          selectedNicotineValues.includes(
            product.details.nicotineValue,
          ),
      );
    }

    const [selectedMinPrice, selectedMaxPrice] =
      selectedPriceRange;

    result = result.filter(
      (product) =>
        Number.isFinite(product?.price) &&
        product.price >= selectedMinPrice &&
        product.price <= selectedMaxPrice,
    );

    return result;
  }, [
    searchFilteredProducts,
    selectedBrandSlugs,
    selectedFlavorProfileSlugs,
    selectedNicotineValues,
    selectedPriceRange,
  ]);

  const hasMoreProductsToShow =
    filteredProducts.length > visibleProductCount;
  const remainingProducts = Math.max(
    filteredProducts.length - visibleProductCount,
    0,
  );
  const nextBatchCount = Math.min(8, remainingProducts);

  const showMoreProducts = () => {
    setVisibleProductCount((prev) => prev + 8);
  };

  return (
    <>
      <p className="mb-4 font-medium">
        {productCount} Products
      </p>
      <div className="mb-6 flex w-full flex-col items-start justify-between gap-4 border-t border-b py-4">
        <div className="flex w-full flex-col items-start gap-6 lg:flex-row">
          <SearchFilter
            items={products}
            onFilterChange={setSearchFilteredProducts}
            placeholder="Filter by name..."
            searchField="name"
          />
          <BrandFilter
            items={products}
            value={selectedBrandSlugs}
            onValueChange={setSelectedBrandSlugs}
          />
          <FlavorProfileFilter
            items={products}
            value={selectedFlavorProfileSlugs}
            onValueChange={setSelectedFlavorProfileSlugs}
          />
          <NicotineFilter
            items={products}
            value={selectedNicotineValues}
            onValueChange={setSelectedNicotineValues}
          />
          <PriceFilter
            minPrice={minProductPrice}
            maxPrice={maxProductPrice}
            value={selectedPriceRange}
            onValueChange={setSelectedPriceRange}
          />
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="border-primary my-12 rounded-lg border border-dashed p-8 text-center">
          <p>No products found.</p>
          <p className="text-muted-foreground mt-1 text-sm">
            Try a different keyword.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              className={
                index < visibleProductCount ? "" : "hidden"
              }
            />
          ))}
        </ul>
      )}

      {hasMoreProductsToShow && (
        <div className="mt-8 flex justify-center">
          <Button
            type="button"
            variant="outline"
            onClick={showMoreProducts}
          >
            Show {nextBatchCount} more
          </Button>
        </div>
      )}
    </>
  );
}
