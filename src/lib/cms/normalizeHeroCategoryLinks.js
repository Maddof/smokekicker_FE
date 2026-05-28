import { resolveCmsIcon } from "./resolveCmsIcon";

function isValidRelativeHref(href) {
  return (
    typeof href === "string" && href.startsWith("/") && !href.startsWith("//")
  );
}

function normalizeCategoryLinksInput(categoryQuickLinks) {
  if (Array.isArray(categoryQuickLinks)) {
    return categoryQuickLinks;
  }

  if (typeof categoryQuickLinks !== "string") {
    return [];
  }

  try {
    const parsedLinks = JSON.parse(categoryQuickLinks);
    return Array.isArray(parsedLinks) ? parsedLinks : [];
  } catch {
    return [];
  }
}

export function resolveHeroCategoryLinkIcon(iconName) {
  return resolveCmsIcon(iconName);
}

export function normalizeHeroCategoryLinks(categoryQuickLinks) {
  return normalizeCategoryLinksInput(categoryQuickLinks)
    .map((link) => {
      const href = typeof link?.href === "string" ? link.href.trim() : "";
      const label = typeof link?.label === "string" ? link.label.trim() : "";

      if (!isValidRelativeHref(href) || !label) {
        return null;
      }

      return {
        href,
        label,
        icon: resolveHeroCategoryLinkIcon(link?.icon),
      };
    })
    .filter(Boolean);
}
