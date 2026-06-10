import { getAllPublishedPages } from "@/lib/cms/getPage";
import {
  fetchBlogCategories,
  fetchPublishedBlogPosts,
} from "@/lib/data/api/fetchBlog";
import { fetchAllBrands } from "@/lib/data/api/fetchBrands";
import { fetchAllPublishedCategories } from "@/lib/data/api/fetchCategories";
import { fetchAllPublishedProducts } from "@/lib/data/api/fetchProducts";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://smokekicker.com";

export const revalidate = 43200; // 12 timmar i sekunder

// LEGACY: Relevant updatedAt dates are now fetched directly from the API responses (gets automatically updated with db queries). The getLatestDate function is no longer needed and has been commented out for potential future reference.
// function getLatestDate(items) {
//   const validDates = items
//     .map((item) => new Date(item.updatedAt))
//     .filter((date) => !isNaN(date));
//   return validDates.length > 0
//     ? new Date(Math.max(...validDates))
//     : new Date();
// }

export default async function sitemap() {
  // Hämta data för dynamiska sidor
  const [
    categories,
    brands,
    products,
    blogCategories,
    blogPostsData,
  ] = await Promise.all([
    fetchAllPublishedCategories(),
    fetchAllBrands(),
    fetchAllPublishedProducts(),
    fetchBlogCategories(),
    fetchPublishedBlogPosts(),
  ]);

  const allPublishedPages = await getAllPublishedPages();

  // 1) Statiska sidor

  const staticRoutes = allPublishedPages.map((page) => ({
    url: `${BASE_URL}${page.path}`,
    lastModified: page.updatedAt,
  }));

  // 2) Dynamiska sidor

  const categoriesRoutes = categories.map((category) => ({
    url: `${BASE_URL}/products/${category.slug}`,
    lastModified: category.updatedAt
      ? category.updatedAt
      : new Date(),
  }));

  const brandsRoutes = brands.map((brand) => ({
    url: `${BASE_URL}/brands/${brand.slug}`,
    lastModified: brand.updatedAt
      ? brand.updatedAt
      : new Date(),
  }));

  const productsRoutes = products.map((product) => ({
    url: `${BASE_URL}/products/${product.category.slug}/${product.brand.slug}/${product.slug}`,
    lastModified: product.updatedAt
      ? product.updatedAt
      : new Date(),
  }));

  const blogCategoriesRoutes = blogCategories.map(
    (category) => ({
      url: `${BASE_URL}/blog/${category.slug}`,
      lastModified: category.updatedAt
        ? category.updatedAt
        : new Date(),
    }),
  );

  const blogPostRoutes = blogPostsData.posts.map(
    (post) => ({
      url: `${BASE_URL}/blog/${post.primaryCategory?.slug || "uncategorized"}/${
        post.slug
      }`,
      lastModified: post.updatedAt
        ? post.updatedAt
        : new Date(),
    }),
  );

  // 3) Returnera alla poster
  return [
    ...staticRoutes,
    ...categoriesRoutes,
    ...brandsRoutes,
    ...productsRoutes,
    ...blogCategoriesRoutes,
    ...blogPostRoutes,
  ];
}
