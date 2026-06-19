"use client";

import { useEffect } from "react";

export default function ProductViewTracker({
  productSlug,
}) {
  useEffect(() => {
    const now = Date.now();
    const STORAGE_KEY = "product-views";

    const views = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "{}",
    );

    // Cleanup old entries
    const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

    for (const slug in views) {
      if (now - views[slug] > THIRTY_DAYS) {
        delete views[slug];
      }
    }

    const viewedAt = views[productSlug];

    // Don't count another view if viewed within last 24h
    const ONE_DAY = 24 * 60 * 60 * 1000;

    if (viewedAt && now - viewedAt < ONE_DAY) {
      return;
    }

    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${productSlug}/view`,
      {
        method: "POST",
      },
    ).catch(() => {});

    views[productSlug] = now;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(views),
    );
  }, [productSlug]);

  return null;
}
