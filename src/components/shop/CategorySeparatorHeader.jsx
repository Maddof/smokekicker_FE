import Image from "next/image";
import Link from "next/link";

export default function CategoryHeader({
  title = "Category Title",
  description = "Category description goes here with details about this product category.",
  imageSrc = "/images/icons/vape_prefilled-pods_icons.svg",
  imageAlt = "Category icon",
  imageClassName = "w-24 opacity-20 sm:w-32",
  categoryHref,
}) {
  return (
    <section className="bg-secondary neon-bg-radial-top-right border-primary border-y-2 py-8">
      <div className="container">
        <div className="text-secondary-foreground flex flex-row gap-8 sm:flex-row">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={400}
            height={400}
            className={imageClassName}
          />
          <div className="flex flex-col items-start justify-center gap-4">
            <h2 className="h2-shop">{title}</h2>
            <p className="max-w-md">{description}</p>
            {categoryHref && (
              <Link
                href={categoryHref}
                className="border-primary hover:bg-primary/10 inline-flex items-center gap-1 rounded-md border px-4 py-2 font-medium transition-colors duration-200"
              >
                View all in {title}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
