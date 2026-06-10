import { SITE_NAME } from "@/config/metadata";
import { ROUTES } from "@/config/routes";
import { buildCmsPageMetadata } from "@/lib/cms/pageMetadata";
import { cookiePolicySectionComponents } from "./sectionsCookiepolicyPage";
import { getOrderedSections } from "@/lib/cms/getSection";
import { getPageByKey } from "@/lib/cms/getPage";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://smokekicker.com";

async function getCookiePolicyPage() {
  const page = await getPageByKey("cookie-policy");
  return page;
}

export async function generateMetadata() {
  const page = await getCookiePolicyPage();

  return buildCmsPageMetadata({
    page,
    fallbackTitle: `Cookie Policy | ${SITE_NAME}`,
    fallbackDescription:
      "Learn how cookies are used to improve your browsing experience, shopping experience, analyze website performance, and provide essential site functionality.",
    defaultPath: ROUTES.COOKIE_POLICY,
  });
}

export default async function CookiePolicyPage() {
  const page = await getCookiePolicyPage();

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
        name: "Cookie Policy",
        item: `${SITE_URL}${ROUTES.COOKIE_POLICY}`,
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
          cookiePolicySectionComponents[section.key];

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
