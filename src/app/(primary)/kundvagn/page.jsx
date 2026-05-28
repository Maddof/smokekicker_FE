"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "@/lib/utils/currencyFormatter";
import { Button } from "@/components/ui/scn/button";
import { ROUTES } from "@/config/routes";

export default function CartPage() {
  const {
    cartItems = [],
    subtotal = 0,
    discount = 0,
    shippingCost = 0,
    total = 0,
    clearCart,
    errorMessage,
    loading,

    // pricing helpers
    getUnitPrice,
    getDiscountedUnitPrice,
    getLineTotal,
    getLineDiscount,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <section className="neon-bg-radial-top-right flex min-h-[72vh] flex-col items-center justify-center gap-4 bg-black/40 px-6 text-center text-slate-100">
        <ShoppingCart size={48} className="text-slate-400" />
        <p className="text-lg font-semibold tracking-wide">
          Din varukorg är tom
        </p>
        <Button asChild>
          <Link href={ROUTES.SHOP.INDEX}>Börja handla</Link>
        </Button>
      </section>
    );
  }

  const hasAnyDiscount =
    (discount ?? 0) > 0 ||
    cartItems.some((i) => (i?.pricing?.discountRate ?? 0) > 0);

  return (
    <section className="neon-bg-radial-top-right min-h-[72vh] bg-black/40 py-12 text-slate-100">
      <div className="container mx-auto max-w-5xl px-4">
        <header className="mb-6 space-y-2 rounded-xl border border-slate-800/60 bg-slate-900/40 p-4 shadow-lg shadow-black/30">
          <h1 className="text-lg font-semibold tracking-tight">Varukorg</h1>
          <p className="text-sm text-slate-300">
            För kvantitetsändringar eller borttagning, öppna mini-korgen via
            kundvagnsikonen längst upp på sidan.
          </p>
        </header>

        {errorMessage && (
          <div className="mb-6 rounded-md border border-red-400/40 bg-red-500/15 p-4 text-sm text-red-200 shadow shadow-red-900/30">
            {errorMessage}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Items */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-xl border border-slate-800/60 bg-slate-900/60 shadow-xl shadow-black/40">
              <div className="flex items-center justify-between border-b border-slate-800/70 p-4">
                <p className="text-sm font-medium text-slate-200">
                  Produkter ({cartItems.length})
                </p>
                <Button
                  variant="outline"
                  className="text-sm text-slate-300 transition hover:text-red-300 disabled:opacity-50"
                  onClick={clearCart}
                  disabled={loading}
                >
                  Töm varukorg
                </Button>
              </div>

              <ul className="divide-y divide-slate-800/70">
                {cartItems.map((item) => {
                  const unit = getUnitPrice?.(item) ?? item.price ?? 0;
                  const discountedUnit =
                    getDiscountedUnitPrice?.(item) ?? item.price ?? 0;

                  const lineTotal =
                    getLineTotal?.(item) ?? unit * (item.quantity || 0);
                  const lineDiscount = getLineDiscount?.(item) ?? 0;

                  const discountRate = item?.pricing?.discountRate ?? 0;
                  const hasDiscount = discountRate > 0 && discountedUnit < unit;

                  return (
                    <li key={item.id} className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="truncate font-medium text-slate-100">
                            {item?.name || "Produkt"}
                          </p>

                          <div className="mt-1 flex flex-wrap items-center gap-x-2 text-sm text-slate-400">
                            <span>{item.quantity} ×</span>

                            {hasDiscount ? (
                              <>
                                <span className="line-through">
                                  {formatCurrency(unit)}
                                </span>
                                <span className="font-medium text-slate-100">
                                  {formatCurrency(discountedUnit)}
                                </span>
                                <span className="bg-primary/10 text-primary rounded px-2 py-0.5 text-xs">
                                  Mängdrabatt {Math.round(discountRate * 100)}%
                                </span>
                              </>
                            ) : (
                              <span>{formatCurrency(unit)}</span>
                            )}
                          </div>

                          {/* Subscription details */}
                          {item.type === "SUBSCRIPTION" && (
                            <p className="mt-1 text-sm text-slate-400">
                              {item.intervalCount === 1 &&
                                "Skickas varje vecka"}
                              {item.intervalCount === 2 &&
                                "Skickas varannan vecka"}
                              {item.intervalCount > 2 &&
                                `Skickas var ${item.intervalCount}:e vecka`}
                            </p>
                          )}

                          {item.type === "SUBSCRIPTION" &&
                            item.items?.length > 0 && (
                              <ul className="mt-2 space-y-1 text-xs text-slate-400">
                                {item.items.map((boxItem) => (
                                  <li key={boxItem.itemId} className="truncate">
                                    – {boxItem.name} ({boxItem.quantity}x)
                                  </li>
                                ))}
                              </ul>
                            )}

                          {hasDiscount && lineDiscount > 0 && (
                            <p className="mt-2 text-xs text-slate-300">
                              Du sparar {formatCurrency(lineDiscount)} på denna
                              vara
                            </p>
                          )}
                        </div>

                        <div className="shrink-0 text-right">
                          <p className="text-sm font-semibold text-slate-50">
                            {formatCurrency(lineTotal)}
                          </p>
                          {hasDiscount && (
                            <p className="mt-1 text-xs text-slate-400">
                              före rabatt:{" "}
                              {formatCurrency(unit * (item.quantity || 0))}
                            </p>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Summary */}
          <aside className="lg:sticky lg:top-24">
            <div className="rounded-xl border border-slate-800/60 bg-slate-900/70 p-4 shadow-xl shadow-black/40">
              <h2 className="text-sm font-medium text-slate-200">
                Sammanfattning
              </h2>

              <div className="mt-4 space-y-2 text-sm text-slate-200">
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

                <div className="mt-3 flex justify-between border-t border-slate-800/70 pt-3 text-base font-semibold text-white">
                  <span>Totalt</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              <Button asChild className="mt-5 w-full">
                <Link href={ROUTES.CHECKOUT}>Gå till kassan</Link>
              </Button>

              <Link
                href={ROUTES.SHOP.INDEX}
                className="hover:text-primary mt-4 block text-center text-sm text-slate-300 underline-offset-4 transition"
              >
                Fortsätt handla
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
