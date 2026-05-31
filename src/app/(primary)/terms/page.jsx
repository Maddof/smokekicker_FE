import { SITE_NAME } from "@/config/metadata";
import { ROUTES } from "@/config/routes";
import { getPageByKey } from "@/lib/cms/getPage";
import { getOrderedSections } from "@/lib/cms/getSection";
import { buildCmsPageMetadata } from "@/lib/cms/pageMetadata";
import { termsSectionComponents } from "./sectionsTermsPage";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://smokekicker.com";

async function getTermsPage() {
  const page = await getPageByKey("terms");
  return page;
}

export async function generateMetadata() {
  const page = await getTermsPage();

  return buildCmsPageMetadata({
    page,
    fallbackTitle: `Terms and Conditions | ${SITE_NAME}`,
    fallbackDescription:
      "Read our terms and conditions to understand our rules regarding purchases, delivery, returns, and the right of withdrawal.",
    defaultPath: ROUTES.TERMS,
  });
}

export default async function TermsAndConditionsPage() {
  const page = await getTermsPage();

  const orderedSections = getOrderedSections(page);

  const breadcrumbJsonLd = {
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
        name: "Terms and Conditions",
        item: `${SITE_URL}${ROUTES.TERMS}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      {/* Dynamically render sections in CMS-defined order */}
      {orderedSections.map((section) => {
        const SectionComponent =
          termsSectionComponents[section.key];

        if (!SectionComponent) {
          return null;
        }
        // For simplicity, render all sections with the same layout; can be extended to use different components based on section.key
        return (
          <SectionComponent
            key={section.id || section.key}
            section={section}
          />
        );
      })}
    </>
  );
}
