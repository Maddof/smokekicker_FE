import Link from "next/link";
import BlogCard from "./blogg/BlogCard";
import { ROUTES } from "@/config/routes";

export default function LatestBlogPosts({
  posts = [],
  headline = "Kunskap och nyheter från bloggen",
  description = "Ta del av guider, nyheter och vanliga frågor inom vitt snus och vape.",
  showExcerpt = true,
}) {
  return (
    <section id="latest-blog-posts">
      <div className="container">
        <div className="mb-2 flex items-end justify-between gap-4">
          <h2>{headline}</h2>
        </div>
        {description ? <p className="mb-6">{description}</p> : null}
        {posts.length === 0 ? (
          <p className="text-muted-foreground py-16 text-center">
            Inga blogginlägg hittades.
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.id}>
                <BlogCard post={post} showExcerpt={showExcerpt} />
              </li>
            ))}
          </ul>
        )}
        <Link href={ROUTES.BLOG.INDEX} className="mt-6 block">
          Se alla inlägg
        </Link>
      </div>
    </section>
  );
}
