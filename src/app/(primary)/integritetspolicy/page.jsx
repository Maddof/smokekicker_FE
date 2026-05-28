import { SITE_NAME } from "@/config/metadata";
import { ROUTES } from "@/config/routes";
import { buildCmsPageMetadata } from "@/lib/cms/pageMetadata";
import { privacySectionComponents } from "./sectionsPrivacyPage";
import { getOrderedSections } from "@/lib/cms/getSection";
import { getPageByKey } from "@/lib/cms/getPage";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://smokify.se";

async function getPrivacyPolicyPage() {
  const page = await getPageByKey("privacy-policy");
  return page;
}

export async function generateMetadata() {
  const page = await getPrivacyPolicyPage();

  return buildCmsPageMetadata({
    page,
    fallbackTitle: `Integritetspolicy | ${SITE_NAME}`,
    fallbackDescription:
      "Läs hur Smokify behandlar, lagrar och skyddar dina personuppgifter enligt GDPR.",
    defaultPath: ROUTES.PRIVACY,
  });
}

export default async function PrivacyPolicyPage() {
  const page = await getPrivacyPolicyPage();

  const orderedSections = getOrderedSections(page);

  const breadcrumbJsonLd = {
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
        name: "Integritetspolicy",
        item: `${SITE_URL}${ROUTES.PRIVACY}`,
      },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Dynamically render sections in CMS-defined order */}
      {orderedSections.map((section) => {
        const SectionComponent = privacySectionComponents[section.key];

        if (!SectionComponent) {
          return null;
        }
        // For simplicity, render all sections with the same layout; can be extended to use different components based on section.key
        return (
          <SectionComponent key={section.id || section.key} section={section} />
        );
      })}
    </>
  );
}
