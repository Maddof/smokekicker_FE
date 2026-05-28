// /**
//  * Rebuilds and validates the cart items by fetching product data from the backend.
//  *
//  * @param {Array} cart - The cart data sent from the frontend.
//  * @returns {Promise<Array>} - An array of validated line items for Stripe Checkout.
//  * @throws {Error} - If a product in the cart is invalid or not found.
//  * (Future improvement: LOGIC CHECK IF requested quantity exceeds available stock in DB)
//  */

// export const formatRegularProducts = async (cart) => {
//   if (!cart || cartItems.length === 0) {
//     throw new Error("Cart is empty.");
//   }

//   const lineItems = cart.map((item) => {
//     // Validate and return the Stripe line item
//     return {
//       price_data: {
//         currency: "SEK",
//         product_data: { name: item.name },
//         unit_amount: item.price, // Ensure this is in cents (öre)
//       },
//       quantity: item.quantity,
//     };
//   });

//   return lineItems;
// };

// export const formatSubscriptionProducts = async (cart) => {
//   if (!cart || cartItems.length === 0) {
//     throw new Error("No subscription items in the cart.");
//   }

//   const lineItems = cart.map((item) => {
//     // Build the line item with recurring pricing details
//     return {
//       price_data: {
//         currency: "SEK",
//         product: item.stripeProdId,
//         // product_data: { name: item.name },
//         recurring: {
//           interval: item.billingCycle,
//           interval_count: item.intervalCount,
//         },
//         unit_amount: item.price, // Ensure this is in cents/öre
//       },
//       quantity: item.quantity,
//     };
//   });

//   return lineItems;
// };
