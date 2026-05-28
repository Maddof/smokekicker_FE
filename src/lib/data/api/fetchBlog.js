const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function fetchPublishedBlogPosts({
  page = 1,
  limit = 12,
} = {}) {
  const isDev = process.env.NODE_ENV === "development";

  try {
    const params = new URLSearchParams({ page, limit });
    const response = await fetch(
      `${API_BASE_URL}/blog/posts?${params}`,
      {
        next: isDev
          ? { revalidate: 0 }
          : { revalidate: 43200 },
      },
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch blog posts: ${response.status}`,
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      "Error fetching published blog posts:",
      error,
    );
    return null;
  }
}

// Fetches the latest published blog posts for the homepage
async function fetchLatestPublishedBlogPosts({
  limit,
} = {}) {
  try {
    const params = new URLSearchParams();
    const isDev = process.env.NODE_ENV === "development";

    if (limit) {
      params.set("limit", limit);
    }

    const queryString = params.toString();
    const url = queryString
      ? `${API_BASE_URL}/blog/posts/latest?${queryString}`
      : `${API_BASE_URL}/blog/posts/latest`;

    const response = await fetch(
      url,
      isDev
        ? { next: { revalidate: 0 } }
        : { next: { revalidate: 43200 } },
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch latest blog posts: ${response.status}`,
      );
    }
    const data = await response.json();

    const posts = Array.isArray(data?.posts)
      ? data.posts
      : [];

    return {
      ...data,
      posts: limit ? posts.slice(0, limit) : posts,
    };
  } catch (error) {
    console.error(
      "Error fetching latest published blog posts:",
      error,
    );
    return { posts: [] };
  }
}

async function fetchBlogPostBySlug(slug) {
  try {
    const isDev = process.env.NODE_ENV === "development";
    const response = await fetch(
      `${API_BASE_URL}/blog/posts/${slug}`,
      {
        next: isDev
          ? { revalidate: 0 }
          : { revalidate: 86400 },
      },
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch blog post with slug ${slug}: ${response.status}`,
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      `Error fetching blog post with slug ${slug}:`,
      error,
    );
    return null;
  }
}

async function fetchBlogCategories() {
  const isDev = process.env.NODE_ENV === "development";
  try {
    const response = await fetch(
      `${API_BASE_URL}/blog/categories`,
      {
        next: isDev
          ? { revalidate: 0 }
          : { revalidate: 43200 },
      },
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch blog categories: ${response.status}`,
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching blog categories:", error);
    return [];
  }
}

async function fetchPublishedCategoryBySlug(slug) {
  const isDev = process.env.NODE_ENV === "development";
  try {
    const response = await fetch(
      `${API_BASE_URL}/blog/categories/${slug}`,
      {
        next: isDev
          ? { revalidate: 0 }
          : { revalidate: 43200 },
      },
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch category with slug ${slug}: ${response.status}`,
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      `Error fetching category with slug ${slug}:`,
      error,
    );
    return null;
  }
}

async function fetchBlogPostsByCategorySlug(
  categorySlug,
  { page = 1, limit = 12 } = {},
) {
  const isDev = process.env.NODE_ENV === "development";
  try {
    const params = new URLSearchParams({ page, limit });
    const response = await fetch(
      `${API_BASE_URL}/blog/categories/${categorySlug}/posts?${params}`,
      {
        next: isDev
          ? { revalidate: 0 }
          : { revalidate: 43200 },
      },
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch blog posts for category ${categorySlug}: ${response.status}`,
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      `Error fetching blog posts for category ${categorySlug}:`,
      error,
    );
    return null;
  }
}

export {
  fetchPublishedBlogPosts,
  fetchLatestPublishedBlogPosts,
  fetchBlogPostBySlug,
  fetchBlogCategories,
  fetchBlogPostsByCategorySlug,
  fetchPublishedCategoryBySlug,
};
