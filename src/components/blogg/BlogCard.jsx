import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { getImageUrl } from "@/lib/utils/getUrl";

const fallbackImage = "/images/fallback.png";

function formatDate(dateString) {
  if (!dateString) return null;
  return new Date(dateString).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogCard({ post, showExcerpt = true }) {
  if (!post) return null;

  const {
    title,
    slug,
    excerpt,
    coverImgUrl,
    coverImgAlt,
    publishedAt,
    author,
    primaryCategory,
  } = post;

  const postUrl = ROUTES.BLOG.POST(primaryCategory?.slug, slug);
  const imageUrl = getImageUrl(coverImgUrl) || fallbackImage;
  const authorName = author
    ? `${author.givenName} ${author.surname}`.trim()
    : null;
  const publishedDate = formatDate(publishedAt);

  return (
    <article className="group border-border bg-card flex h-full flex-col overflow-hidden rounded-lg border shadow-sm transition-shadow duration-200 hover:shadow-md">
      {/* Cover image */}
      <Link
        href={postUrl}
        className="bg-muted relative block aspect-video w-full shrink-0 overflow-hidden"
      >
        <Image
          src={imageUrl}
          alt={coverImgAlt || title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Category badge */}
        {primaryCategory && (
          <Link
            href={ROUTES.BLOG.CATEGORY(primaryCategory.slug)}
            className="text-primary w-fit text-xs font-semibold tracking-wide uppercase hover:underline"
          >
            {primaryCategory.name}
          </Link>
        )}

        {/* Title */}
        <h2 className="line-clamp-2 text-base leading-snug font-bold group-hover:underline">
          <Link href={postUrl}>{title}</Link>
        </h2>

        {/* Excerpt */}
        {showExcerpt && excerpt && (
          <p className="text-muted-foreground line-clamp-3 text-sm">
            {excerpt}
          </p>
        )}

        {/* Footer: author + date */}
        <div className="text-muted-foreground mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-2 text-xs">
          {publishedDate && <time dateTime={publishedAt}>{publishedDate}</time>}
        </div>
      </div>
    </article>
  );
}
