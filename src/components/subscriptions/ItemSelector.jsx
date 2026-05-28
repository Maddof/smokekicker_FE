import { formatCurrency } from "@/lib/utils/currencyFormatter";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/scn/select";

export default function ItemSelector({
  value,
  availableItems,
  selectedProductIds,
  onChange,
}) {
  // Filter out any item that is already selected in another dropdown,
  // but always include the current value.
  const notSelectedItems = availableItems.filter((item) => {
    if (item.id === value) return true;
    return !selectedProductIds.includes(item.id);
  });

  // Find the currently selected item to get its color
  const selectedItem = availableItems.find((item) => item.id === value);
  const borderColor = selectedItem?.details?.color || "#888888"; // Default color if none found

  // Only hide arrow when something is selected
  const arrowClass = value ? "[&>svg]:hidden" : "";

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className={`border-secondary-foreground min-h-fit w-full justify-center gap-2 border-x-0 border-t-0 bg-transparent ${arrowClass}`}
        style={{
          borderBottomColor: borderColor,
          color: borderColor,
        }}
      >
        {selectedItem ? (
          <span>{selectedItem.name}</span>
        ) : (
          <SelectValue placeholder="Välj en smak" />
        )}
        {/* <SelectValue placeholder="Välj en smak" /> */}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Smaker</SelectLabel>
          {notSelectedItems.map((item) => (
            <SelectItem
              key={item.id}
              value={item.id}
              disabled={item.stock <= 0}
            >
              <div className="flex w-full items-start gap-2">
                <div className="flex flex-col">
                  <span className="tracking-wide">{item.name}</span>
                  <div>
                    <span className="text-xs">
                      {formatCurrency(item.price)} per{" "}
                      {item.category.slug === "e-juice" ? "flaska" : "pod"}
                    </span>
                    {" / "}
                    <span className="text-xs">
                      {item.details.nicotineValue} mg/ml
                    </span>
                  </div>
                </div>
                <div>
                  {item.details?.color && (
                    <span
                      className="ml-2 inline-block h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.details.color }}
                    />
                  )}
                </div>
              </div>

              {item.stock <= 0 && <p className="text-xs">Tillfälligt slut</p>}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
