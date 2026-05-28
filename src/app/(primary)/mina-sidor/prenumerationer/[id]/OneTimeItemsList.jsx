import { formatCurrency } from "@/lib/utils/currencyFormatter";
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/scn/button";
import Spinner from "@/components/ui/custom/spinner";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Displays a list of one-time items for a subscription
 *
 * @param {Array} pendingOneTimeItems - Array of pending one-time items
 */
export default function OneTimeItemsList({
  pendingOneTimeItems = [],
  subscriptionId,
  onItemRemoved,
}) {
  const [deletingItemId, setDeletingItemId] = useState(null);
  const [error, setError] = useState(null);

  // Safety check to ensure pendingOneTimeItems is an array
  const items = Array.isArray(pendingOneTimeItems) ? pendingOneTimeItems : [];

  const handleRemoveItem = async (item) => {
    // Show confirmation dialog
    const isConfirmed = window.confirm(
      `Är du säker på att du vill ta bort ${item.product?.name || "denna artikel"} från din nästa leverans?`,
    );

    if (!isConfirmed) return;

    setDeletingItemId(item.id);
    setError(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}/subscriptions/${subscriptionId}/delete-invoice-item/${item.stripeInvoiceItemId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to remove item");
      }

      // Call the callback to update parent component
      if (onItemRemoved) {
        onItemRemoved(item.id);
      }
    } catch (err) {
      console.error("Error removing item:", err);
      setError(err.message);
    } finally {
      setDeletingItemId(null);
    }
  };

  return (
    <>
      {error && <p className="mb-2 text-sm text-red-500">{error}</p>}

      {items.length > 0 ? (
        <ul className="mb-2 list-disc pl-5 text-sm">
          {items.map((item) => (
            <li key={item.id || `one-time-${Math.random()}`} className="mb-1">
              <div className="flex items-start justify-between">
                <div>
                  {item.product
                    ? item.product.name
                    : `Artikel #${item.id || "N/A"}`}{" "}
                  x {item.quantity || 1}{" "}
                  <span className="text-muted-foreground">
                    ({formatCurrency(item.price * item.quantity || 0)})
                  </span>
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  className="text-destructive ml-2 h-5 w-5"
                  onClick={() => handleRemoveItem(item)}
                  disabled={deletingItemId === item.id}
                  title="Ta bort från nästa leverans"
                >
                  {deletingItemId === item.id ? (
                    <Spinner className="h-3 w-3" />
                  ) : (
                    <X className="h-3 w-3" />
                  )}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground pl-1 text-sm italic">
          Inga engångsartiklar
        </p>
      )}
    </>
  );
}
