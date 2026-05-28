"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useCart } from "@/app/context/CartContext";
import { Button } from "../ui/scn/button";

// Singleton loadStripe instance
// stripePromise is defined outside the component to
// ensure it's only initialized once during the app lifecycle
// Inside handleCheckout, the stripePromise is reused rather than
// reinitializing Stripe on every render or interaction.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const FREE_KIT_CATEGORY_ID =
  parseInt(process.env.NEXT_PUBLIC_FREE_KIT_CATEGORY_ID) || 6;

const CheckoutButton = () => {
  const { loading, cart, containsOnlyFreeStarterKits } = useCart(); // Access the cart from context

  // Check if cart only contains free kits

  console.log(cart);
  const buttonLabel = containsOnlyFreeStarterKits
    ? "Vänligen välj en produkt"
    : "Till Kassan";

  const handleCheckout = async () => {
    try {
      // Call the API route to create a Stripe Checkout session
      const response = await fetch("/api/checkout-sessions/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if response is not OK
      if (!response.ok) {
        const data = await response.json();

        // Extract the error message from the response
        const errorMessage = data.error || "Failed to create checkout session.";
        console.error("Server error:", errorMessage);

        // You could also show this error to the user with a toast notification
        // toast.error(errorMessage);

        throw new Error(errorMessage);
      }

      // if (!response.ok) throw new Error("Failed to create checkout session.");

      const { sessionId } = await response.json();

      // Redirect to Stripe Checkout
      const stripe = await stripePromise; // Reuse the singleton instance
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      console.error("Error redirecting to Stripe Checkout:", error.message);
    }
  };

  return (
    <Button
      // On click, redirect to /cart/checkout
      onClick={handleCheckout}
      className={`mt-4 block w-full font-semibold tracking-wide uppercase ${
        loading ? "pointer-events-none" : ""
      }`}
      disabled={loading || containsOnlyFreeStarterKits}
      // disabled={cart.length === 0}
    >
      {buttonLabel}
    </Button>
  );
};

export default CheckoutButton;
