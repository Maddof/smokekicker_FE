const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getPageByKey(key) {
  const isDev = process.env.NODE_ENV === "development";
  const response = await fetch(
    `${API_BASE_URL}/pages/key/${key}`,
    {
      // NextJS caching strategy: revalidate 24 hour (disabled in dev)
      next: isDev
        ? { revalidate: 0 }
        : {
            revalidate: 86400, // Revalidate 24 hour
            tags: ["pages", `page:${key}`],
          },
    },
  );
  if (!response.ok) {
    console.error(
      `Failed to fetch page with key ${key}: ${response.status}`,
    );
    return null;
  }
  const page = await response.json();
  return page;
}

export async function getAllPublishedPages() {
  const response = await fetch(
    `${API_BASE_URL}/pages/published`,
  );
  if (!response.ok) {
    console.error(
      `Failed to fetch published pages: ${response.status}`,
    );
    return [];
  }
  const pages = await response.json();
  return pages;
}
