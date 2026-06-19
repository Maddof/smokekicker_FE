"use client";

import { useEffect } from "react";

const STORAGE_KEY = "product-views";
const ONE_DAY = 24 * 60 * 60 * 1000;
const THIRTY_DAYS = 30 * ONE_DAY;

export default function ProductViewTracker({
  productSlug,
}) {
  useEffect(() => {
    if (!productSlug) return;

    const now = Date.now();

    let views = {};

    try {
      views = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "{}",
      );
    } catch {
      views = {};
    }

    // Clean up old entries
    for (const slug in views) {
      if (now - views[slug] > THIRTY_DAYS) {
        delete views[slug];
      }
    }

    const viewedAt = views[productSlug];

    // Avoid counting again within 24h
    if (viewedAt && now - viewedAt < ONE_DAY) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(views),
      );
      return;
    }

    const trackView = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${encodeURIComponent(
            productSlug,
          )}/view`,
          {
            method: "POST",
            credentials: "include", // keep if your API uses cookies
          },
        );

        if (!res.ok) return;

        views[productSlug] = now;
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(views),
        );
      } catch {
        // Ignore tracking failures
      }
    };

    trackView();
  }, [productSlug]);

  return null;
}
