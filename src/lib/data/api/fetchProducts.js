const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const isDev = process.env.NODE_ENV === "development";

async function fetchAllProducts() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null; // Explicitly return `null` on failure
  }
}

async function fetchAllPublishedProducts() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/published`,
      {
        next: isDev
          ? { revalidate: 0 }
          : { revalidate: 86400 }, // Revalidate every 24 hours (86400 seconds) in production, no caching in development
      },
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch products: ${response.status}`,
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      "Error fetching published products:",
      error,
    );
    return null;
  }
}

async function fetchProductBySlug(slug) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/slug/${slug}`,
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch product: ${response.status}`,
      );
    }
    const product = await response.json();
    return product;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
}

async function fetchProductByid(id) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/id/${id}`,
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch product: ${response.status}`,
      );
    }
    const product = await response.json();
    return product;
  } catch (error) {
    console.error("Error fetching product by id:", error);
    return null;
  }
}

async function fetchProductsByCategorySlugAndBrandSlug(
  categorySlug,
  brandSlug,
) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/category/${categorySlug}/brand/${brandSlug}`,
      {
        next: isDev
          ? { revalidate: 0 }
          : { revalidate: 43200 }, // Revalidate every 12 hours (43200 seconds) for category-brand product lists to keep them fresh but not too volatile
      },
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch products for category and brand: ${response.status}`,
      );
    }
    const products = await response.json();
    return products;
  } catch (error) {
    console.error(
      "Error fetching products by category and brand slug:",
      error,
    );
    return null;
  }
}

async function fetchProductsByBrandIdAndIsForSub(brandId) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/brandId/${brandId}`,
      {
        next: isDev
          ? { revalidate: 0 }
          : { revalidate: 43200 }, // Revalidate every 12 hours (43200 seconds) for brand products to keep them fresh but not too volatile
      },
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch products for brand and isForSub: ${response.status}`,
      );
    }
    const products = await response.json();
    return products;
  } catch (error) {
    console.error(
      "Error fetching products by brand slug and isForSub:",
      error,
    );
    return null;
  }
}

async function fetchEjuicesAndIsForSub() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/ejuices/isForSub`,
      {
        next: isDev
          ? { revalidate: 0 }
          : { revalidate: 43200 }, // Revalidate every 12 hours (43200 seconds) for e-juices to keep them fresh but not too volatile
      },
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch e-juices for isForSub: ${response.status}`,
      );
    }
    const products = await response.json();
    return products;
  } catch (error) {
    console.error(
      "Error fetching e-juices by isForSub:",
      error,
    );
    return null;
  }
}

async function fetchAllFreeStarterKitsByBrandSlug(
  brandSlug,
) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/brand/${brandSlug}/free-starter-kits`,
      {
        next: isDev
          ? { revalidate: 0 }
          : { revalidate: 43200 }, // Revalidate every 12 hours (43200 seconds) for free starter kits to keep them fresh but not too volatile
      },
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch free starter kits for brand: ${response.status}`,
      );
    }
    const products = await response.json();
    return products;
  } catch (error) {
    console.error(
      "Error fetching free starter kits by brand slug:",
      error,
    );
    return null;
  }
}

async function fetchProductsByCategorySlug(categorySlug) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/category/${categorySlug}`,
      {
        next: isDev
          ? { revalidate: 0 }
          : { revalidate: 43200 }, // Revalidate every 12 hours (43200 seconds) for category products to keep them fresh but not too volatile
      },
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch products for category: ${response.status}`,
      );
    }
    const products = await response.json();
    return products;
  } catch (error) {
    console.error(
      "Error fetching products by category slug:",
      error,
    );
    return null;
  }
}

