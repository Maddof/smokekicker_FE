import Stripe from "stripe";

/* This ensures that only one instance of Stripe 
is ever created and reused throughout the app */

let stripeInstance;

const getStripeInstance = () => {
  if (!stripeInstance) {
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripeInstance;
};

export default getStripeInstance;
