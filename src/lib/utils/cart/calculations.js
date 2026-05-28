// Utility functions for cart calculations

// Subtotal after discounts (if any)
const calcSubtotal = (cart) => {
  return (cart || []).reduce((total, item) => {
    const unit = item?.pricing?.discountedUnitPrice ?? item?.price ?? 0;
    return total + (item?.quantity ?? 0) * unit;
  }, 0);
};

// const calcTotal = (subtotal, shipping) => {
//   return subtotal + shipping;
// };

const calcVat = (cart, shippingCost = 0, shippingVatRate = 25) => {
  // Calculate VAT for cart items (use discounted unit price when available)
  const productVat = (cart || []).reduce((totalVat, item) => {
    const vatRate = (item?.vatRate ?? 25) / 100;

    const unitAmount = item?.pricing?.discountedUnitPrice ?? item?.price ?? 0;

    const quantity = item?.quantity ?? 0;
    const itemSubtotal = unitAmount * quantity;

    const itemVat = itemSubtotal - itemSubtotal / (1 + vatRate);
    return totalVat + itemVat;
  }, 0);

  // Shipping VAT (if shippingCost includes VAT)
  const shippingVat = shippingCost - shippingCost / (1 + shippingVatRate / 100);

  return productVat + shippingVat;
};

export { calcSubtotal, calcTotal, calcVat };
