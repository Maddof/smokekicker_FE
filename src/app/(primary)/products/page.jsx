import Image from "next/image";
import { fetchAllPublishedProducts } from "@/lib/data/api/fetchProducts";
import { Button } from "@/components/ui/scn/button";
import CategoryHeader from "@/components/shop/CategorySeparatorHeader";
import ProductGridLoadMore from "@/components/shop/ProductGridLoadMore";
import ShopHeader from "@/components/shop/ShopHeader";
import ShopHeaderBelow from "@/components/shop/ShopHeaderBelow";
import { categoryContent } from "@/lib/data/categoryContent";
import CategoryPicker from "@/components/shop/CategoryPicker";
import { ROUTES } from "@/config/routes";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils/getUrl";
import { getPageByKey } from "@/lib/cms/getPage";
import { buildCmsPageMetadata } from "@/lib/cms/pageMetadata";

export const revalidate = 86400; // Revalidate this page every 24 hours

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://smokekicker.com";

const fallBackImage = "/images/fallback.png";

async function getProductPage() {
  const page = await getPageByKey("products");
  return page;
}

export async function generateMetadata() {
  const page = await getProductPage();

  return buildCmsPageMetadata({
    page,
    fallbackTitle: `Buy Nicotine Pouches Online | Worldwide & EU Shipping`,
    fallbackDescription:
      "Shop nicotine pouches online at Smokekicker. Explore top brands, strong flavors, and fast worldwide delivery on tobacco-free nicotine products.",
    defaultPath: ROUTES.SHOP.INDEX,
  });
}

