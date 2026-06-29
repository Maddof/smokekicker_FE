import AtcButtonDefault from "@/components/cart/atcButton";
import { fetchAllPublishedCategories } from "@/lib/data/api/fetchCategories";
import {
  fetchProductBySlugCategoryAndBrand,
  fetchProductsByCategorySlug,
  fetchProductsByCategorySlugAndBrandSlug,
  fetchRelatedProductsSeeded,
} from "@/lib/data/api/fetchProducts";
import { productContent } from "@/lib/data/productContent";
import { formatCurrency } from "@/lib/utils/currencyFormatter";
import { getImageUrl } from "@/lib/utils/getUrl";
import Image from "next/image";
import { ROUTES } from "@/config/routes";
import { SITE_NAME } from "@/config/metadata";
import ProductDescription from "./ProductDescription";
import BulkDealCallout from "./BulkDealCallout";
import SameBrandProductsPicker from "@/components/shop/products/SameBrandProductsPicker";
import ProductCard from "@/components/shop/ProductCard";
import Link from "next/link";
import { Button } from "@/components/ui/scn/button";
import { ChevronRight } from "lucide-react";
import ProductViewTracker from "./ProductViewTracker";

const fallBackImage = "/images/fallback.png";

export const revalidate = 86400; // Revalidate this page every 24 hours

export async function generateMetadata({ params }) {
  const { categorySlug, brandSlug, productSlug } =
    await params;

  // Fetch the product by slugs
  const product = await fetchProductBySlugCategoryAndBrand(
    categorySlug,
    brandSlug,
    productSlug,
  );

  if (!product) {
    return {
      title: `Product not found - ${SITE_NAME}`,
      description: "This product could not be found.",
    };
  }

  // Prepare product title
  const title = `${product.name} - ${product.details.type ? product.details.type : ""}`;

  // Prepare description - use product description or a fallback
  const shortDesc = product.details.shortDesc;
  const longDesc = product.details?.longDesc
    ? product.details.longDesc.replace(/<[^>]+>/g, "")
    : "";

  const description =
    shortDesc + " " + longDesc.slice(0, 150) + "...";

  // Prepare price for display in metadata
  const price = formatCurrency(product.price);

  // Build canonical URL
  const url = `https://smokekicker.com${ROUTES.SHOP.PRODUCT(categorySlug, brandSlug, productSlug)}`;

  // Get image URL for social sharing
  const primaryMedia =
    product.media?.find(
      (m) => m.role === "PRIMARY_IMAGE",
    ) ?? product.media?.[0];

  const imageUrl =
    getImageUrl(primaryMedia?.mediaAsset?.url) ||
    fallBackImage;

  return {
    title: title,
    description: description,
    keywords: [
      product.name,
      product.brand.name,
      product.category.name,
      "nicotine pouches",
      "white snus",
    ].join(", "),

    // Open Graph / Facebook
    openGraph: {
      title: title,
      description: description,
      url: url,
      siteName: SITE_NAME,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: product.name,
            },
          ]
        : [],
      locale: "en_US",
      type: "website",
      product: {
        price: price,
        currency: "EUR",
      },
    },

    // Twitter
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title: title,
      description: description,
      images: imageUrl ? [imageUrl] : [],
    },

    // Additional metadata
    alternates: {
      canonical: url,
    },

    // Product structured data for rich results
    other: {
      "product:price:amount": (
        product.price / 100
      ).toString(),
      "product:price:currency": "EUR",
      "product:availability":
        product.stock > 0 ? "in stock" : "out of stock",
      "product:brand": product.brand.name,
      "product:condition": "new",
    },
  };
}

