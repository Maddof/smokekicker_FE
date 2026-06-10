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
    fallbackTitle: `Smokekicker | Buy Nicotine Pouches Online Worldwide | Fast EU Shipping`,
    fallbackDescription:
      "Discover premium nicotine pouches at Smokekicker. Fast worldwide shipping, modern flavors, and smoke-free nicotine products for every lifestyle.",
    defaultPath: ROUTES.HOME,
  });
}

export default async function Home() {
  const page = await getHomePage();

  if (!page) {
    return (
      <div className="container py-16">
        <h1 className="text-3xl font-bold">
          Welcome to {SITE_NAME}
        </h1>
        <p className="text-muted-foreground mt-4">
          Unfortunately, we couldn't load the content for
          this page at the moment. Please try again later.
        </p>
      </div>
    );
  }

  const orderedSections = getOrderedSections(page);

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://smokekicker.com";
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
    inLanguage: "en",
    publisher: {
      "@id": `${siteUrl}#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/search?q={search_term_string}`,
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
      url: `${siteUrl}/smokekicker_logo.svg`,
    },
    sameAs: [
      "https://www.facebook.com/smokekicker",
      "https://www.instagram.com/smokekicker",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      areaServed: "Worldwide",
      availableLanguage: ["en"],
      email: "support@smokekicker.com",
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
