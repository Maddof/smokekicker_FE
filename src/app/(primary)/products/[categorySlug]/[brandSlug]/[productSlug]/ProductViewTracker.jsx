"use client";

import { useEffect } from "react";

export default function ProductViewTracker({
  productSlug,
}) {
  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${productSlug}/view`,
      {
        method: "POST",
        credentials: "include",
        keepalive: true,
      },
    ).catch(() => {});
  }, [productSlug]);

  return null;
}
