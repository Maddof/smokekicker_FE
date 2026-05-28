const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function fetchAllPublishedCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/published`);
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching published categories:", error);
    return null; // Explicitly return `null` on failure
  }
}

async function fetchPublishedCategoryBySlug(slug) {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/slug/${slug}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch category: ${response.status}`);
    }
    const category = await response.json();
    return category;
  } catch (error) {
    console.error("Error fetching category by slug:", error);
    return null; // Explicitly return `null` on failure
  }
}

export {
  fetchAllPublishedCategories,
  fetchPublishedCategoryBySlug,
};
