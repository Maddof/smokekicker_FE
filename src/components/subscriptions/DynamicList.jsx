import React from "react";
import ItemSelector from "./ItemSelector";
import { Button } from "../ui/scn/button";
import { Minus, Plus, Trash2 } from "lucide-react";

function DynamicList({
  count,
  selectedItems,
  availableItems,
  updateSelectedItem,
  updateSelectedItemQuantity,
  removeItem,
}) {
  // Derive an array of selected product IDs.
  const selectedProductIds = selectedItems
    .map((item) => item?.productId)
    .filter(Boolean);

  // Max number of quantity of each item per box
  // Conditional below to check this value against its stock
  const MAX_QUANTITY = 8;

  // The number of items is based on the default length,
  // or can be adjusted via the quantity selector.
  return (
    <ul className="grid w-full grid-cols-1 justify-items-center gap-x-0 gap-y-8 md:grid-cols-2 md:gap-x-16 md:gap-y-16">
      {Array.from({ length: count }, (_, index) => {
        const item = selectedItems[index] || {
          quantity: 1,
          stock: MAX_QUANTITY,
        };
        const hasChosen = Boolean(item.productId);

        const stockCap = Math.min(item.stock, MAX_QUANTITY);
        const quantity = Math.max(1, Math.min(stockCap, item.quantity));

        const decrease = () =>
          updateSelectedItemQuantity(index, Math.max(1, quantity - 1));
        const increase = () =>
          updateSelectedItemQuantity(index, Math.min(stockCap, quantity + 1));

        // Function to handle removing this item
        const handleRemove = () => {
          if (removeItem) removeItem(index);
        };

        return (
          <li
            key={index}
            className="my-4 flex w-full max-w-72 flex-col items-center"
          >
            <div className="flex w-full flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                <p className="text-muted-foreground text-sm">
                  Välj smak {index + 1}
                </p>
                {/* Only show remove button if we have more than 1 item and removeItem function exists */}
                {count > 1 && removeItem && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleRemove}
                    className="text-muted-foreground hover:text-destructive h-8 w-8"
                    aria-label={`Ta bort smak ${index + 1}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <ItemSelector
                value={item.productId || ""}
                availableItems={availableItems}
                selectedProductIds={selectedProductIds}
                onChange={(newProductId) =>
                  updateSelectedItem(index, newProductId)
                }
              />
              <div className="mt-1 flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrease}
                  disabled={quantity <= 1 || !hasChosen}
                  aria-label="Minska antal"
                  // className="border-0"
                >
                  <Minus className="h-4 w-4 scale-125" />
                </Button>
                <span className="w-16 text-center text-lg font-bold">
                  {quantity}
                  {/* <span className="text-muted-foreground ml-0.5 text-sm font-medium">
                    st.
                  </span> */}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={increase}
                  disabled={quantity >= stockCap || !hasChosen}
                  aria-label="Öka antal"
                  // className="border-0"
                >
                  <Plus className="h-4 w-4 scale-125" />
                </Button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default React.memo(DynamicList);
