import { fetchPublishedBlogPosts } from "@/lib/data/api/fetchBlog";
import { ROUTES } from "@/config/routes";
import BlogHero from "@/components/blogg/BlogHero";
import BlogCategoryPicker from "@/components/blogg/BlogCategoryPicker";
import BlogCard from "@/components/blogg/BlogCard";
import BlogPagination from "@/components/blogg/BlogPagination";
import { SITE_NAME } from "@/config/metadata";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://smokify.se";

// Revalidate this page every 12 hours (43200 seconds) to keep content fresh without overloading the server. Adjust as needed based on how often blog content changes.
export const revalidate = 43200;

export async function generateMetadata({ searchParams }) {
  const { page: pageParam } = await searchParams;
  const page = Number(pageParam) || 1;
  const base = `${SITE_URL}${ROUTES.BLOG.INDEX}`;
  const url = page > 1 ? `${base}?page=${page}` : base;

  const title =
    page > 1
      ? `Nicotine Pouch News & Guides | Page ${page} `
      : `Nicotine Pouch News & Guides | Learn More `;

  const description =
    "Stay up to date with the latest nicotine pouch trends, product launches, flavor guides, and educational content for adult nicotine users.";

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: `${SITE_URL}/images/bg/blog_hero_moon-neon.jpg`,
          width: 2000,
          height: 600,
          alt: "Smokekicker Blog - Nicotine Pouch News & Guides",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        `${SITE_URL}/images/bg/blog_hero_moon-neon.jpg`,
      ],
    },
  };
}

export default async function BlogPage({ searchParams }) {
  const { page: pageParam } = await searchParams;
  const page = Number(pageParam) || 1;
  const blogData = await fetchPublishedBlogPosts({
    page,
    limit: 12,
  });
  const currentPath = ROUTES.BLOG.INDEX;

  if (!blogData || !blogData.posts) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-4 text-3xl font-bold">Blog</h1>
        <p className="mb-8 text-gray-600">
          Unfortunately, we couldn't load the blog posts at
          the moment. Please try again later.
        </p>
        <a
          href={ROUTES.HOME}
          className="inline-block rounded bg-orange-500 px-6 py-3 text-white transition hover:bg-orange-600"
        >
          Back to Home
        </a>
      </div>
    );
  }

  const { posts, pagination } = blogData;

  const base = `${SITE_URL}${ROUTES.BLOG.INDEX}`;
  const pageUrl = page > 1 ? `${base}?page=${page}` : base;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name:
        page > 1
          ? `Nicotine Pouch News & Guides – Page ${page} }`
          : `Nicotine Pouch News & Guides }`,
      description:
        "Stay up to date with the latest nicotine pouch trends, product launches, flavor guides, and educational content for adult nicotine users.",
      inLanguage: "en",
      isPartOf: {
        "@id": `${SITE_URL}#website`,
      },
      publisher: {
        "@id": `${SITE_URL}#organization`,
      },
      image: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/bg/blog_hero_moon-neon.jpg`,
        width: 2000,
        height: 600,
      },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: posts.length,
        itemListElement: posts.map((post, index) => ({
          "@type": "ListItem",
          position:
            (page - 1) * pagination.limit + index + 1,
          url: `${SITE_URL}${ROUTES.BLOG.POST(post.primaryCategory.slug, post.slug)}`,
          name: post.title,
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: base,
        },
        ...(page > 1
          ? [
              {
                "@type": "ListItem",
                position: 3,
                name: `Page ${page}`,
                item: pageUrl,
              },
            ]
          : []),
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <BlogHero />
      <BlogCategoryPicker currentPath={currentPath} />

      <section
        id="blog-posts"
        className="mx-auto max-w-7xl px-4 py-10 sm:px-6"
      >
        {posts.length === 0 ? (
          <p className="text-muted-foreground py-16 text-center">
            No blog posts found.
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
          basePath={ROUTES.BLOG.INDEX}
        />
      </section>
    </>
  );
}
