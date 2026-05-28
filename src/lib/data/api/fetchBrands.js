const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function fetchAllBrands() {
  const isDev = process.env.NODE_ENV === "development";
  try {
    const response = await fetch(
      `${API_BASE_URL}/brands/all`,
      {
        next: isDev
          ? { revalidate: 0 }
          : { revalidate: 86400 }, // Revalidate every 24 hours (86400 seconds) in production, no caching in development
      },
    );
    if (!response.ok) {
      throw new Error("Failed to fetch brands");
    }
    const brands = await response.json();
    return brands;
  } catch (error) {
    console.error("Error fetching brands:", error);
    return null;
  }
}

async function fetchBrandBySlug(brandSlug) {
  const isDev = process.env.NODE_ENV === "development";
  try {
    const response = await fetch(
      `${API_BASE_URL}/brands/slug/${brandSlug}`,
      {
        next: isDev
          ? { revalidate: 0 }
          : { revalidate: 86400 }, // Revalidate every 24 hours (86400 seconds) in production, no caching in development
      },
    );
    if (!response.ok) {
      throw new Error("Failed to fetch brand");
    }
    const brand = await response.json();
    return brand;
  } catch (error) {
    console.error("Error fetching brand:", error);
    return null;
  }
}

export { fetchAllBrands, fetchBrandBySlug };
