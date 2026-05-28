"use client";

import { forwardRef, useRef, useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { cn } from "@/lib/utils";

const CartLink = forwardRef(function CartLink({ className, ...props }, ref) {
  const { totalQuantity } = useCart();
  const prevQuantityRef = useRef(totalQuantity);

  const [isBumping, setIsBumping] = useState(false);

  useEffect(() => {
    const prevQuantity = prevQuantityRef.current;

    if (totalQuantity > prevQuantity) {
      setIsBumping(true);

      const timeout = setTimeout(() => {
        setIsBumping(false);
      }, 280);

      prevQuantityRef.current = totalQuantity;
      return () => clearTimeout(timeout);
    }

    prevQuantityRef.current = totalQuantity;
  }, [totalQuantity]);

  return (
    <button
      ref={ref}
      aria-label={`Öppna varukorgen, ${totalQuantity} ${
        totalQuantity === 1 ? "vara" : "varor"
      }`}
      type="button"
      className={cn(
        "relative mr-1 flex gap-1 rounded-md p-1 font-medium",
        className,
      )}
      {...props}
    >
      <ShoppingCart className="h-6 w-6" />
      <span
        aria-hidden="true"
        className={cn(
          "absolute -top-1 -right-2 inline-block transition-transform",
          isBumping && "animate-cart-bump",
        )}
      >
        {totalQuantity}
      </span>
      {/* Visually hidden text for screen readers to announce cart updates */}
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {`Varukorg, ${totalQuantity} ${totalQuantity === 1 ? "vara" : "varor"}`}
      </span>
    </button>
  );
});

export default CartLink;
