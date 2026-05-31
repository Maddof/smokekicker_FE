// lib/utils/currencyFormatter.js

export const formatCurrency = (valueInCents) => {
  const formatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  });

  // Convert value from cents (öre) to whole EUR
  const valueInEUR = valueInCents / 100;
  const formattedValue = formatter.format(valueInEUR);

  return formattedValue;
};
