"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/scn/button";

export default function ProductGridLoadMore({
  products,
  initialDisplayCount = 8,
  incrementCount = 8,
}) {
  const [visibleProductCount, setVisibleProductCount] =
    useState(initialDisplayCount);

  const hasMoreProductsToShow =
    products.length > visibleProductCount;

  const nextBatchCount = useMemo(() => {
    if (!hasMoreProductsToShow) {
      return 0;
    }

    return Math.min(
      incrementCount,
      products.length - visibleProductCount,
    );
  }, [
    hasMoreProductsToShow,
    incrementCount,
    products.length,
    visibleProductCount,
  ]);

  const showMoreProducts = () => {
    setVisibleProductCount((prev) => prev + incrementCount);
  };

  return (
    <>
      <ul className="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            className={
              index < visibleProductCount ? "" : "hidden"
            }
          />
        ))}
      </ul>

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
