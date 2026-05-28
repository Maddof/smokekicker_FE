import Image from "next/image";
import Link from "next/link";
import AtcButtonDefault from "@/components/cart/atcButton";
import { getImageUrl } from "@/lib/utils/getUrl";
import { formatCurrency } from "@/lib/utils/currencyFormatter";
import { ROUTES } from "@/config/routes";

// Default fallback image
const fallbackImage = "/images/fallback.png";

export default function ProductCard({ product, className = "" }) {
  if (!product) {
    return null;
  }

  const { id, name, price, slug, brand, details, category, imgUrl } = product;

  // Get image URL with fallback

  const imageUrl = getImageUrl?.(imgUrl) || fallbackImage;

  // Generate product URL safely
  const productUrl = `${ROUTES.SHOP.INDEX}/${category.slug}/${brand.slug}/${slug}`;

  // Determine nicotine unit based on category
  const getNicotineUnit = () => {
    const categorySlug = category?.slug?.toLowerCase();
    if (categorySlug === "vitt-snus" || categorySlug === "nikotinavvanjning") {
      return "mg/portion";
    }
    return "mg/ml";
  };

  const nicotineUnit = getNicotineUnit();

  return (
    <li
      id={`product-card-${id}`}
      className={`flex h-full flex-col items-start gap-3 bg-white p-3 shadow-sm transition-all duration-200 hover:shadow-md sm:gap-4 sm:p-4 ${className}`}
    >
      <Link
        href={productUrl}
        className="group xsm:h-48 relative block h-40 w-full sm:h-56 md:h-64"
        id={`product-card__image-link-${id}`}
      >
        <Image
          src={imageUrl}
          id={`product-card__image-${id}`}
          alt={name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="w-full object-contain transition-transform duration-200 group-hover:scale-105"
        />
      </Link>

      <div
        id="product-card__meta"
        className="xsm:flex-row flex w-full flex-col gap-1.5"
      >
        <span id="product-card__type" className="text-muted text-xs">
          {details?.type}
        </span>
        <span
          id="product-card__nicotine-strength"
          className="text-muted xsm:ml-auto ml-0 text-xs"
        >
          {/* {details?.nicotineValue
            ? `${details.nicotineValue}${nicotineUnit}`
            : `0${nicotineUnit}`} */}
          {details?.nicotineValue
            ? `${details.nicotineValue} ${nicotineUnit}`
            : "0 mg"}
        </span>
      </div>

      <Link
        href={productUrl}
        className="w-full"
        id={`product-card__title-link-${id}`}
      >
        <h3
          id={`product-name-${id}`}
          className="hover:text-primary text-foreground w-full border-b font-bold"
        >
          {name}
        </h3>
      </Link>

      <div id="product-card__actions" className="mt-auto w-full">
        <span id={`product-card__price-${id}`} className="block font-bold">
          {formatCurrency(price)}
        </span>
        <AtcButtonDefault
          product={product}
          className="mt-4 w-full"
          id={`product-card__atc-${id}`}
        />
      </div>
    </li>
  );
}
