import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils/getUrl";
import { formatCurrency } from "@/lib/utils/currencyFormatter";
import { ROUTES } from "@/config/routes";
import AtcButtonListings from "../cart/atcButtonListings";

// Default fallback image
const fallbackImage = "/images/fallback.png";

export default function ProductCard({
  product,
  className = "",
}) {
  if (!product) {
    return null;
  }

  const {
    id,
    name,
    price,
    slug,
    brand,
    details,
    category,
    media,
  } = product;

  // Get image URL with fallback
  const primaryMedia =
    media?.find((m) => m.role === "PRIMARY_IMAGE") ??
    media?.[0];
  const imageUrl =
    getImageUrl(primaryMedia?.mediaAsset?.url) ||
    fallbackImage;
  const imageAlt =
    primaryMedia?.mediaAsset?.altText || name;
  const imageWidth = primaryMedia?.mediaAsset?.width;
  const imageHeight = primaryMedia?.mediaAsset?.height;
  // const imageDimensions =
  //   imageWidth && imageHeight
  //     ? { width: imageWidth, height: imageHeight }
  //     : { fill: true };
  const imageDimensions =
    imageWidth && imageHeight
      ? { width: imageWidth, height: imageHeight }
      : { width: 400, height: 400 }; // Default dimensions for fallback

  // Generate product URL safely
  const productUrl = `${ROUTES.SHOP.INDEX}/${category.slug}/${brand.slug}/${slug}`;

  // Determine nicotine unit based on category
  const getNicotineUnit = () => {
    const categorySlug = category?.slug?.toLowerCase();
    if (
      categorySlug === "nicotine-pouches" ||
      categorySlug === "energy-pouches"
    ) {
      return "mg/pouch";
    }
    return "mg/portion";
  };

  const nicotineUnit = getNicotineUnit();

  return (
    <li
      id={`product-card-${id}`}
      className={`flex flex-col items-start gap-3 bg-white p-2 shadow-sm transition-all duration-200 hover:shadow-md sm:gap-4 sm:p-4 ${className}`}
    >
      <Link
        href={productUrl}
        prefetch={false}
        className="group flex w-full items-center justify-center"
        id={`product-card__image-link-${id}`}
      >
        <Image
          src={imageUrl}
          id={`product-card__image-${id}`}
          alt={imageAlt}
          {...imageDimensions}
          className="flex h-30 w-auto object-contain transition-transform duration-200 md:h-50"
        />
      </Link>

      <div
        id="product-card__meta"
        className="xsm:flex-row flex w-full flex-col gap-1.5"
      >
        <span
          id="product-card__type"
          className="text-muted text-xs"
        >
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
        prefetch={false}
        id={`product-card__title-link-${id}`}
      >
        <h3
          id={`product-name-${id}`}
          className="hover:text-primary text-foreground w-full border-b font-bold"
        >
          {name}
        </h3>
      </Link>

      <div
        id="product-card__actions"
        className="mt-auto w-full"
      >
        {/* <span
          id={`product-card__price-${id}`}
          className="block font-bold"
        >
          {formatCurrency(price)}
        </span> */}
        <AtcButtonListings
          product={product}
          id={`product-card__atc-${id}`}
        />
      </div>
    </li>
  );
}
