export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/mina-sidor/",
        "/bankidauth/",
        "/login/",
        "/api/",
        "/kundvagn/",
        "/kundvagn/kassa/",
        "/sok?query=*",
      ],
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  };
}
