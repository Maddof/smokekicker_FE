/**
 * Application routes configuration
 * Define all routes here to maintain them in a single location
 */
export const ROUTES = {
  // Homepage
  HOME: "/",

  // Shop related
  SHOP: {
    INDEX: "/products",
    CATEGORY: (slug) => `/products/${slug}`,
    PRODUCT: (categorySlug, brandSlug, productSlug) =>
      `/products/${categorySlug}/${brandSlug}/${productSlug}`,
  },

  // Brand related
  BRANDS: {
    INDEX: "/brands",
    DETAIL: (brandSlug) => `/brands/${brandSlug}`,
  },

  // Blog related
  BLOG: {
    INDEX: "/blog",
    CATEGORY: (slug) => `/blog/${slug}`,
    POST: (categorySlug, postSlug) =>
      `/blog/${categorySlug}/${postSlug}`,
  },

  CART: "/cart",
  CHECKOUT: "/cart/checkout",

  ABOUT: "/about",
  PERSONALITY: "/ai-taste-tester",
  CONTACT: "/contact",
  COOKIE_POLICY: "/cookiepolicy",
  HELP: "/help",
  TERMS: "/terms",
  PRIVACY: "/privacypolicy",
  SHIPPING: "/shipping",
  RETURNS: "/returns",
  FAQ: "/faq",
  ADULTS_ONLY: "/adults-only",

  // Auth related
  AUTH: {
    BANKID: "/login",
    SUCCESS: "/login/success",
    FAILED: "/login/failed",
  },

  // Dashboard related
  DASHBOARD: {
    INDEX: "/dashboard",
    PROFILE: "/dashboard/account",
    PERKS: "/dashboard/perks",
    ORDERS: {
      INDEX: "/dashboard/orders",
      ALL: "/dashboard/orders/all",
      DETAIL: (id) => `/dashboard/orders/${id}`,
    },
  },
};
