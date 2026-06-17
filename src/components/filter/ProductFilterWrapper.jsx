"use client";

import { useEffect, useMemo, useState } from "react";
import SearchFilter from "@/components/filter/SearchFilter";
import NicotineFilter from "@/components/filter/NicotineFilter";
import PriceFilter from "@/components/filter/PriceFilter";
import BrandFilter from "@/components/filter/BrandFilter";
import FlavorProfileFilter from "@/components/filter/FlavorProfileFilter";
import FormatFilter from "@/components/filter/FormatFilter";
import ProductSort, {
  sortProducts,
} from "@/components/filter/sorting/ProductSort";
import ProductCard from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/scn/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/custom/CustomAccordion";
import { ListFilter } from "lucide-react";

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
  const [minNicotineValue, maxNicotineValue] =
    useMemo(() => {
      const values = products
        .map((product) => product?.details?.nicotineValue)
        .filter((v) => Number.isFinite(v));

      if (values.length === 0) {
        return [0, 0];
      }

      return [Math.min(...values), Math.max(...values)];
    }, [products]);

  const [minProductPrice, maxProductPrice] = useMemo(() => {
    const prices = products
      .map((product) => product?.price)
      .filter((price) => Number.isFinite(price));

    if (prices.length === 0) {
      return [0, 0];
    }

    return [Math.min(...prices), Math.max(...prices)];
  }, [products]);

  const [selectedNicotineRange, setSelectedNicotineRange] =
    useState([minNicotineValue, maxNicotineValue]);
  const [selectedFormatValues, setSelectedFormatValues] =
    useState([]);
  const [selectedPriceRange, setSelectedPriceRange] =
    useState([minProductPrice, maxProductPrice]);
  const [selectedSortValue, setSelectedSortValue] =
    useState("default");
  const [visibleProductCount, setVisibleProductCount] =
    useState(initialDisplayCount);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
  }, []);

  useEffect(() => {
    setSelectedNicotineRange([
      minNicotineValue,
      maxNicotineValue,
    ]);
  }, [minNicotineValue, maxNicotineValue]);

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
    selectedNicotineRange,
    selectedFormatValues,
    selectedPriceRange,
    selectedSortValue,
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

    const [selectedMinNicotine, selectedMaxNicotine] =
      selectedNicotineRange;

    result = result.filter(
      (product) =>
        Number.isFinite(product?.details?.nicotineValue) &&
        product.details.nicotineValue >=
          selectedMinNicotine &&
        product.details.nicotineValue <=
          selectedMaxNicotine,
    );

    if (selectedFormatValues.length > 0) {
      result = result.filter(
        (product) =>
          typeof product?.details?.format === "string" &&
          selectedFormatValues.includes(
            product.details.format,
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

    return sortProducts(result, selectedSortValue);
  }, [
    searchFilteredProducts,
    selectedBrandSlugs,
    selectedFlavorProfileSlugs,
    selectedNicotineRange,
    selectedFormatValues,
    selectedPriceRange,
    selectedSortValue,
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
        {productCount} Products ({filteredProducts.length}{" "}
        shown)
      </p>
      <Accordion className="mb-2 w-full">
        <AccordionItem defaultOpen={isDesktop}>
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <ListFilter size={18} />
              <span className="group-open:hidden">
                Show Filters
              </span>
              <span className="hidden group-open:inline">
                Hide Filters
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex w-full flex-col items-start justify-between gap-4 border-t border-b py-4">
              <div className="grid w-full grid-cols-1 items-start gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3">
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
                  onValueChange={
                    setSelectedFlavorProfileSlugs
                  }
                />
                <FormatFilter
                  items={products}
                  value={selectedFormatValues}
                  onValueChange={setSelectedFormatValues}
                />
                <NicotineFilter
                  minNicotine={minNicotineValue}
                  maxNicotine={maxNicotineValue}
                  value={selectedNicotineRange}
                  onValueChange={setSelectedNicotineRange}
                />
                <PriceFilter
                  minPrice={minProductPrice}
                  maxPrice={maxProductPrice}
                  value={selectedPriceRange}
                  onValueChange={setSelectedPriceRange}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mb-4 flex">
        <ProductSort
          value={selectedSortValue}
          onValueChange={setSelectedSortValue}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <div className="border-primary my-12 rounded-lg border border-dashed p-8 text-center">
          <p>No products found.</p>
          <p className="text-muted-foreground mt-1 text-sm">
            Try a different keyword.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
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
