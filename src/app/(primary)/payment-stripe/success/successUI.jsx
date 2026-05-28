"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/app/context/CartContext";
import { ROUTES } from "@/config/routes";

export default function SuccessUI({ status, customerEmail }) {
  // Access setCartItems from CartContext
  // Cart clearing local state after successful payment
  // to ensure cart is emptied on success page
  // Cart should already be cleared server-side on successful payment
  // We only do this to update the client-side state
  const { setCartItems } = useCart();

  useEffect(() => {
    if (status === "complete") {
      // Set cart to empty array after successful payment
      setCartItems([]);
    }
  }, [status, setCartItems]);

  return (
    <section className="neon-bg-radial-top-right flex min-h-[72vh] items-center justify-center py-12">
      <div className="text-secondary-foreground container max-w-md text-center">
        <h1 className="mb-4 text-2xl font-bold">Betalning genomförd</h1>
        <p className="mb-4">Tack för ditt köp!</p>
        <p className="mb-4">
          En bekräftelse med mer information har skickats till {customerEmail}.
        </p>
        <p className="mb-8">
          Du kan nu besöka "mina sidor" för att se dina beställningar och
          prenumerationer.
        </p>
        <Link
          href={ROUTES.DASHBOARD.INDEX}
          className="bg-primary hover:bg-primary/90 inline-block rounded-md px-6 py-2 text-white transition-colors"
        >
          Besök mina sidor
        </Link>
      </div>
    </section>
  );
}
