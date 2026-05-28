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
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://smokify.se";

const fallBackImage = "/images/fallback.png";

async function getProductPage() {
  const page = await getPageByKey("products");
  return page;
}

export async function generateMetadata() {
  const page = await getProductPage();

  return buildCmsPageMetadata({
    page,
    fallbackTitle: `Vape, Startkit, E-juice, Vitt Snus & Nikotinprodukter Online`,
    fallbackDescription:
      "Köp hållbara vape-startkit, förfyllda pods, vitt snus och nikotinfritt tuggummi. Snabb leverans, prenumerationer och ett noga kurerat sortiment för moderna nikotinkonsumenter.",
    defaultPath: ROUTES.SHOP.INDEX,
  });
}

export default async function ShopPage() {
  const productsPublished =
    await fetchAllPublishedProducts();
  if (!productsPublished) {
    return (
      <section>
        <div className="container">
          Produkter hittades inte!
        </div>
      </section>
    );
  }
  const headerConfig = categoryContent["default"];

  // Get below hero content or use default
  const belowHeroConfig = headerConfig.belowHero;

  // Filter products by category
  const prefilledPodStarterKits = productsPublished.filter(
    (product) =>
      product.category.slug ===
      "start-kit-forfyllda-podsystem",
  );
  const vapePodStarterKits = productsPublished.filter(
    (product) => product.category.slug === "start-kit-vape",
  );
  const filledPods = productsPublished.filter(
    (product) =>
      product.category.slug === "forfyllda-poddar",
  );
  const eJuiceProducts = productsPublished.filter(
    (product) => product.category.slug === "e-juice",
  );
  const candyProducts = productsPublished.filter(
    (product) => product.category.slug === "konfektyr",
  );
  const accessories = productsPublished.filter(
    (product) => product.category.slug === "tillbehor",
  );
  const whiteSnus = productsPublished.filter(
    (product) => product.category.slug === "vitt-snus",
  );
  const nicotineAlternatives = productsPublished.filter(
    (product) =>
      product.category.slug === "nikotinavvanjning",
  );

  const shopUrl = `${SITE_URL}${ROUTES.SHOP.INDEX}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": shopUrl,
      url: shopUrl,
      name: `Vapes, startkit, e-juice, vitt snus och nikotinprodukter`,
      description:
        "Köp hållbara vape-startkit, förfyllda pods, vitt snus och nikotinfritt tuggummi. Snabb leverans, prenumerationer och ett noga kurerat sortiment för moderna nikotinkonsumenter.",
      inLanguage: "sv-SE",
      isPartOf: {
        "@id": `${SITE_URL}#website`,
      },
      publisher: {
        "@id": `${SITE_URL}#organization`,
      },
      mainEntity: {
        "@type": "ItemList",
        name: "Alla produkter",
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
                priceCurrency: product.currency ?? "SEK",
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
          name: "Hem",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Produkter",
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
      {prefilledPodStarterKits.length > 0 && (
        <>
          <CategoryHeader
            title="Start-Kit Förfyllda Podsystem"
            description="Ett miljövänligare, enkelt och ekonomiskt alternativ mot engångsvapes. Kompletta startpaket med batteri och förfyllda pods."
            imageSrc="/images/icons/vape_pod-startkit_icon.svg"
            imageAlt="Starter Kit Icons"
            categoryHref={ROUTES.SHOP.CATEGORY(
              "start-kit-forfyllda-podsystem",
            )}
          />

          <section>
            <div className="container">
              <ProductGridLoadMore
                products={prefilledPodStarterKits}
              />
            </div>
          </section>
        </>
      )}

      {/* Vape Starter Kits Section */}
      {vapePodStarterKits.length > 0 && (
        <>
          <CategoryHeader
            title="Start-Kit Vape Podsystem"
            description="Startkit med allt du behöver för att börja vejpa – batterienhet, laddare och pods. Med dessa fyller du på den tomma podden med e-vätska."
            imageSrc="/images/icons/vape_pod-startkit_icon.svg"
            imageAlt="Starter Kit Icons"
            categoryHref={ROUTES.SHOP.CATEGORY(
              "start-kit-vape",
            )}
          />

          <section>
            <div className="container">
              <ProductGridLoadMore
                products={vapePodStarterKits}
              />
            </div>
          </section>
        </>
      )}

      {/* Filled Pods Section */}
      {filledPods.length > 0 && (
        <>
          <CategoryHeader
            title="Förfyllda Poddar"
            description="Förfyllda pods ger dig en smidig och diskret vapingupplevelse utan påfyllning. Byt pod, fortsätt vejpa."
            imageSrc="/images/icons/vape_prefilled-pods_icons.svg"
            imageAlt="Prefilled pods icons"
            categoryHref={ROUTES.SHOP.CATEGORY(
              "forfyllda-poddar",
            )}
          />

          <section>
            <div className="container">
              <ProductGridLoadMore products={filledPods} />
            </div>
          </section>
        </>
      )}

      {/* E-Juice Section */}
      {eJuiceProducts.length > 0 && (
        <>
          <CategoryHeader
            title="E-Juice"
            description="E-juice för påfyllningsbara podsystem, brett utbud av smaker."
            imageSrc="/images/icons/e-juice_icon.svg"
            imageAlt="E-juice icon"
            categoryHref={ROUTES.SHOP.CATEGORY("e-juice")}
          />

          <section>
            <div className="container">
              <ProductGridLoadMore
                products={eJuiceProducts}
              />
            </div>
          </section>
        </>
      )}

      {/* White Snus Section */}
      {whiteSnus.length > 0 && (
        <>
          <CategoryHeader
            title="Vitt Snus"
            description="Tobaksfritt alternativ som erbjuder en ren och fräsch smakupplevelse. Sortiementet fokuserar på lägre nikotinhalt och diskreta prillor såsom slim och mini portioner."
            imageSrc="/images/icons/pouch_icon.svg"
            imageAlt="White snus icon"
            imageClassName="w-24 opacity-20 sm:w-32 invert brightness-200"
            categoryHref={ROUTES.SHOP.CATEGORY("vitt-snus")}
          />

          <section>
            <div className="container">
              <ProductGridLoadMore products={whiteSnus} />
            </div>
          </section>
        </>
      )}

      {/* Nicotine Alternatives Section */}
      {nicotineAlternatives.length > 0 && (
        <>
          <CategoryHeader
            title="Nikotinavvänjning"
            description="Utforska våra nikotinalternativ som hjälper dig att hantera ditt nikotinbehov på ett flexibelt och kontrollerat sätt."
            imageSrc="/images/icons/nicotine.svg"
            imageAlt="Nicotine alternatives icon"
            categoryHref={ROUTES.SHOP.CATEGORY(
              "nikotinavvanjning",
            )}
          />

          <section>
            <div className="container">
              <ProductGridLoadMore
                products={nicotineAlternatives}
              />
            </div>
          </section>
        </>
      )}

      {/* Candy Products Section */}
      {candyProducts.length > 0 && (
        <>
          <CategoryHeader
            title="Tuggummi & Konfektyr"
            description="Hjälper med orala vanor och verkar stressreducerande genom distraktion. Helt nikotinfritt."
            imageSrc="/images/icons/candy.svg"
            imageAlt="Candy and gum icons"
            imageClassName="w-24 opacity-20 sm:w-32 invert brightness-200"
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
            title="Tillbehör"
            description="Komplettera din vape-upplevelse med praktiska tillbehör som laddare, fodral och andra användbara produkter."
            imageSrc="/images/icons/accessory_icon_charger.svg"
            imageAlt="Vape accessories icons"
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
