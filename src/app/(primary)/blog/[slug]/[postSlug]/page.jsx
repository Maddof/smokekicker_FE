import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/config/routes";
import {
  fetchBlogPostBySlug,
  fetchPublishedBlogPosts,
} from "@/lib/data/api/fetchBlog";
import { getImageUrl } from "@/lib/utils/getUrl";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://smokekicker.se";

export const revalidate = 86400; // Revalidate this page every 24 hours to keep content fresh without overloading the server. Adjust as needed based on how often blog content changes.

export async function generateStaticParams() {
  const blogData = await fetchPublishedBlogPosts({
    page: 1,
    limit: 100,
  });
  if (!blogData?.posts) return [];
  return blogData.posts.map((post) => ({
    slug: post.primaryCategory?.slug ?? "uncategorized",
    postSlug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { postSlug } = await params;
  const post = await fetchBlogPostBySlug(postSlug);

  if (!post) return {};

  const url = `${SITE_URL}${ROUTES.BLOG.POST(post.primaryCategory?.slug, post.slug)}`;
  const title = post.seoMetaTitle || post.title;
  const description =
    post.seoMetaDescription || post.excerpt || undefined;
  const imageUrl = post.coverImgUrl
    ? getImageUrl(post.coverImgUrl)
    : null;
  const authorName =
    [post.author?.givenName, post.author?.surname]
      .filter(Boolean)
      .join(" ") || undefined;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
    },
    authors: authorName
      ? [{ name: authorName }]
      : undefined,
    category: post.primaryCategory?.name || undefined,
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: "Smokekicker Blog",
      locale: "en_US",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: authorName ? [authorName] : undefined,
      section: post.primaryCategory?.name || undefined,
      ...(imageUrl && {
        images: [
          {
            url: imageUrl,
            alt: post.coverImgAlt || post.title,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(imageUrl && {
        images: [imageUrl],
      }),
    },
  };
}

function formatDate(dateString) {
  if (!dateString) return null;
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }) {
  const { slug: categorySlug, postSlug } = await params;
  const post = await fetchBlogPostBySlug(postSlug);

  if (!post) notFound();

  // Guard: if the category slug in the URL doesn't match the post's primary category, 404
  if (
    post.primaryCategory?.slug &&
    post.primaryCategory.slug !== categorySlug
  ) {
    notFound();
  }

  const {
    title,
    excerpt,
    contentHtml,
    coverImgUrl,
    coverImgAlt,
    publishedAt,
    primaryCategory,
    author,
  } = post;

  const url = `${SITE_URL}${ROUTES.BLOG.POST(post.primaryCategory?.slug, post.slug)}`;
  const imageUrl = coverImgUrl
    ? getImageUrl(coverImgUrl)
    : null;
  const publishedDate = formatDate(publishedAt);
  const publishedISO = publishedAt
    ? new Date(publishedAt).toISOString()
    : null;
  const authorName =
    [author?.givenName, author?.surname]
      .filter(Boolean)
      .join(" ") || undefined;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
      },
      url,
      headline: title,
      name: title,
      description:
        post.seoMetaDescription || excerpt || undefined,
      inLanguage: "en-US",
      datePublished: publishedAt,
      dateModified: post.updatedAt || publishedAt,
      author: authorName
        ? {
            "@type": "Person",
            name: authorName,
          }
        : undefined,
      publisher: {
        "@id": `${SITE_URL}#organization`,
      },
      isPartOf: {
        "@id": `${SITE_URL}#website`,
      },
      articleSection: primaryCategory?.name || undefined,
      image: imageUrl
        ? [
            {
              "@type": "ImageObject",
              url: imageUrl,
            },
          ]
        : undefined,
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
          item: `${SITE_URL}${ROUTES.BLOG.INDEX}`,
        },
        ...(primaryCategory
          ? [
              {
                "@type": "ListItem",
                position: 3,
                name: primaryCategory.name,
                item: `${SITE_URL}${ROUTES.BLOG.CATEGORY(primaryCategory.slug)}`,
              },
            ]
          : []),
        {
          "@type": "ListItem",
          position: primaryCategory ? 4 : 3,
          name: title,
          item: url,
        },
      ],
    },
  ];

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      {/* Category badge */}
      {primaryCategory && (
        <span className="text-primary mb-3 inline-block text-xs font-semibold tracking-wide uppercase">
          {primaryCategory.name}
        </span>
      )}

      {/* Title */}
      <h1 className="mb-4">{title}</h1>

      {/* Excerpt */}
      {excerpt && (
        <p className="text-muted mb-6 leading-relaxed">
          {excerpt}
        </p>
      )}

      {/* Meta: date */}
      <div className="text-muted-foreground mb-8 flex flex-wrap items-center gap-x-3 gap-y-1 border-b pb-6">
        {authorName && (
          <>
            <span className="sr-only">Author:</span>
            <span className="text-sm">{authorName}</span>
          </>
        )}
        {authorName && publishedDate && (
          <span aria-hidden="true">·</span>
        )}
        {publishedDate && publishedISO && (
          <time className="text-sm" dateTime={publishedISO}>
            {publishedDate}
          </time>
        )}
      </div>

      {/* Cover image */}
      {imageUrl && (
        <div className="mb-8 overflow-hidden rounded-lg">
          <Image
            src={imageUrl}
            alt={coverImgAlt || title}
            width={800}
            height={450}
            className="w-full object-cover"
            priority
          />
        </div>
      )}

      {/* Content */}
      {contentHtml && (
        <div
          className="prose prose-sm md:prose-base dark:prose-invert max-w-none [&_a]:wrap-break-word"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      )}

      {/* Back to category */}
      {primaryCategory && (
        <div className="mt-12 border-t pt-8">
          <Link
            href={ROUTES.BLOG.CATEGORY(
              primaryCategory.slug,
            )}
            className="text-primary hover:underline"
          >
            ← Back to {primaryCategory.name}
          </Link>
        </div>
      )}
    </article>
  );
}
