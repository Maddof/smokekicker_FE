import { SITE_NAME } from "@/config/metadata";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://smokekicker.com";

export function buildCmsPageMetadata({
  page,
  fallbackTitle,
  fallbackDescription,
  defaultPath,
}) {
  if (!page) {
    return {
      title: fallbackTitle,
      description: fallbackDescription,
    };
  }

  const title =
    page.seo?.metaTitle || page.title || fallbackTitle;
  const description =
    page.seo?.metaDescription || fallbackDescription;
  const canonicalUrl =
    page.seo?.canonicalUrl ||
    `${SITE_URL}${page.path || defaultPath}`;
  const noIndex = Boolean(page.seo?.noIndex);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      images: [
        {
          url:
            page.seo?.ogImage ||
            `${SITE_URL}/opengraph-image.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/opengraph-image.jpg`],
    },
  };
}