export async function generateStaticParams() {
  if (
    process.env.NEXT_PUBLIC_SKIP_STATIC_GENERATION ===
    "true"
  ) {
    return [];
  }
  const categories = await fetchAllPublishedCategories();
  const paths = [];

  // if (!products) return [];

  for (const category of categories) {
    const products = await fetchProductsByCategorySlug(
      category.slug,
    );

    for (const product of products) {
      // Make sure product has a brand with a slug
      if (product.brand && product.brand.slug) {
        paths.push({
          categorySlug: category.slug,
          brandSlug: product.brand.slug,
          productSlug: product.slug,
        });
      } else {
        console.warn(
          `Product ${product.name} (ID: ${product.id}) is missing brand slug`,
        );
      }
    }
  }

  return paths;
}

export default async function SingleProductPage({
  params,
}) {
  const { categorySlug, brandSlug, productSlug } =
    await params;

  // Fetch the product by slugs from the params
  const product = await fetchProductBySlugCategoryAndBrand(
    categorySlug,
    brandSlug,
    productSlug,
  );

  if (!product) {
    return (
      <section>
        <div className="container">Product not found!</div>
      </section>
    );
  }

  const relatedProducts = await fetchRelatedProductsSeeded(
    categorySlug,
    brandSlug,
    productSlug,
  );

  const bulkDiscountTiers =
    product.category?.bulkDiscountTiers ?? [];
  const showBulkCallout = bulkDiscountTiers.length > 0;

  // Fetch other products from the same category and brand
  const similarProducts =
    await fetchProductsByCategorySlugAndBrandSlug(
      categorySlug,
      brandSlug,
    );

  // Filter out the current product
  const sameBrandProducts = similarProducts.filter(
    (item) => item.slug !== productSlug,
  );

  const productConfig = productContent[categorySlug];

  const shortDesc = product.details.shortDesc;
  const longDesc = product.details?.longDesc
    ? product.details.longDesc.replace(/<[^>]+>/g, "")
    : "";

  const description =
    shortDesc + " " + longDesc.slice(0, 150) + "...";

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://smokekicker.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${siteUrl}${ROUTES.SHOP.PRODUCT(categorySlug, brandSlug, productSlug)}#product`,
    url: `${siteUrl}${ROUTES.SHOP.PRODUCT(categorySlug, brandSlug, productSlug)}`,
    name: product.name,
    image: [getImageUrl(product.imgUrl) || fallBackImage],
    description: description,
    brand: {
      "@type": "Brand",
      name: product.brand.name,
    },
    offers: {
      "@type": "Offer",
      url: `${siteUrl}${ROUTES.SHOP.PRODUCT(categorySlug, brandSlug, productSlug)}`,
      priceCurrency: "EUR",
      price: (product.price / 100).toFixed(2),
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${siteUrl}${ROUTES.HOME}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${siteUrl}${ROUTES.SHOP.INDEX}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.category.name,
        item: `${siteUrl}${ROUTES.SHOP.CATEGORY(product.category.slug)}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.brand.name,
        item: `${siteUrl}${ROUTES.BRANDS.DETAIL(product.brand.slug)}`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: product.name,
        item: `${siteUrl}${ROUTES.SHOP.PRODUCT(categorySlug, brandSlug, productSlug)}`,
      },
    ],
  };

  const primaryMedia =
    product.media?.find(
      (m) => m.role === "PRIMARY_IMAGE",
    ) ?? product.media?.[0];

  const imageUrl =
    getImageUrl(primaryMedia?.mediaAsset?.url) ||
    fallBackImage;

  const imageWidth = primaryMedia?.mediaAsset?.width;
  const imageHeight = primaryMedia?.mediaAsset?.height;
  const imageDimensions =
    imageWidth && imageHeight
      ? { width: imageWidth, height: imageHeight }
      : { fill: true };

  const imageAlt =
    primaryMedia?.mediaAsset?.altText || product.name;
  return (
    <>
      <ProductViewTracker productSlug={productSlug} />
      <section className="overflow-hidden pt-4 pb-2 md:pt-8 md:pb-4">
        {/* Add JSON-LD to your page */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbJsonLd),
          }}
        />
        <div className="z-10 container">
          <div className="flex flex-col gap-6 md:flex-row md:gap-10">
            {/* Product Image Column */}
            <div className="relative flex h-68 w-full items-center justify-center sm:h-72 md:h-auto md:w-2/5">
              <Image
                src={imageUrl}
                alt={imageAlt}
                {...imageDimensions}
                fetchPriority="high"
                loading="eager"
                className={`relative z-20 max-h-full max-w-full object-contain`}
              />
              {/* Full-width background overlay */}
              <div
                className="absolute right-[-100vw] -bottom-2 left-[-100vw] z-10 mx-auto h-16 md:-bottom-4 md:h-32"
                style={{
                  backgroundColor:
                    product.details?.color || "#FFF", // fallback to white if no color is specified
                }}
              />
            </div>

            {/* Product Info Column */}
            <div className="z-10 mt-4 flex w-full flex-col items-start gap-6 md:mt-0 md:w-4/5">
              <div className="w-full border-b-2 text-xs uppercase md:text-sm">
                {product.details?.type}
              </div>
              <h1>{product.name}</h1>
              <div className="flex w-full items-center gap-4">
                <span className="text-2xl md:text-3xl">
                  {formatCurrency(product.price)}
                </span>
                <div className="flex w-full flex-wrap gap-2">
                  <AtcButtonDefault
                    product={product}
                    className="w-full"
                  />
                </div>
              </div>

              <p>{product.details.shortDesc}</p>

              {showBulkCallout && (
                <BulkDealCallout
                  product={product}
                  unitPrice={product.price}
                  tiers={bulkDiscountTiers}
                  className="w-full"
                />
              )}

              <div className="xsm:flex-row flex w-full flex-col gap-4 rounded-lg bg-white p-4 shadow-sm">
                <div className="flex w-full flex-col gap-4 md:w-2/3">
                  <ul className="space-y-2">
                    {/* Map over product features array */}
                    {/* List items with custom orange bullets */}
                    {product.details.bulletPoints.map(
                      (feature, index) => (
                        <li
                          key={index}
                          className="flex items-start"
                        >
                          <div className="bg-primary mt-1.5 mr-3 h-3 w-3 shrink-0 rounded-full"></div>
                          <span>{feature}</span>
                        </li>
                      ),
                    )}
                  </ul>
                  <aside>
                    <p className="mt-auto text-xs italic">
                      {productConfig.warningText}
                    </p>
                  </aside>
                </div>
                <div className="xxsm:flex hidden w-full items-center justify-center md:w-1/3">
                  <Image
                    src={productConfig.bulletPointsIcon.src}
                    alt={productConfig.bulletPointsIcon.alt}
                    width={
                      productConfig.bulletPointsIcon.width
                    }
                    height={
                      productConfig.bulletPointsIcon.height
                    }
                    className="xxsm:block xxsm:w-40 hidden h-auto w-28 object-cover opacity-35"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Product Description */}
      <ProductDescription
        longDesc={product.details.longDesc}
        nicotineLabelWarningText={
          productConfig.nicotineLabelWarningText
        }
        specifications={product.specifications}
        ingredients={product.details.ingredients}
      />
      <SameBrandProductsPicker
        sameBrandProducts={sameBrandProducts}
        title={
          product.brand?.name
            ? `More from ${product.brand.name}`
            : productConfig.sameBrandProductsPicker.title
        }
        brandName={product.brand?.name}
        description={
          productConfig.sameBrandProductsPicker.description
        }
      />
      {relatedProducts?.length > 0 && (
        <section id="related-products">
          <div className="container">
            <h2 className="h2-product mb-8">
              You might also like
            </h2>

            <ul className="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
              {relatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </ul>
            <Button
              asChild
              variant="outline"
              className="group mt-6 px-4 py-6"
            >
              <Link
                prefetch={false}
                href={ROUTES.SHOP.CATEGORY(
                  product.category.slug,
                )}
              >
                View all products in {product.category.name}
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </section>
      )}
    </>
  );
}
