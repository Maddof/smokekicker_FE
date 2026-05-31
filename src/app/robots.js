export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard/",
        "/bankidauth/",
        "/login/",
        "/api/",
        "/cart/",
        "/cart/checkout/",
        "/search?query=*",
      ],
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  };
}