export default async function ShopPage() {
  const productsPublished =
    await fetchAllPublishedProducts();
  if (!productsPublished) {
    return (
      <section>
        <div className="container">No products found!</div>
      </section>
    );
  }

  console.log("Fetched products:", productsPublished);

  const headerConfig = categoryContent["default"];

  // Get below hero content or use default
  const belowHeroConfig = headerConfig.belowHero;

  // Filter products by category
  const nicotinepouches = productsPublished.filter(
    (product) =>
      product.category.slug === "nicotine-pouches",
  );
  const nicotineFreePouches = productsPublished.filter(
    (product) =>
      product.category.slug === "nicotine-free-pouches",
  );
  const energyPouches = productsPublished.filter(
    (product) => product.category.slug === "energy-pouches",
  );
  const candyProducts = productsPublished.filter(
    (product) => product.category.slug === "swedish-candy",
  );
  const accessories = productsPublished.filter(
    (product) => product.category.slug === "accessories",
  );

  const shopUrl = `${SITE_URL}${ROUTES.SHOP.INDEX}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": shopUrl,
      url: shopUrl,
      name: `Buy Nicotine Pouches Online | Worldwide & EU Shipping`,
      description:
        "Shop nicotine pouches online at Smokekicker. Explore top brands, strong flavors, and fast worldwide delivery on tobacco-free nicotine products.",
      inLanguage: "en",
      isPartOf: {
        "@id": `${SITE_URL}#website`,
      },
      publisher: {
        "@id": `${SITE_URL}#organization`,
      },
      mainEntity: {
        "@type": "ItemList",
        name: "All Products",
        numberOfItems: productsPublished.length,
        itemListElement: productsPublished.map(
          (product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Product",
              "@id": `${SITE_URL}${ROUTES.SHOP.PRODUCT(product.category?.slug, product.brand?.slug, product.slug)}#product`,
              url: `${SITE_URL}${ROUTES.SHOP.PRODUCT(product.category?.slug, product.brand?.slug, product.slug)}`,
              name: product.name,
              image: [
                getImageUrl(product.imgUrl) ||
                  fallBackImage,
              ],
              brand: product.brand
                ? {
                    "@type": "Brand",
                    name: product.brand.name,
                  }
                : undefined,
              offers: {
                "@type": "Offer",
                priceCurrency: product.currency ?? "EUR",
                price: (product.price / 100).toFixed(2),
                availability:
                  product.stock > 0
                    ? "https://schema.org/InStock"
                    : "https://schema.org/OutOfStock",
                url: `${SITE_URL}${ROUTES.SHOP.PRODUCT(product.category?.slug, product.brand?.slug, product.slug)}`,
              },
            },
          }),
        ),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Products",
          item: shopUrl,
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <ShopHeader
        title={headerConfig.title}
        description={headerConfig.description}
        showNavigationButtons={
          headerConfig.showNavigationButtons
        }
        backgroundImage={headerConfig.heroImage}
        backgroundAlt={headerConfig.heroImageAlt}
      />
      <ShopHeaderBelow
        title={belowHeroConfig.title}
        iconImgBg={belowHeroConfig.iconImgBg}
        inconImgBgAlt={belowHeroConfig.inconImgBgAlt}
        initialParagraphs={
          belowHeroConfig.initialParagraphs
        }
      >
        {belowHeroConfig.content}
      </ShopHeaderBelow>

      <CategoryPicker currentPath={ROUTES.SHOP.INDEX} />

      {/* Starter Kits Section */}
      {nicotinepouches.length > 0 && (
        <>
          <CategoryHeader
            title="Nicotine Pouches"
            description="Nicotine pouches in a variety of flavors and strengths."
            imageSrc="/images/icons/pouch_icon.svg"
            imageClassName="w-24 opacity-40 sm:w-32 invert brightness-200"
            imageAlt="Nicotine Pouch Icon"
            categoryHref={ROUTES.SHOP.CATEGORY(
              "nicotine-pouches",
            )}
          />

          <section>
            <div className="container">
              <ProductGridLoadMore
                products={nicotinepouches}
              />
            </div>
          </section>
        </>
      )}

      {/* Nicotine-Free Pouches Section */}
      {nicotineFreePouches.length > 0 && (
        <>
          <CategoryHeader
            title="Nicotine-Free Pouches"
            description="Nicotine-free pouches for a smooth and discreet experience without refilling. Swap pods, keep vaping."
            imageSrc="/images/icons/pouch_icon.svg"
            imageClassName="w-24 opacity-40 sm:w-32 invert brightness-200"
            imageAlt="Nicotine Pouch Icon"
            categoryHref={ROUTES.SHOP.CATEGORY(
              "nicotine-free-pouches",
            )}
          />

          <section>
            <div className="container">
              <ProductGridLoadMore
                products={nicotineFreePouches}
              />
            </div>
          </section>
        </>
      )}

      {/* Energy Pouches Section */}
      {energyPouches.length > 0 && (
        <>
          <CategoryHeader
            title="Energy Pouches"
            description="Energy pouches for a convenient and discreet energy boost."
            imageSrc="/images/icons/pouch_icon.svg"
            imageClassName="w-24 opacity-40 sm:w-32 invert brightness-200"
            imageAlt="Nicotine Pouch Icon"
            categoryHref={ROUTES.SHOP.CATEGORY(
              "energy-pouches",
            )}
          />

          <section>
            <div className="container">
              <ProductGridLoadMore
                products={energyPouches}
              />
            </div>
          </section>
        </>
      )}

      {/* Swedish Candy Products Section */}
      {candyProducts.length > 0 && (
        <>
          <CategoryHeader
            title="Swedish Candy"
            description="Discover our selection of Swedish candy, including popular brands and unique flavors that offer a sweet and satisfying treat for every palate."
            imageSrc="/images/icons/candy.svg"
            imageAlt="Candy and gum icons"
            imageClassName="w-24 opacity-40 sm:w-32 invert brightness-200"
            categoryHref={ROUTES.SHOP.CATEGORY("konfektyr")}
          />

          <section>
            <div className="container">
              <ProductGridLoadMore
                products={candyProducts}
              />
            </div>
          </section>
        </>
      )}

      {/* Accessories Section */}
      {accessories.length > 0 && (
        <>
          <CategoryHeader
            title="Accessories"
            description="Complement your nicotine pouch experience with practical accessories."
            imageSrc="/images/icons/accessory_icon_charger.svg"
            imageAlt="Accessories icons"
            categoryHref={ROUTES.SHOP.CATEGORY("tillbehor")}
          />

          <section>
            <div className="container">
              <ProductGridLoadMore products={accessories} />
            </div>
          </section>
        </>
      )}
    </>
  );
}
