/**
 * Transforms a section object by resolving its fields into a flat object shape.
 * Converts the CMS field array { key, type, value } format into
 * a flattened object where { key: value } for easier component access.
 *
 * @param {Object} section - The section object from CMS with fields array
 * @returns {Object|null} Resolved section with fields flattened, or null if hidden or invalid
 */
function resolveSectionFields(section) {
  if (!section) return null;

  // Skip sections explicitly hidden in CMS
  if (section.isVisible === false) return null;

  // Transform fields array [{ key, value }, ...] into { key: value }
  const fields = Object.fromEntries(
    (section.fields || []).map((f) => [f.key, f.value]),
  );

  // Merge resolved fields onto section object for component access
  return { ...section, ...fields };
}

/**
 * Looks up a section by key within a page object and resolves its fields.
 * Used for name-based section retrieval (e.g., "hero", "coreValues").
 *
 * @param {Object} page - The page object from CMS with sections array
 * @param {String} sectionKey - The key identifier of the section to find
 * @returns {Object|null} Resolved section object or null if not found or hidden
 */
export function getSection(page, sectionKey) {
  if (!page || !page.sections) {
    console.error("Invalid page object provided to getSection");
    return null;
  }

  const section = page.sections.find((sec) => sec.key === sectionKey);
  if (!section) {
    console.error(
      `Section with key ${sectionKey} not found on page ${page.key}`,
    );
    return null;
  }

  return resolveSectionFields(section);
}

/**
 * Resolves fields on an already-identified section object (O(1) operation).
 * Preferred when iterating over sections to avoid redundant lookups.
 *
 * @param {Object} section - Section object (already filtered/sorted from page.sections)
 * @returns {Object|null} Resolved section with fields flattened
 */
export function resolveSectionFieldsDirectly(section) {
  return resolveSectionFields(section);
}

/**
 * Returns visible page sections in CMS-defined order with fields flattened.
 *
 * @param {Object|null|undefined} page - The page object from CMS with sections array
 * @returns {Object[]} Resolved sections ready for component rendering
 */
export function getOrderedSections(page) {
  return (page?.sections || [])
    .filter((section) => section?.isVisible !== false)
    .sort((left, right) => {
      const leftOrder = Number.isFinite(left?.sortOrder)
        ? left.sortOrder
        : Number.MAX_SAFE_INTEGER;
      const rightOrder = Number.isFinite(right?.sortOrder)
        ? right.sortOrder
        : Number.MAX_SAFE_INTEGER;

      return leftOrder - rightOrder;
    })
    .map((section) => resolveSectionFieldsDirectly(section))
    .filter(Boolean);
}
