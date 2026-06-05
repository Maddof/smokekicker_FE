import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { getImageUrl } from "@/lib/utils/getUrl";

export default function BrandCard({ brand }) {
  // Safety check for required props
  if (!brand || !brand.slug || !brand.name) {
    return null;
  }

  const logoMedia = brand.media?.find(
    (m) => m.role === "LOGO",
  );
  const logoUrl = logoMedia?.mediaAsset?.url;

  return (
    <Link
      href={ROUTES.BRANDS.DETAIL(brand.slug)}
      className="hover:border-primary flex flex-col items-center rounded-lg border p-4 transition-all hover:shadow-md"
    >
      <div className="relative mb-4 flex aspect-2/1 w-full overflow-hidden">
        {logoUrl ? (
          <Image
            src={getImageUrl(logoUrl)}
            alt={
              logoMedia?.mediaAsset?.altText || brand.name
            }
            width={logoMedia?.mediaAsset?.width || 400}
            height={logoMedia?.mediaAsset?.height || 200}
            className="object-contain"
          />
        ) : (
          <div className="bg-secondary flex h-full w-full items-center justify-center rounded-md">
            <span className="text-secondary-foreground text-4xl font-bold">
              {brand.name.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <h2 className="text-center text-base font-medium">
        {brand.name}
      </h2>
      {brand.description && (
        <p className="text-foreground mt-1 line-clamp-2 text-center text-[85%]">
          {brand.description}
        </p>
      )}
    </Link>
  );
}
