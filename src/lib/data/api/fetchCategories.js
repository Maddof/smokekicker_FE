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

// New function to fetch published categories excluding subscription category
// Reason: We build the page for the subscription category separately and don't want it to appear in the general category list
async function fetchAllPublishedCategoriesExcludeSubscription() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/categories/published?excludeSubscription=true`,
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      "Error fetching published categories excluding subscription:",
      error,
    );
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
  fetchAllPublishedCategoriesExcludeSubscription,
  fetchPublishedCategoryBySlug,
};
