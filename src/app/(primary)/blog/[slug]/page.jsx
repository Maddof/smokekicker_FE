import { notFound } from "next/navigation";
import { ROUTES } from "@/config/routes";
import {
  fetchBlogPostsByCategorySlug,
  fetchBlogCategories,
  fetchPublishedCategoryBySlug,
} from "@/lib/data/api/fetchBlog";
import BlogHero from "@/components/blogg/BlogHero";
import BlogCategoryPicker from "@/components/blogg/BlogCategoryPicker";
import BlogCard from "@/components/blogg/BlogCard";
import BlogPagination from "@/components/blogg/BlogPagination";

export const revalidate = 43200;

export async function generateStaticParams() {
  const categories = await fetchBlogCategories();
  if (!categories) return [];
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({
  params,
  searchParams,
}) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const page = Number(pageParam) || 1;
  const category = await fetchPublishedCategoryBySlug(slug);

  if (!category) return {};

  const base = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://smokekicker.com"}${ROUTES.BLOG.CATEGORY(slug)}`;

  return {
    title: `${category.name} | Blog`,
    description: category.description ?? undefined,
    alternates: {
      canonical: page > 1 ? `${base}?page=${page}` : base,
      ...(page > 1 && {
        prev:
          page === 2 ? base : `${base}?page=${page - 1}`,
      }),
    },
    ...(page > 1 && {
      other: { next: `${base}?page=${page + 1}` },
    }),
  };
}

export default async function BlogCategoryPage({
  params,
  searchParams,
}) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const page = Number(pageParam) || 1;

  const blogData = await fetchBlogPostsByCategorySlug(
    slug,
    {
      page,
      limit: 12,
    },
  );
  if (!blogData || !blogData.posts) {
    notFound();
  }

  const { posts, pagination } = blogData;
  const currentPath = ROUTES.BLOG.CATEGORY(slug);

  const category = await fetchPublishedCategoryBySlug(slug);
  if (!category) {
    notFound();
  }

  const categoryName = category.name;
  const categoryDescription = category.description;

  return (
    <>
      <BlogHero
        title={categoryName}
        description={categoryDescription}
      />
      <BlogCategoryPicker currentPath={currentPath} />

      <section
        id="blog-posts"
        className="mx-auto max-w-7xl px-4 py-10 sm:px-6"
      >
        {posts.length === 0 ? (
          <p className="text-muted-foreground py-16 text-center">
            No blog posts found in this category.
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.id}>
                <BlogCard post={post} />
              </li>
            ))}
          </ul>
        )}

        <BlogPagination
          pagination={pagination}
          basePath={currentPath}
        />
      </section>
    </>
  );
}
