const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function fetchAllPredefinedBoxes() {
  try {
    const response = await fetch(`${API_BASE_URL}/subscriptions`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching predefined subscription boxes:", error);
    return null; // Explicitly return `null` on failure
  }
}

async function fetchAllPublishedAndPredefinedBoxes() {
  try {
    const response = await fetch(`${API_BASE_URL}/subscriptions/published`);
    if (!response.ok) {
      throw new Error(`Failed to fetch subscriptions: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching published subscription boxes:", error);
    return null; // Explicitly return `null` on failure
  }
}

async function fetchSubscriptionBoxById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/subscriptions/id/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching subscription by id:", error);
    return null; // Explicitly return `null` on failure
  }
}

// Excludes user-id in its response
async function fetchSubscriptionBoxBySlug(slug) {
  try {
    const response = await fetch(`${API_BASE_URL}/subscriptions/slug/${slug}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching subscription by slug:", error);
    return null; // Explicitly return `null` on failure
  }
}

export {
  fetchAllPredefinedBoxes,
  fetchAllPublishedAndPredefinedBoxes,
  fetchSubscriptionBoxById,
  fetchSubscriptionBoxBySlug,
};
