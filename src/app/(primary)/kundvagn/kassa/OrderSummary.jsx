"use client";

import { useCart } from "@/app/context/CartContext";
import { formatCurrency } from "@/lib/utils/currencyFormatter";

export default function OrderSummary({
  className = "",
  selectedShippingOption,
}) {
  const {
    cartItems = [],
    subtotal = 0,
    shippingCost = 0,
    vat = 0,
    total = 0,
    discount = 0, // <-- add this to context if you can (recommended)
    getUnitPrice,
    getDiscountedUnitPrice,
    getLineTotal,
    getLineDiscount,
  } = useCart();

  const getLineSubtotal = (item) =>
    item?.pricing?.lineSubtotal ??
    (getUnitPrice?.(item) || 0) * (item?.quantity || 0);

  const hasAnyDiscount =
    (discount ?? 0) > 0 ||
    cartItems.some((i) => (i?.pricing?.discountRate ?? 0) > 0);

  return (
    <div className={`border-primary/50 rounded-lg border p-4 ${className}`}>
      <h3 className="mb-4 font-semibold">Orderöversikt</h3>

      {/* Produktlista */}
      <ul className="mb-6 space-y-4">
        {cartItems.map((item) => {
          const unit = getUnitPrice(item);
          const discountedUnit = getDiscountedUnitPrice(item);
          const lineDiscount = getLineDiscount(item);
          const discountRate = item?.pricing?.discountRate ?? 0;
          const hasDiscount = discountRate > 0 && discountedUnit < unit;

          return (
            <li
              key={item.id}
              className="border-accent/25 flex items-start justify-between gap-4 border-b pb-3"
            >
              <div className="min-w-0">
                <p className="text-primary truncate font-bold">
                  {item?.name || "Okänd produkt"}
                </p>

                {/* Quantity + unit pricing */}
                <div className="text-muted-foreground mt-1 flex flex-wrap items-center gap-x-2 text-sm">
                  <span>{item.quantity} x</span>

                  {hasDiscount ? (
                    <>
                      <span className="text-muted-foreground line-through">
                        {formatCurrency(unit)}
                      </span>
                      <span className="text-primary font-medium">
                        {formatCurrency(discountedUnit)}
                      </span>
                    </>
                  ) : (
                    <span>{formatCurrency(unit)}</span>
                  )}
                </div>

                {/* Line discount (optional) */}
                {hasDiscount && lineDiscount > 0 && (
                  <p className="text-muted-foreground mt-2 text-xs">
                    Du sparar {formatCurrency(lineDiscount)} på denna vara
                  </p>
                )}
              </div>

              {/* Line total */}
              <div className="shrink-0 text-right">
                <p className="font-medium">
                  {formatCurrency(getLineTotal(item))}
                </p>
                {hasDiscount && (
                  <p className="text-muted-foreground text-xs">
                    före: {formatCurrency(getLineSubtotal(item))}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {/* Summering */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Delsumma</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>

        {/* Rabatt (if you expose it from context/server) */}
        {hasAnyDiscount && (discount ?? 0) > 0 && (
          <div className="flex justify-between text-sm">
            <span>Rabatt</span>
            <span className="text-primary">− {formatCurrency(discount)}</span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span>{selectedShippingOption ? `Frakt` : "Frakt"}</span>
          <span>{formatCurrency(shippingCost)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-xs">Varav moms</span>
          <span>{formatCurrency(vat)}</span>
        </div>

        <div className="flex justify-between border-t pt-3 font-semibold">
          <span>Totalt</span>
          <span className="text-primary">{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
}
