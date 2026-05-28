import ProductCard from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/scn/button";
import { ROUTES } from "@/config/routes";
import Link from "next/link";

export default function FeaturedProducts({
  products,
  headline,
  description,
  ctaLabel,
}) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="container">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-2xl font-bold tracking-tight md:text-4xl">
            {headline ?? "Utvalda produkter"}
          </h2>
          <p className="text-muted mx-auto max-w-2xl">
            {description ?? "Våra mest populära produkter just nu!"}
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
        <div className="mt-10 flex justify-center">
          <Button asChild>
            <Link href={ROUTES.SHOP.INDEX}>
              {ctaLabel ?? "Se alla produkter"}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
