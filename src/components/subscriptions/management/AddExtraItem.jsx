"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/scn/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/scn/dialog";
import {
  Check,
  CheckCircle,
  LogInIcon,
  PlusCircle,
  RefreshCw,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Spinner from "@/components/ui/custom/spinner";
import QuantitySelector from "./QuantitySelector";
import { formatCurrency } from "@/lib/utils/currencyFormatter";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import { ROUTES } from "@/config/routes";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const CACHE_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds

export default function AddExtraItemButtonClient({
  product,
  isPerkItem = false,
}) {
  const { isAuthenticated } = useAuth();
  // Get the current pathname for the returnUrl
  const pathname = usePathname();

  const availableStock = Math.max(
    0,
    Number(product?.stock) || 0,
  );
  const maxSelectableQuantity = Math.min(
    availableStock,
    10,
  );

  const [open, setOpen] = useState(false);
  const [subscriptions, setSubscriptions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cacheTimestamp, setCacheTimestamp] =
    useState(null);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const isOutOfStock = availableStock < quantity;

  // Add state for selected subscription
  const [selectedSubscription, setSelectedSubscription] =
    useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [perkItemAdded, setPerkItemAdded] = useState(false);
  const [successMessage, setSuccessMessage] =
    useState(null);

  const bulkEnabled =
    product.category?.qualifiesForBulkDiscount ?? false;
  const threshold =
    product.category?.bulkDiscountThreshold ?? 3;
  const percent =
    product.category?.bulkDiscountPercentage ?? 10;

  const qualifiesForBulk =
    !isPerkItem &&
    bulkEnabled &&
    percent > 0 &&
    quantity >= threshold;

  const discountRate = qualifiesForBulk ? percent / 100 : 0;

  const unitPrice = product.price ?? 0;
  const discountedUnit = qualifiesForBulk
    ? Math.round(unitPrice * (1 - discountRate))
    : unitPrice;

  const lineSubtotal = unitPrice * quantity;
  const lineTotal = discountedUnit * quantity;
  const lineDiscount = lineSubtotal - lineTotal;

  // Reset selected subscription when dialog closes
  useEffect(() => {
    if (!open) {
      setSelectedSubscription(null);
      setSuccessMessage(null);
      setError(null);
      setQuantity(1);
      setPerkItemAdded(false);
    }
  }, [open]);

  // Check if cache is valid
  const isCacheValid = useCallback(() => {
    if (!cacheTimestamp) return false;
    return Date.now() - cacheTimestamp < CACHE_EXPIRY_TIME;
  }, [cacheTimestamp]);

  // Fetch subscriptions with cache support
  const fetchSubscriptions = useCallback(
    async (forceRefresh = false) => {
      // Dont fetch if not authenticated
      if (!isAuthenticated) {
        return;
      }

      // If we have valid cached data and don't need to force refresh, use the cache
      // if (!forceRefresh && isCacheValid() && subscriptions.length > 0) {
      //   return;
      // }

      // Use cache if valid, even when the cached result is an empty array

      if (!forceRefresh && isCacheValid()) {
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${API_BASE_URL}/subscriptions/user/activeAndPastDue`,
          {
            credentials: "include",
            // Add cache control headers to help with HTTP caching
            headers: forceRefresh
              ? { "Cache-Control": "no-cache" }
              : {},
          },
        );

        if (!response.ok) {
          if (response.status === 401) {
            router.push(
              `${ROUTES.AUTH.BANKID}?returnUrl=` +
                encodeURIComponent(
                  window.location.pathname,
                ),
            );
            setOpen(false);
            return;
          }
          throw new Error(
            "Något gick fel vid hämtning av prenumerationer, försök igen.",
          );
        }

        const data = await response.json();
        setSubscriptions(data);
        setCacheTimestamp(Date.now());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [isCacheValid, router, isAuthenticated],
  );

  // Fetch on dialog open if needed
  useEffect(() => {
    if (open && isAuthenticated) {
      fetchSubscriptions();
    }
  }, [open, fetchSubscriptions, isAuthenticated]);

  // Handle subscription selection
  const handleSelectSubscription = (subscription) => {
    // Don't allow changing subscription if perk item has been added
    if (isPerkItem && perkItemAdded) return;

    setSelectedSubscription(subscription);
    setSuccessMessage(null); // Clear any existing success message
    setError(null); // Clear any existing errors
  };

  // Handle confirmation of adding item to subscription
  const handleAddToSubscription = async () => {
    if (!selectedSubscription) return;

    setSubmitting(true);
    try {
      // Use different endpoint based on whether this is a perk item
      const endpoint = isPerkItem
        ? `${API_BASE_URL}/subscriptions/${selectedSubscription.id}/add-free-perk-item`
        : `${API_BASE_URL}/subscriptions/${selectedSubscription.id}/add-invoice-item`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          productId: product.id,
          quantity: isPerkItem ? 1 : quantity, // Always force quantity=1 for perk items
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // console.log("Error response:", response.status, data);

        // Handle the specific error format your backend is returning
        if (data.error && Array.isArray(data.error)) {
          // Join all error messages with a line break
          throw new Error(data.error.join("\n"));
        } else if (typeof data.error === "string") {
          throw new Error(data.error);
        } else {
          throw new Error(
            "Det gick inte att lägga till produkten",
          );
        }
      }

      setSuccessMessage(
        `${product.name} har lagts till i ${selectedSubscription.name}`,
      );

      // If it's a perk item, mark it as added to prevent multiple submissions
      if (isPerkItem) {
        setPerkItemAdded(true);
      } else {
        // For regular items, reset selection to allow adding more
        setSelectedSubscription(null);
        setQuantity(1);
      }
    } catch (err) {
      // console.log("Error adding item to subscription:", err);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // const buttonLabel = isOutOfStock ? "För få i lager" : "Bekräfta";
  const buttonLabel = isOutOfStock
    ? availableStock === 0
      ? "SLUT"
      : "FÖR FÅ I LAGER"
    : isPerkItem
      ? "Lägg till nästa låda"
      : "Bekräfta";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex w-full items-center gap-1"
          disabled={
            isOutOfStock || (isPerkItem && perkItemAdded)
          }
        >
          <PlusCircle className="h-4 w-4" />
          <span>Lägg till nästa låda</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="min-h-[458px] sm:max-w-[485px]">
        {!isAuthenticated ? (
          // Content for non-logged-in users
          <>
            <DialogHeader>
              <DialogTitle>
                Lägg till i prenumeration
              </DialogTitle>
              <DialogDescription>
                Denna funktion är endast tillgänglig för
                inloggade kunder med prenumerationer.
              </DialogDescription>
            </DialogHeader>

            <div className="py-8">
              <div className="mb-6 text-center">
                <PlusCircle className="text-primary/60 mx-auto mb-4 h-12 w-12" />
                <h3 className="mb-2 text-lg font-semibold">
                  Engångsköp via prenumeration
                </h3>
                <p className="text-muted-foreground">
                  Med denna funktion kan du lägga till
                  engångsartiklar till din nästa
                  prenumerationsleverans. Detta är ett
                  smidigt sätt att prova nya produkter utan
                  att behöva lägga en separat order.
                </p>
              </div>

              <div className="border-primary/20 bg-primary/5 rounded-md border p-4">
                <h4 className="mb-2 font-medium">
                  Fördelar:
                </h4>
                <ul className="ml-5 list-disc space-y-1 text-sm">
                  <li>Ingen extra fraktkostnad</li>
                  <li>
                    Levereras tillsammans med din nästa låda
                  </li>
                  <li>
                    Enkelt att hantera alla dina
                    beställningar på ett ställe
                  </li>
                </ul>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button variant="outline">Stäng</Button>
              </DialogClose>
              {/* <Button asChild>
                <Link
                  href={`${ROUTES.AUTH.BANKID}?returnUrl=${encodeURIComponent(pathname)}`}
                  className="text-primary inline-flex gap-1 px-3 py-1"
                >
                  <LogInIcon /> Logga in
                </Link>
              </Button> */}
              <Button
                disabled
                variant="outline"
                className="cursor-not-allowed"
              >
                <LogInIcon /> Logga in
              </Button>
            </DialogFooter>
          </>
        ) : (
          // Content for logged-in users (existing functionality)
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                Lägg till i prenumeration
              </DialogTitle>
              <DialogDescription className="text-left">
                Lägg till {product.name} som en
                engångsartikel i din aktiva prenumeration.
                Kommer endast att ingå för nästa
                leveranstillfälle.
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              {/* Loading state */}
              {loading ? (
                <div className="flex justify-center py-4">
                  <Spinner />
                </div>
              ) : error ? (
                /* Error state */
                <div className="rounded-md border border-red-200 bg-red-50 p-3 text-center text-red-700">
                  {error}
                </div>
              ) : (subscriptions?.length ?? 0) === 0 ? (
                /* Empty state */
                <div className="rounded-md bg-amber-50 p-3 text-amber-800">
                  Du har inga aktiva prenumerationer. Skapa
                  en prenumeration först.
                </div>
              ) : (
                /* Subscription list */
                <div className="space-y-3">
                  {/* Success message for perk items */}
                  {isPerkItem && perkItemAdded && (
                    <div className="mb-4 rounded-md border border-green-200 bg-green-50 p-4 text-center">
                      <CheckCircle className="mx-auto mb-2 h-6 w-6 text-green-500" />
                      <p className="font-medium text-green-700">
                        {successMessage}
                      </p>
                      <p className="mt-1 text-sm text-green-600">
                        Tillbehöret har lagts till i din
                        prenumeration.
                      </p>
                    </div>
                  )}

                  <p className="text-muted-foreground text-sm">
                    Välj vilken prenumeration du vill lägga
                    till denna produkt i:
                  </p>

                  {/* Subscription cards */}
                  <div className="space-y-2">
                    {subscriptions.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() =>
                          handleSelectSubscription(sub)
                        }
                        aria-pressed={
                          selectedSubscription?.id ===
                          sub.id
                        }
                        className={`flex w-full cursor-pointer items-center justify-between rounded-md border p-3 text-left transition-colors ${
                          selectedSubscription?.id ===
                          sub.id
                            ? "border-primary bg-primary/5"
                            : "border-primary/20 hover:bg-primary/5"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {selectedSubscription?.id ===
                            sub.id && (
                            <Check
                              className="text-primary h-4 w-4"
                              aria-hidden="true"
                            />
                          )}
                          <span className="font-medium">
                            {sub.name}
                          </span>
                        </div>
                        <span className="text-muted-foreground text-sm">
                          {new Date(
                            sub.nextBillingDate,
                          ).toLocaleDateString("sv-SE")}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Quantity selector when a subscription is selected */}
                  {selectedSubscription && (
                    <div className="mt-4 border-t border-gray-200 pt-4">
                      <p className="text-muted-foreground mb-2 text-sm">
                        {isPerkItem
                          ? "Antal:"
                          : "Välj antal:"}
                      </p>
                      <div className="flex items-center justify-between">
                        {isPerkItem ? (
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">
                              1
                            </span>
                          </div>
                        ) : (
                          <QuantitySelector
                            quantity={quantity}
                            setQuantity={setQuantity}
                            maxQuantity={
                              maxSelectableQuantity
                            }
                            disableIncrement={isPerkItem}
                            disableDecrement={isPerkItem}
                          />
                        )}
                        <div className="text-right text-sm">
                          {qualifiesForBulk ? (
                            <>
                              <p className="font-medium">
                                {formatCurrency(lineTotal)}
                              </p>
                              <p className="text-muted-foreground text-xs">
                                {formatCurrency(
                                  discountedUnit,
                                )}{" "}
                                /st (från {threshold} st)
                              </p>
                            </>
                          ) : (
                            <>
                              <p className="font-medium">
                                {formatCurrency(
                                  lineSubtotal,
                                )}
                              </p>
                              {quantity > 1 && (
                                <p className="text-muted-foreground text-xs">
                                  {formatCurrency(
                                    unitPrice,
                                  )}{" "}
                                  /st
                                </p>
                              )}
                              {bulkEnabled &&
                                !isPerkItem &&
                                percent > 0 &&
                                threshold >= 2 && (
                                  <p className="text-muted-foreground text-xs">
                                    {threshold}-pack för{" "}
                                    {formatCurrency(
                                      Math.round(
                                        unitPrice *
                                          (1 -
                                            percent / 100),
                                      ),
                                    )}
                                    /st
                                  </p>
                                )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Cache info and refresh button */}
                  {cacheTimestamp && (
                    <div className="text-muted-foreground border-primary/10 mt-3 flex items-center border-t pt-2 text-xs">
                      <span className="italic">
                        Senast uppdaterad:{" "}
                        {new Date(
                          cacheTimestamp,
                        ).toLocaleTimeString()}
                      </span>
                      {!loading && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-auto h-8 w-8 p-0"
                          onClick={() =>
                            fetchSubscriptions(true)
                          }
                        >
                          <RefreshCw className="h-4 w-4" />
                          <span className="sr-only">
                            Uppdatera
                          </span>
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <DialogFooter className="flex items-end gap-2">
              {!isPerkItem && successMessage && (
                <div className="text-green-600">
                  {successMessage}
                </div>
              )}
              <DialogClose asChild>
                <Button variant="outline">
                  {isPerkItem && perkItemAdded
                    ? "Stäng"
                    : "Avbryt"}
                </Button>
              </DialogClose>

              {/* Action button based on state */}
              {isPerkItem && perkItemAdded ? (
                <Button
                  disabled
                  variant="outline"
                  className="border-green-200 bg-green-50 text-green-700"
                >
                  Tillagt ✓
                </Button>
              ) : (
                <Button
                  disabled={
                    loading ||
                    submitting ||
                    !selectedSubscription ||
                    subscriptions.length === 0 ||
                    isOutOfStock ||
                    (isPerkItem && perkItemAdded)
                  }
                  onClick={handleAddToSubscription}
                >
                  {submitting ? (
                    <>
                      <Spinner className="mr-2 h-4 w-4" />{" "}
                      Lägger till...
                    </>
                  ) : (
                    buttonLabel
                  )}
                </Button>
              )}
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
