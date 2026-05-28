/**
 * Application routes configuration
 * Define all routes here to maintain them in a single location
 */
export const ROUTES = {
  // Homepage
  HOME: "/",

  // Shop related
  SHOP: {
    INDEX: "/produkter",
    CATEGORY: (slug) => `/produkter/${slug}`,
    PRODUCT: (categorySlug, brandSlug, productSlug) =>
      `/produkter/${categorySlug}/${brandSlug}/${productSlug}`,
    SUBSCRIPTIONS: "/produkter/prenumerationer",
    SUBSCRIPTION: (subSlug) => `/produkter/prenumerationer/${subSlug}`,
  },

  // Brand related
  BRANDS: {
    INDEX: "/varumarken",
    DETAIL: (brandSlug) => `/varumarken/${brandSlug}`,
  },

  // Blog related
  BLOG: {
    INDEX: "/blogg",
    CATEGORY: (slug) => `/blogg/${slug}`,
    POST: (categorySlug, postSlug) => `/blogg/${categorySlug}/${postSlug}`,
  },

  CART: "/kundvagn",
  CHECKOUT: "/kundvagn/kassa",

  HELP: "/help",
  ABOUT: "/om-oss",
  CONTACT: "/kontakt",
  TERMS: "/villkor",
  PRIVACY: "/integritetspolicy",
  COOKIE_POLICY: "/cookiepolicy",
  SHIPPING: "/frakt-och-leveranstid",
  RETURNS: "/returer",
  FAQ: "/faq",
  PERSONALITY: "/smak-personlighet",

  // Auth related
  AUTH: {
    BANKID: "/login",
    SUCCESS: "/login/success",
    FAILED: "/login/failed",
  },

  // Dashboard related
  DASHBOARD: {
    INDEX: "/mina-sidor",
    PROFILE: "/mina-sidor/konto",
    PERKS: "/mina-sidor/reservdelar",
    ORDERS: {
      INDEX: "/mina-sidor/bestallningar",
      ALL: "/mina-sidor/bestallningar/alla",
      DETAIL: (id) => `/mina-sidor/bestallningar/${id}`,
    },
    SUBSCRIPTIONS: {
      ACTIVE: "/mina-sidor/prenumerationer",
      ALL: "/mina-sidor/prenumerationer/alla",
      DETAIL: (id) => `/mina-sidor/prenumerationer/${id}`,
    },
  },
};
