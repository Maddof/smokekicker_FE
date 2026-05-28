import Link from "next/link";
import { ROUTES } from "@/config/routes";

export default function CategoryPicker({ currentPath }) {
  const categories = [
    { name: "Alla produkter", href: ROUTES.SHOP.INDEX },
    { name: "Prenumerationer", href: ROUTES.SHOP.SUBSCRIPTIONS },
    {
      name: "Start-kit Förfyllda Podsystem",
      href: `${ROUTES.SHOP.INDEX}/start-kit-forfyllda-podsystem`,
    },
    {
      name: "Start-kit Vape",
      href: `${ROUTES.SHOP.INDEX}/start-kit-vape`,
    },
    {
      name: "Förfyllda poddar",
      href: `${ROUTES.SHOP.INDEX}/forfyllda-poddar`,
    },
    {
      name: "E-Juice",
      href: `${ROUTES.SHOP.INDEX}/e-juice`,
    },
    { name: "Vitt snus", href: `${ROUTES.SHOP.INDEX}/vitt-snus` },
    {
      name: "Nikotinavvänjning",
      href: `${ROUTES.SHOP.INDEX}/nikotinavvanjning`,
    },
    { name: "Konfektyr", href: `${ROUTES.SHOP.INDEX}/konfektyr` },
    { name: "Tillbehör", href: `${ROUTES.SHOP.INDEX}/tillbehor` },
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
              Välj Produktkategori
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
                      isActive ? "bg-primary border" : "hover:text-primary"
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
