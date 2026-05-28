// lib/utils/currencyFormatter.js

export const formatCurrency = (valueInCents) => {
  const formatter = new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
    minimumFractionDigits: 0,
  });

  // Convert value from cents (öre) to whole SEK
  const valueInSEK = valueInCents / 100;
  const formattedValue = formatter.format(valueInSEK);
  // Remove the space before the currency symbol
  // This is necessary because the Swedish locale adds a space before "kr"
  // Remove the non-breaking space before the currency symbol
  // Unicode character \u00A0 represents a non-breaking space

  // const formattedValueWithoutSpace = formattedValue.replace(/\u00A0kr$/, "kr");

  return formattedValue;
};
