// Utility function to get field value from a page's sections
function getFieldValue(page, sectionKey, fieldKey) {
  return page.sections
    .find((section) => section.key === sectionKey)
    ?.fields.find((field) => field.key === fieldKey)?.value;
}

export default getFieldValue;
