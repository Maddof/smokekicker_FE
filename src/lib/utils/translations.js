const translateOrderStatus = (status) => {
  const statusTranslations = {
    PENDING: "Initierad",
    PROCESSING: "Behandlas",
    COMPLETED: "Slutförd",
    CANCELED: "Avbruten",
    REFUNDED: "Återbetald",
    PARTIALLY_REFUNDED: "Delvis återbetald",
  };

  return statusTranslations[status] || status; // Fallback to the original status if no translation exists
};

export { translateOrderStatus };
