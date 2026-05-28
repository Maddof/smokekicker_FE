import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { fetchBlogCategories } from "@/lib/data/api/fetchBlog";

export default async function BlogCategoryPicker({ currentPath }) {
  const fetchedCategories = await fetchBlogCategories();
  const categories = fetchedCategories ?? [];

  const allItem = { name: "Alla Inlägg", href: ROUTES.BLOG.INDEX };
  const categoryItems = categories.map((cat) => ({
    name: cat.name,
    href: ROUTES.BLOG.CATEGORY(cat.slug),
    count: cat._count?.posts ?? 0,
  }));
  const items = [allItem, ...categoryItems];

  return (
    <section
      className="pt-4 pb-0 md:pt-6"
      aria-label="Blog Categories"
      id="category-picker"
    >
      <div className="border-primary container max-w-full border-b-2">
        <nav className="relative mb-2 w-full">
          <div className="mb-2 flex items-center justify-center gap-2">
            <div className="bg-primary/70 h-0.5 w-6"></div>
            <span className="text-muted text-center text-xs uppercase sm:text-base">
              Välj Bloggkategori
            </span>
            <div className="bg-primary/70 h-0.5 w-6"></div>
          </div>
          <ul className="my-6 flex flex-wrap gap-3 text-xs font-medium uppercase sm:justify-center sm:gap-6 sm:text-sm">
            {items.map((cat) => {
              const isActive =
                cat.href === currentPath ||
                (cat.href !== ROUTES.BLOG.INDEX &&
                  currentPath.startsWith(cat.href));

              return (
                <li key={cat.name} className="list-none">
                  <Link
                    href={cat.href}
                    className={`${
                      isActive ? "bg-primary border" : "hover:text-primary"
                    } border-primary text-foreground group block rounded-lg border px-2 py-2`}
                  >
                    {cat.name}
                    {cat.count != null && (
                      <span className="text-muted group-hover:text-primary ml-1 font-normal normal-case">
                        ({cat.count})
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </section>
  );
}