async function fetchProductBySlugAndCategorySlug(
  categorySlug,
  productSlug,
) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/category/${categorySlug}/product/${productSlug}`,
      {
        next: isDev
          ? { revalidate: 0 }
          : { revalidate: 43200 }, // Revalidate every 12 hours (43200 seconds) for individual products to keep them fresh but not too volatile
      },
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch product: ${response.status}`,
      );
    }
    const product = await response.json();
    return product;
  } catch (error) {
    console.error(
      "Error fetching product by slug and category slug:",
      error,
    );
    return null;
  }
}

async function fetchProductBySlugCategoryAndBrand(
  categorySlug,
  brandSlug,
  productSlug,
) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/category/${categorySlug}/brand/${brandSlug}/product/${productSlug}`,
      {
        next: {
          tags: [`product:${productSlug}`],
        },
      },
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch product: ${response.status}`,
      );
    }
    const product = await response.json();
    return product;
  } catch (error) {
    console.error(
      "Error fetching product by slug, category, and brand:",
      error,
    );
    return null;
  }
}

async function fetchRelatedProductsSeeded(
  categorySlug,
  brandSlug,
  productSlug,
  take = 6,
) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/related/category/${categorySlug}/brand/${brandSlug}/product/${productSlug}?take=${take}`,
      {
        next: isDev
          ? {
              tags: [
                `related:${categorySlug}:${brandSlug}:${productSlug}`,
              ],
              revalidate: 0,
            }
          : {
              tags: [
                `related:${categorySlug}:${brandSlug}:${productSlug}`,
              ],
              revalidate: 21600,
            }, // Revalidate every 6 hours (21600 seconds) for related products to keep them fresh but not too volatile
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch related products: ${response.status}`,
      );
    }

    const products = await response.json();
    return products;
  } catch (error) {
    console.error(
      "Error fetching related products:",
      error,
    );
    return []; // Keep array return shape for list endpoints
  }
}

async function fetchProductsByBrandSlug(brandSlug) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/brand/${brandSlug}`,
      {
        next: isDev
          ? { revalidate: 0 }
          : { revalidate: 86400 }, // Revalidate every 24 hours (86400 seconds)
      },
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch products for brand: ${response.status}`,
      );
    }
    const products = await response.json();
    return products;
  } catch (error) {
    console.error(
      "Error fetching products by brand slug:",
      error,
    );
    return null;
  }
}

async function fetchProductsByCategoryId(categoryId) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/categoryId/${categoryId}`,
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch products for category: ${response.status}`,
      );
    }
    const products = await response.json();
    return products;
  } catch (error) {
    console.error(
      "Error fetching products by category ID:",
      error,
    );
    return null;
  }
}

async function searchProducts(query) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/search?query=${encodeURIComponent(query)}`,
    );
    if (!response.ok) {
      throw new Error(
        `Failed to search products: ${response.status}`,
      );
    }
    const products = await response.json();
    return products;
  } catch (error) {
    console.error("Error searching products:", error);
    return []; // Return empty array instead of null for easier handling
  }
}

async function fetchLiveSearchSuggestions() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/suggestions`,
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch search suggestions: ${response.status}`,
      );
    }
    const suggestions = await response.json();
    return suggestions;
  } catch (error) {
    console.error(
      "Error fetching live search suggestions:",
      error,
    );
    return []; // Return empty array on failure
  }
}

export {
  fetchAllProducts,
  fetchAllPublishedProducts,
  fetchProductBySlug,
  fetchProductByid,
  fetchProductsByBrandIdAndIsForSub,
  fetchEjuicesAndIsForSub,
  fetchAllFreeStarterKitsByBrandSlug,
  fetchProductsByCategorySlug,
  fetchProductsByCategorySlugAndBrandSlug,
  fetchProductBySlugAndCategorySlug,
  fetchProductBySlugCategoryAndBrand,
  fetchRelatedProductsSeeded,
  fetchProductsByBrandSlug,
  fetchProductsByCategoryId,
  // fetchSelectedProducts, // LEGACY - Not currently used but may be needed for future features or admin dashboard
  searchProducts,
  fetchLiveSearchSuggestions,
};
