import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/config/routes";

export default function BrandCard({ brand }) {
  // Safety check for required props
  if (!brand || !brand.slug || !brand.name) {
    return null;
  }

  return (
    <Link
      href={ROUTES.BRANDS.DETAIL(brand.slug)}
      className="group hover:border-primary flex flex-col items-center rounded-lg border p-4 transition-all hover:shadow-md"
    >
      <div className="relative mb-4 aspect-square w-full overflow-hidden">
        {brand.logoUrl ? (
          <Image
            src={brand.logoUrl}
            alt={brand.name}
            fill
            sizes="(max-width: 768px) 40vw, 200px"
            className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="bg-secondary flex h-full w-full items-center justify-center rounded-md">
            <span className="text-secondary-foreground text-4xl font-bold">
              {brand.name.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <h2 className="text-center text-sm font-medium group-hover:underline">
        {brand.name}
      </h2>
      {brand.description && (
        <p className="text-muted-foreground mt-1 line-clamp-2 text-center text-xs">
          {brand.description}
        </p>
      )}
    </Link>
  );
}
