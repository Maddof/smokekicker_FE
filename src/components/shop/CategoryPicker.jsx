import Link from "next/link";
import { ROUTES } from "@/config/routes";

export default function CategoryPicker({ currentPath }) {
  const categories = [
    { name: "All Products", href: ROUTES.SHOP.INDEX },
    {
      name: "Nicotine Pouches",
      href: `${ROUTES.SHOP.INDEX}/nicotine-pouches`,
    },
    {
      name: "Nicotine Free Pouches",
      href: `${ROUTES.SHOP.INDEX}/nicotine-free-pouches`,
    },
    {
      name: "Caffeine Pouches",
      href: `${ROUTES.SHOP.INDEX}/caffeine-pouches`,
    },
    {
      name: "Swedish Candy",
      href: `${ROUTES.SHOP.INDEX}/swedish-candy`,
    },
    {
      name: "Accessories",
      href: `${ROUTES.SHOP.INDEX}/accessories`,
    },
  ];

  return (
    <section
      className="pt-4 pb-0 md:pt-6"
      aria-label="Product Categories"
      id="category-picker"
    >
      <div className="border-primary container max-w-full border-b-2">
        <nav className="relative mb-2 w-full">
          <div className="mb-2 flex items-center justify-center gap-2">
            <div className="bg-primary/70 h-0.5 w-6"></div>
            <span className="text-muted text-center text-xs uppercase sm:text-base">
              Pick a product category
            </span>
            <div className="bg-primary/70 h-0.5 w-6"></div>
          </div>
          <ul className="my-6 flex flex-wrap gap-3 text-xs font-medium uppercase sm:justify-center sm:gap-6 sm:text-sm">
            {categories.map((cat) => {
              const isActive =
                cat.href === currentPath ||
                (cat.href !== ROUTES.SHOP.INDEX &&
                  currentPath.startsWith(cat.href));

              return (
                <li key={cat.name} className="list-none">
                  <Link
                    href={cat.href}
                    className={`${
                      isActive
                        ? "bg-primary border"
                        : "hover:text-primary"
                    } border-primary text-foreground block rounded-lg border px-2 py-2`}
                  >
                    {cat.name}
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
