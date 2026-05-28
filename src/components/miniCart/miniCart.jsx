"use client";

import SheetWrapper from "@/components/SheetWrapper";
import CartLink from "@/components/header/cartLink";
import { useCart } from "@/app/context/CartContext";
import { Minus, Plus, X } from "lucide-react";
import { formatCurrency } from "@/lib/utils/currencyFormatter";
import QuantityButton from "./quantityButton";
import { SheetClose } from "../ui/scn/sheet";
import CheckoutButton from "../cart/CheckoutButton";
import { useCheckout } from "@/app/context/CheckoutContext";
import { ROUTES } from "@/config/routes";
import Link from "next/link";

export default function MiniCart() {
  const {
    cartItems = [],
    addToCart,
    subtractItemFromCart,
    removeFromCart,
    subtotal = 0,
    discount = 0,
    total = 0,
    totalQuantity = 0,
    shippingCost = 0,
    clearCart,
    errorMessage,
    loading,

    // pricing helpers
    getUnitPrice,
    getDiscountedUnitPrice,
    getLineTotal,
    getLineDiscount,
  } = useCart();

  const { isCheckoutPage, addressSubmitted } = useCheckout();
  const shouldDisableControls =
    (isCheckoutPage && addressSubmitted) || loading || errorMessage;

  const cartQuantityMessage =
    totalQuantity === 1
      ? `Du har ${totalQuantity} produkt i varukorgen`
      : `Du har ${totalQuantity} produkter i varukorgen`;

  const hasAnyDiscount =
    (discount ?? 0) > 0 ||
    cartItems.some((i) => (i?.pricing?.discountRate ?? 0) > 0);

  return (
    <SheetWrapper
      trigger={<CartLink />}
      title="Varukorg"
      description={cartQuantityMessage}
    >
      <div
        className={`mt-4 ${loading ? "pointer-events-none opacity-50" : ""}`}
      >
        {cartItems.length === 0 ? (
          <div className="text-center">
            <p className="text-muted-foreground">Din varukorg är tom!</p>
            <SheetClose className="border-muted-foreground text-muted-foreground hover:border-primary hover:text-primary focus:ring-primary mt-4 inline-block rounded-md border bg-transparent px-4 py-2 text-sm font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-hidden">
              Fortsätt handla
            </SheetClose>
          </div>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((item) => {
              const unit = getUnitPrice?.(item) ?? item.price ?? 0;
              const discountedUnit =
                getDiscountedUnitPrice?.(item) ?? item.price ?? 0;

              const lineTotal =
                getLineTotal?.(item) ?? discountedUnit * (item.quantity || 0);

              const lineDiscount = getLineDiscount?.(item) ?? 0;
              const discountRate = item?.pricing?.discountRate ?? 0;

              const hasDiscount = discountRate > 0 && discountedUnit < unit;

              return (
                <li
                  key={item.id}
                  className="border-accent/25 flex w-full flex-col items-start justify-between gap-2 border-b pb-4"
                >
                  {/* Left: product info */}
                  <div className="flex w-full justify-between gap-2">
                    <SheetClose asChild>
                      <Link
                        href={                      
                            ROUTES.SHOP.PRODUCT(
                                item.categorySlug,
                                item.brandSlug,
                                item.slug,
                              )
                        }
                        className="text-primary pr-1 font-bold text-wrap"
                      >
                        {item?.name || "Okänd produkt"}
                      </Link>
                    </SheetClose>
                    <p className="text-sm font-semibold">
                      {formatCurrency(lineTotal)}
                    </p>
                  </div>
                  <div className="flex w-full items-start justify-between gap-2">
                    {/* qty + unit price (with discount display) */}
                    <div className="mt-1 flex max-w-60 flex-col flex-wrap items-start gap-x-2 text-sm text-wrap">
                      <p>
                        <span>{item.quantity} × </span>

                        {hasDiscount ? (
                          <>
                            <span>{formatCurrency(discountedUnit)}</span>
                          </>
                        ) : (
                          <span>{formatCurrency(unit)}</span>
                        )}
                      </p>

                      {/* per-line savings */}
                      {hasDiscount && lineDiscount > 0 && (
                        <p className="text-muted-foreground mt-2 text-xs">
                          Du sparar {formatCurrency(lineDiscount)} på denna vara
                        </p>
                      )}
                    </div>

                    {/* Right: controls + line total */}
                    <div className="flex shrink-0 flex-col items-end gap-2">
                      <div className="flex items-center space-x-2">
                        <QuantityButton
                          onClick={() => subtractItemFromCart(item)}
                          icon={Minus}
                          disabled={shouldDisableControls}
                        />
                        <QuantityButton
                          onClick={() => addToCart(item.itemId)}
                          icon={Plus}
                          disabled={shouldDisableControls}
                        />
                        <button
                          className={`bg-destructive text-destructive-foreground flex h-7 w-7 items-center justify-center rounded-full ${
                            shouldDisableControls
                              ? "cursor-not-allowed opacity-50"
                              : "hover:text-destructive hover:bg-destructive-foreground"
                          }`}
                          onClick={() => removeFromCart(item)}
                          disabled={shouldDisableControls}
                          aria-label="Ta bort"
                          title="Ta bort"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="mt-auto pt-4">
          {/* Errors / warnings */}
          {errorMessage && (
            <p className="text-destructive mb-2">{errorMessage}</p>
          )}

          <button
            className="mb-3 border-b-2 text-sm uppercase disabled:opacity-50"
            onClick={clearCart}
            disabled={loading || shouldDisableControls}
          >
            Töm varukorg
          </button>

          {/* Summary */}
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Delsumma</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>

            {hasAnyDiscount && (discount ?? 0) > 0 && (
              <div className="flex justify-between">
                <span>Rabatt</span>
                <span className="text-primary">
                  − {formatCurrency(discount)}
                </span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Frakt</span>
              <span>{formatCurrency(shippingCost)}</span>
            </div>

            <div className="mt-2 flex justify-between border-t pt-2 font-semibold">
              <span>Totalt</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>

          <div className="mt-4">
            <CheckoutButton />
          </div>
        </div>
      )}
    </SheetWrapper>
  );
}
