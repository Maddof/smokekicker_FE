export function formatDate(date, locale = "sv-SE", options = {}) {
  if (!date) return "Invalid date"; // Handle invalid or missing dates

  const defaultOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };

  // Merge default options with user-provided options
  const formatOptions = { ...defaultOptions, ...options };

  try {
    const formatter = new Intl.DateTimeFormat(locale, formatOptions);
    return formatter.format(new Date(date));
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
}
