"use client";

import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { buttonVariants } from "../ui/scn/button";
import { cn } from "@/lib/utils";
import { SheetClose } from "../ui/scn/sheet";
import { ROUTES } from "@/config/routes";


const CheckoutButton = () => {
  const { loading } = useCart(); // Access the cart from context

  const buttonLabel = "Till Kassan";

  // If cart is empty or only contains free starter kits, disable the link by making it a span
  if (loading) {
    return (
      <span
        className={cn(
          buttonVariants({ variant: "default" }),
          "mt-4 block w-full cursor-not-allowed text-center tracking-wide uppercase opacity-70",
        )}
      >
        {buttonLabel}
      </span>
    );
  }

  // Otherwise, render a proper link
  return (
    <SheetClose asChild>
      <Link
        href={ROUTES.CHECKOUT}
        className={cn(
          buttonVariants({ variant: "default" }),
          "mt-4 block w-full text-center tracking-wide uppercase",
        )}
      >
        {buttonLabel}
      </Link>
    </SheetClose>
  );
};

export default CheckoutButton;
