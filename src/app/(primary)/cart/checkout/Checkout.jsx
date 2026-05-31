"use client";
import { useState, useEffect, useMemo } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutElementsProvider } from "@stripe/react-stripe-js/checkout";
import StripeForm from "./CheckoutPaymentForm";
import { useCart } from "@/app/context/CartContext";
import { useCheckout } from "@/app/context/CheckoutContext";
import UserCheckoutProfileForm from "./UserCheckoutAddressForm";
import { SquarePen } from "lucide-react";
import OrderSummary from "./OrderSummary";
import ShippingOptions from "./ShippingOptions";
import CheckoutStepper from "./CheckoutStepper";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Checkout({ initialData }) {
  const [clientSecretPromise, setClientSecretPromise] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setShippingCost } = useCart(); // Get cart items from cart context

  // Nya states för fraktval
  const [selectedShippingOption, setSelectedShippingOption] = useState(null);

  // Add state to track address submission
  const { addressSubmitted, setAddressSubmitted } = useCheckout();

  // const [addressSubmitted, setAddressSubmitted] = useState(false);
  const [shippingDetails, setShippingDetails] = useState({
    givenName: initialData.givenName || "",
    surname: initialData.surname || "",
    email: initialData.email || "",
    phone: initialData.phone || "",
    postalCode: initialData.postalCode || "",
    country: "SE", // Default to Sweden
    city: initialData.city || "",
    line1: initialData.line1 || "",
  });

  // Callback function to be passed to the form
  const handleAddressSubmit = (formData) => {
    setShippingDetails({
      ...shippingDetails, // Keep existing data
      ...formData, // Update with new form data
      // Keep the name fields from initialData (they're read-only)
      givenName: initialData.givenName,
      surname: initialData.surname,
    });
    setAddressSubmitted(true);
    setLoading(true); // Start loading for payment intent
  };

  // Manage shipping cost in CartContext
  const handleShippingOptionChange = (option) => {
    setSelectedShippingOption(option);

    // Update cart context with selected shipping option
    if (option && option.minorUnitsAmount) {
      setShippingCost(option.minorUnitsAmount);
    } else {
      setShippingCost(0);
    }
  };

  useEffect(() => {
    if (!addressSubmitted) return;

    setLoading(true);
    setError(null);

    const p = fetch(`${API_BASE_URL}/stripe/create-checkout-session`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ shippingDetails }),
    })
      .then(async (res) => {
        if (!res.ok) {
          // Parse the error message from the response
          const errorData = await res.json().catch(() => ({
            error: `HTTP error ${res.status}`,
          }));

          // Throw with more specific error message
          throw new Error(
            errorData.error || `Failed with status: ${res.status}`,
          );
        }
        return res.json();
      })
      .then(({ clientSecret }) => clientSecret);

    // hand the same promise to Stripe
    setClientSecretPromise(p);

    p.catch((err) => {
      console.error(err);
      setError(
        "Failed to create checkout session. Please try again. " + err.message,
      );
    }).finally(() => {
      setLoading(false);
    });
  }, [addressSubmitted, shippingDetails]);

  // If the form was successfully submitted and we've entered payment step,
  // but user wants to edit their info again
  const handleEditAddress = () => {
    setAddressSubmitted(false);
    setClientSecretPromise(null);
  };

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "hsl(21, 90%, 48%)",
      colorBackground: "rgb(0, 0, 0, 0)",
      colorText: "#fff",
      fontFamily: "Montserrat, system-ui, sans-serif",
    },
  };

  if (error) {
    return (
      <section>
        <div className="container">
          <div className="rounded-lg bg-red-50 p-6">
            <h2 className="text-xl font-semibold text-red-800">Error</h2>
            <p className="mt-2 text-red-700">{error}</p>
            <button
              className="mt-4 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="container">
        <div className="mb-8 flex flex-col">
          <h1 className="mx-auto mb-2">Kassa</h1>
          {/* Component showing 2 steps in checkout, first is address form, 2nd is freight & payment */}
          <CheckoutStepper currentStep={addressSubmitted ? 2 : 1} />
        </div>
        {/* Responsive grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Left column (Adress form, freight picker and payment) */}
          <div className="order-2 md:order-1 md:col-span-2">
            {/* Address form */}

            {!addressSubmitted ? (
              <UserCheckoutProfileForm
                onAddressSubmit={handleAddressSubmit}
                data={shippingDetails}
              />
            ) : (
              <div className="border-primary/50 mb-8 rounded-lg border p-4">
                <div className="flex justify-between">
                  <h3 className="font-semibold">Leveransuppgifter</h3>
                  <button
                    onClick={handleEditAddress}
                    className="text-primary ml-2 hover:underline"
                  >
                    <SquarePen className="mr-1 inline-block" />
                    Redigera
                  </button>
                </div>
                <div className="mt-2">
                  <p>
                    {shippingDetails.givenName} {shippingDetails.surname}
                  </p>
                  <p>{shippingDetails.line1}</p>
                  <p>
                    {shippingDetails.postalCode} {shippingDetails.city}
                  </p>
                  <p>{shippingDetails.email}</p>
                  <p>{shippingDetails.phone}</p>
                </div>
              </div>
            )}

            {/* Only show checkout form if address has been submitted */}
            {addressSubmitted && !loading && !error && (
              <div className="mt-8">
                <h2 className="mb-6">Betalning</h2>
                <CheckoutElementsProvider
                  stripe={stripePromise}
                  options={{
                    clientSecret: clientSecretPromise,
                    elementsOptions: { appearance },
                  }}
                >
                  <ShippingOptions
                    selectedOption={selectedShippingOption}
                    onOptionChange={handleShippingOptionChange}
                  />
                  <StripeForm shippingDetails={shippingDetails} />
                </CheckoutElementsProvider>
              </div>
            )}

            {/* Loading state */}
            {addressSubmitted && loading && (
              <div className="flex h-64 items-center justify-center">
                <div className="border-primary h-12 w-12 animate-spin rounded-full border-b-2"></div>
              </div>
            )}
          </div>
          {/* Höger kolumn (ordersammanfattning) */}
          <div className="order-1 md:order-2 md:col-span-1">
            {/* Visa OrderSummary-komponenten i både steg 1 och steg 2 */}
            <OrderSummary selectedShippingOption={selectedShippingOption} />
          </div>
        </div>
      </div>
    </section>
  );
}
