"use client";
import { useState } from "react";
import { useCheckout } from "@/app/context/CheckoutContext";
import UserCheckoutProfileForm from "./UserCheckoutAddressForm";
import { SquarePen } from "lucide-react";
import OrderSummary from "./OrderSummary";
import ShippingOptions from "./ShippingOptions";
import CheckoutStepper from "./CheckoutStepper";
import { Button } from "@/components/ui/scn/button";
import { useCart } from "@/app/context/CartContext";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Checkout({ initialData }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Nya states för fraktval
  const [
    selectedShippingOption,
    setSelectedShippingOption,
  ] = useState(null);

  // Add state to track address submission
  const { addressSubmitted, setAddressSubmitted } =
    useCheckout();

  const { fetchCartFromBackend } = useCart();

  const [shippingDetails, setShippingDetails] = useState({
    givenName: initialData.givenName || "",
    surname: initialData.surname || "",
    email: initialData.email || "",
    phone: initialData.phone || "",
    postalCode: initialData.postalCode || "",
    country: initialData.country || "SE", // Default to Sweden
    city: initialData.city || "",
    line1: initialData.line1 || "",
    line2: initialData.line2 || "",
  });

  console.log("Initial shipping details:", shippingDetails);

  // Callback function to be passed to the form
  const handleAddressSubmit = async (formData) => {
    const updatedShippingDetails = {
      ...shippingDetails,
      ...formData,
    };

    setShippingDetails(updatedShippingDetails);
    setAddressSubmitted(true);

    await fetchCartFromBackend(
      updatedShippingDetails.country,
    ); // Refresh cart after address submission to ensure vat and shipping costs are updated based on the selected country
    // setLoading(true); // Start loading for payment intent
  };

  // Manage shipping option selection
  const handleShippingOptionChange = (option) => {
    setSelectedShippingOption(option);
  };

  // If the form was successfully submitted and we've entered payment step,
  // but user wants to edit their info again
  const handleEditAddress = () => {
    setAddressSubmitted(false);
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shippingDetails,
          shippingOption: selectedShippingOption,
          paymentMethod: "CASH_ON_DELIVERY",
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(
          data.error || "Failed to place order",
        );
      }

      const order = await res.json();

      console.log("Order placed successfully:", order);

      // Redirect to thank-you page
      window.location.href = `/cart/checkout/success?orderId=${order.id}`;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <section>
        <div className="container">
          <div className="rounded-lg bg-red-50 p-6">
            <h2 className="text-xl font-semibold text-red-800">
              Error
            </h2>
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
          <h1 className="mx-auto mb-2">Checkout</h1>
          {/* Component showing 2 steps in checkout, first is address form, 2nd is freight & payment */}
          <CheckoutStepper
            currentStep={addressSubmitted ? 2 : 1}
          />
        </div>
        {/* Responsive grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Left column (Address form, freight picker and payment) */}
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
                  <h3 className="font-semibold">
                    Shipping Details
                  </h3>
                  <button
                    onClick={handleEditAddress}
                    className="text-primary ml-2 hover:underline"
                  >
                    <SquarePen className="mr-1 inline-block" />
                    Edit
                  </button>
                </div>
                <div className="mt-2">
                  <p>
                    {shippingDetails.givenName}{" "}
                    {shippingDetails.surname}
                  </p>
                  <p>{shippingDetails.line1}</p>
                  <p>{shippingDetails.line2}</p>
                  <p>
                    {shippingDetails.postalCode}{" "}
                    {shippingDetails.country}{" "}
                    {shippingDetails.city}
                  </p>
                  <p>{shippingDetails.email}</p>
                  <p>{shippingDetails.phone}</p>
                </div>
              </div>
            )}

            {/* Only show checkout form if address has been submitted */}
            {addressSubmitted && !loading && !error && (
              <div className="mt-8">
                <h2 className="mb-6">Shipping</h2>
                <p>Shipping options coming here</p>
                {/* <ShippingOptions
                    selectedOption={selectedShippingOption}
                    onOptionChange={
                      handleShippingOptionChange
                    }
                  /> */}
                <Button onClick={handlePlaceOrder}>
                  Place order
                </Button>
              </div>
            )}

            {/* Loading state */}
            {addressSubmitted && loading && (
              <div className="flex h-64 items-center justify-center">
                <div className="border-primary h-12 w-12 animate-spin rounded-full border-b-2"></div>
              </div>
            )}
          </div>
          {/* Right column (order summary) */}
          <div className="order-1 md:order-2 md:col-span-1">
            {/* Show OrderSummary component in both step 1 and step 2 */}
            <OrderSummary
              selectedShippingOption={
                selectedShippingOption
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
