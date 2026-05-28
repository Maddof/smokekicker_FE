import { notFound } from "next/navigation";
import { fetchAllBrands } from "@/lib/data/api/fetchBrands";
import BrandFilterWrapper from "@/components/filter/BrandFilterWrapper";
import { ReadMore } from "@/components/ReadMore";
import { ROUTES } from "@/config/routes";
import { getPageByKey } from "@/lib/cms/getPage";
import getFieldValue from "@/lib/cms/getFieldValue";
import { buildCmsPageMetadata } from "@/lib/cms/pageMetadata";
import { SITE_NAME } from "@/config/metadata";

export const revalidate = 86400; // Revalidate every 24 hours

async function getBrandsPage() {
  const page = await getPageByKey("brands");
  return page;
}

export async function generateMetadata() {
  const page = await getBrandsPage();

  return buildCmsPageMetadata({
    page,
    fallbackTitle: `Alla varumärken | ${SITE_NAME}`,
    fallbackDescription:
      "Upptäck noga utvalda varumärken inom vapes, e-juicer och produkter för rökstopp. Kvalitet och smak i fokus.",
    defaultPath: ROUTES.BRANDS.INDEX,
  });
}
export default async function BrandsPage() {
  const page = await getBrandsPage();

  // Get the description paragraphs for the hero section
  const paragraphs =
    getFieldValue(page, "hero", "description")?.split(
      "\n",
    ) || [];

  // Fetch all brands
  const brands = await fetchAllBrands();

  // Handle missing data
  if (!brands) {
    return notFound();
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://smokify.se";

  // Generate JSON-LD for breadcrumbs
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Hem",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Varumärken",
        item: `${siteUrl}${ROUTES.BRANDS.INDEX}`,
      },
    ],
  };

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <div className="container">
        <div className="mb-6">
          <h1 className="mb-2">
            {getFieldValue(page, "hero", "headline") ||
              "Alla varumärken"}
          </h1>
          <ReadMore initialParagraphs={2}>
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-muted"
                dangerouslySetInnerHTML={{
                  __html: paragraph.replace(
                    /^<p>|<\/p>$/g,
                    "",
                  ),
                }}
              />
            ))}
          </ReadMore>
        </div>

        <BrandFilterWrapper initialBrands={brands} />
      </div>
    </section>
  );
}
