/**
 * Given a subscription object, returns an array of default selected items.
 * Each item includes the productId, price, and quantity.
 *
 * @param {Object} subscription - The subscription object.
 * @returns {Array} Array of selected items.
 */
export function getDefaultSelectedItems(subscription) {
  return subscription.items
    ? subscription.items.map((item) => ({
        productId: item.productId,
        price: item.product.price,
        quantity: item.quantity,
        stock: item.product.stock,
      }))
    : [];
}
