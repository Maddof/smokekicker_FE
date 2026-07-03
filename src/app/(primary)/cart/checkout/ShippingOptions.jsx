"use client";
import Spinner from "@/components/ui/custom/spinner";
import { formatCurrency } from "@/lib/utils/currencyFormatter";

const ShippingOptions = ({
  options = [],
  selectedOption,
  onOptionChange,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  if (!options.length) {
    return (
      <div className="border-primary/40 rounded-lg border p-4">
        <p className="font-medium">
          No shipping options available
        </p>
        <p className="text-muted-foreground text-sm">
          We currently do not ship to this country.
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {options.map((option) => {
        const selected = selectedOption?.id === option.id;

        return (
          <li key={option.id}>
            <button
              type="button"
              onClick={() => onOptionChange(option)}
              className={`w-full rounded-lg border p-4 text-left transition ${
                selected
                  ? "border-primary bg-primary/10"
                  : "hover:border-primary/60 border-gray-200"
              }`}
            >
              <div className="mb-1 flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium">
                    {option.name}
                  </p>

                  {option.description && (
                    <p className="text-muted-foreground text-sm">
                      {option.description}
                    </p>
                  )}
                </div>

                <span className="font-medium">
                  {option.price === 0
                    ? "Free"
                    : formatCurrency(option.price)}
                </span>
              </div>

              {option.estimatedDelivery && (
                <p className="text-muted-foreground mt-1 text-sm">
                  Estimated delivery:{" "}
                  {option.estimatedDelivery}
                </p>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default ShippingOptions;
