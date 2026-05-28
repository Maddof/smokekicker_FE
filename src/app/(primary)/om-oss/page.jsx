import { SITE_NAME } from "@/config/metadata";
import { ROUTES } from "@/config/routes";
import { getPageByKey } from "@/lib/cms/getPage";
import { getOrderedSections } from "@/lib/cms/getSection";
import { buildCmsPageMetadata } from "@/lib/cms/pageMetadata";
import { aboutSectionComponents } from "./sectionsAboutPage";

export const revalidate = 86400; // Revalidate this page every 24 hours

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://smokify.se";

async function getAboutPage() {
  return getPageByKey("about");
}

export async function generateMetadata() {
  const page = await getAboutPage();

  return buildCmsPageMetadata({
    page,
    fallbackTitle: `Om oss | ${SITE_NAME}`,
    fallbackDescription:
      "Lär känna Smokify - vi erbjuder smartare, tryggare och mer hållbara alternativ till tobak och nikotin.",
    defaultPath: ROUTES.ABOUT,
  });
}

export default async function AboutUsPage() {
  const page = await getAboutPage();

  if (!page) {
    return (
      <div className="container py-16">
        <h1 className="text-3xl font-bold">Om oss</h1>
        <p className="text-muted-foreground mt-4">
          Tyvärr kunde vi inte ladda innehållet för den här sidan just nu.
          Vänligen försök igen senare.
        </p>
      </div>
    );
  }

  const orderedSections = getOrderedSections(page);

  // Generate JSON-LD for breadcrumbs
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
        name: "Om oss",
        item: `${SITE_URL}${ROUTES.ABOUT}`,
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
        const SectionComponent = aboutSectionComponents[section.key];

        if (!SectionComponent) {
          return null;
        }

        // Render the component with resolved section data
        return (
          <SectionComponent key={section.id || section.key} section={section} />
        );
      })}
    </>
  );
}
