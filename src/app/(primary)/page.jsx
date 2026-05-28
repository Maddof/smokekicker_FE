import { SITE_NAME } from "@/config/metadata";
import { fetchLatestPublishedBlogPosts } from "@/lib/data/api/fetchBlog";
import { getPageByKey } from "@/lib/cms/getPage";
import { getOrderedSections } from "@/lib/cms/getSection";
import { homeSectionComponents } from "./sectionsHomePage";
import { buildCmsPageMetadata } from "@/lib/cms/pageMetadata";
import { ROUTES } from "@/config/routes";

export const revalidate = 43200; // Revalidate every 12 hours

async function getHomePage() {
  return getPageByKey("homepage");
}

export async function generateMetadata() {
  const page = await getHomePage();

  return buildCmsPageMetadata({
    page,
    fallbackTitle: `Smokify - Vape och vitt snus med omtanke`,
    fallbackDescription:
      "Vapes, förfyllda pods, e-cigaretter, vitt snus, smarta prenumerationer och nikotinersättning. Din väg till en rökfri vardag börjar här.",
    defaultPath: ROUTES.HOME,
  });
}

export default async function Home() {
  const page = await getHomePage();

  if (!page) {
    return (
      <div className="container py-16">
        <h1 className="text-3xl font-bold">
          Välkommen till {SITE_NAME}
        </h1>
        <p className="text-muted-foreground mt-4">
          Tyvärr kunde vi inte ladda innehållet för den här
          sidan just nu. Vänligen försök igen senare.
        </p>
      </div>
    );
  }

  const orderedSections = getOrderedSections(page);

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://smokify.se";
  const homepageFaqSection = orderedSections.find(
    (section) => section.key === "faqHome",
  );
  const homepageFaqItems = [
    ...(homepageFaqSection?.faqItems ?? []),
  ]
    .filter((item) => item?.isVisible)
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const latestBlogPostsSection = orderedSections.find(
    (section) => section.key === "latestBlogPosts",
  );
  const latestPostsLimit =
    latestBlogPostsSection?.config?.postsLimit || 3;

  const { posts: latestBlogPosts } = latestBlogPostsSection
    ? await fetchLatestPublishedBlogPosts({
        limit: latestPostsLimit,
      })
    : { posts: [] };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}#website`,
    url: siteUrl,
    name: SITE_NAME,
    inLanguage: "sv-SE",
    publisher: {
      "@id": `${siteUrl}#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/sok?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}#organization`,
    name: SITE_NAME,
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/smokify_logo_orange.svg`,
    },
    sameAs: [
      "https://www.facebook.com/smokifyshop",
      "https://www.instagram.com/smokify_shop",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      areaServed: "SE",
      availableLanguage: ["sv-SE", "sv"],
      email: "support@smokify.se",
      contactType: "customer support",
    },
  };

  const faqPageJsonLd =
    homepageFaqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: homepageFaqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
      />
      {faqPageJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqPageJsonLd),
          }}
        />
      )}

      {/* Dynamically render sections in CMS-defined order */}
      {orderedSections.map((section) => {
        const SectionComponent =
          homeSectionComponents[section.key];

        if (!SectionComponent) {
          return null;
        }

        // Render the component with resolved section data
        return (
          <SectionComponent
            key={section.id || section.key}
            section={section}
            posts={
              section.key === "latestBlogPosts"
                ? latestBlogPosts
                : undefined
            }
          />
        );
      })}
    </>
  );
}
