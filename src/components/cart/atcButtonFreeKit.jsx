"use client";

import { useCart } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext";
import { Button } from "../ui/scn/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ROUTES } from "@/config/routes";

const FREE_KIT_CATEGORY_ID =
  parseInt(process.env.NEXT_PUBLIC_FREE_KIT_CATEGORY_ID) ||
  6;

export default function AtcButtonFreeKit({ product }) {
  const pathname = usePathname();

  const { addToCart, loadingProductIds, cartItems } =
    useCart();
  const { isAuthenticated, user } = useAuth();
  const isLoading = loadingProductIds.includes(product.id); // Check if this product is loading
  const isOutOfStock = product.stock === 0;

  // Check if the cart already contains the starter kit
  const hasStarterKitInCart = cartItems.some(
    (item) => item.categoryId === FREE_KIT_CATEGORY_ID,
  );

  const handleAddToCart = () => {
    // Prevent adding if product is out of stock or not authenticated
    if (isOutOfStock || !isAuthenticated || isLoading) {
      return;
    }
    addToCart(product.id);
  };

  // Safe access to user properties
  const canReceiveStarterKit =
    user?.canReceiveStarterKit ?? false;

  const buttonLabel = isOutOfStock
    ? "Slut i lager"
    : !isAuthenticated
      ? "Logga in för att handla (kommer snart)"
      : hasStarterKitInCart
        ? "Startkit tillagd"
        : !canReceiveStarterKit
          ? "Du har redan fått ett starterkit"
          : `Lägg i varukorg`;

  return (
    <>
      <Button
        onClick={handleAddToCart}
        // disabled={
        //   !isAuthenticated ||
        //   isLoading ||
        //   isOutOfStock ||
        //   hasStarterKitInCart ||
        //   !canReceiveStarterKit
        // }
        disabled
      >
        {buttonLabel}
      </Button>

      {!isAuthenticated && (
        <p className="text-muted-foreground mt-4 text-xs">
          Du måste vara{" "}
          {/* <Link
            href={`${ROUTES.AUTH.BANKID}?returnUrl=${encodeURIComponent(pathname)}`}
          >
            inloggad
          </Link>{" "} */}
          inloggad för att handla prenumeration
        </p>
      )}
      {isAuthenticated && !canReceiveStarterKit && (
        <p className="text-muted-foreground mt-4 max-w-sm text-center text-xs">
          Du har redan fått ett gratis starterkit med en
          tidigare prenumeration. Vänligen handla ditt{" "}
          <Link
            href={ROUTES.SHOP.CATEGORY(
              "start-kit-podsystem",
            )}
          >
            podsystem starterkit{" "}
          </Link>{" "}
          separat från din prenumeration.
        </p>
      )}
    </>
  );
}
