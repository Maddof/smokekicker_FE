import { SITE_NAME } from "@/config/metadata";
import { ROUTES } from "@/config/routes";
import { buildCmsPageMetadata } from "@/lib/cms/pageMetadata";
import { privacySectionComponents } from "./sectionsPrivacyPage";
import { getOrderedSections } from "@/lib/cms/getSection";
import { getPageByKey } from "@/lib/cms/getPage";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://smokekicker.com";

async function getPrivacyPolicyPage() {
  const page = await getPageByKey("privacy-policy");
  return page;
}

export async function generateMetadata() {
  const page = await getPrivacyPolicyPage();

  return buildCmsPageMetadata({
    page,
    fallbackTitle: `Privacy Policy | ${SITE_NAME}`,
    fallbackDescription:
      "Read how Smokekicker handles, stores, and protects your personal data in accordance with GDPR.",
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
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Privacy Policy",
        item: `${SITE_URL}${ROUTES.PRIVACY}`,
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
          privacySectionComponents[section.key];

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
