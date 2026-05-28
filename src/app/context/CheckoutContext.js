"use client";

import { createContext, useState, useContext, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/config/routes";

// Create the context
const CheckoutContext = createContext();

// Provider component
export function CheckoutProvider({ children }) {
  const [addressSubmitted, setAddressSubmitted] = useState(false);
  const pathname = usePathname();

  // Reset state when navigating away from checkout

  // Memoize this value to prevent recalculation on every render
  const isCheckoutPage = useMemo(
    () => pathname.includes(ROUTES.CHECKOUT),
    [pathname],
  );

  // Only run the effect when actually navigating away from checkout
  useEffect(() => {
    // Track previous checkout state to only reset when needed
    if (!isCheckoutPage && addressSubmitted) {
      // console.log("Resetting addressSubmitted state");
      setAddressSubmitted(false);
    }
  }, [isCheckoutPage, addressSubmitted]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      addressSubmitted,
      setAddressSubmitted,
      isCheckoutPage,
    }),
    [addressSubmitted, isCheckoutPage],
  );

  return (
    <CheckoutContext.Provider value={contextValue}>
      {children}
    </CheckoutContext.Provider>
  );
}

// Custom hook to use the context
export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
}
