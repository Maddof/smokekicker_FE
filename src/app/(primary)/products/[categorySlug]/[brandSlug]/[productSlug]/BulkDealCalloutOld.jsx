import { formatCurrency } from "@/lib/utils/currencyFormatter";
import AtcButtonDefault from "@/components/cart/atcButton";

export default function BulkDealCallout({
  product,
  unitPrice,
  threshold = 3,
  discountRate = 0.1,
  className = "",
}) {
  const safeUnitPrice = Math.max(unitPrice ?? 0, 0);
  const safeThreshold = Math.max(threshold ?? 0, 2);
  const safeRate = Math.min(Math.max(discountRate ?? 0, 0), 0.95);

  const discountedUnit = Math.round(safeUnitPrice * (1 - safeRate));
  const packTotal = discountedUnit * safeThreshold;
  // const discountPercent = Math.round(safeRate * 100);

  return (
    <div
      className={`rounded-lg border border-slate-200 bg-white/80 p-3 shadow-sm sm:p-4 ${className}`}
    >
      <div className="flex flex-row flex-wrap items-stretch justify-around gap-3 sm:gap-4">
        <div className="flex min-w-18 items-center">
          <span className="bg-primary/10 text-primary block rounded px-3.5 py-2 text-xs font-bold uppercase sm:text-sm">
            {safeThreshold}-pack
          </span>
        </div>

        <div className="bg-muted-foreground/50 h-8 w-px self-center" />

        <div className="flex min-w-15 flex-col items-start text-right">
          <p className="text-muted-foreground mb-1 text-xs">Pris per st</p>
          <p className="font-semibold">{formatCurrency(discountedUnit)}</p>
        </div>
        <div className="bg-muted-foreground/50 h-8 w-px self-center" />
        <div className="flex min-w-15 flex-col items-start text-right">
          <p className="text-muted-foreground mb-1 text-xs">
            Totalt ({safeThreshold}st)
          </p>
          <p className="font-semibold">{formatCurrency(packTotal)}</p>
        </div>
        <div className="flex min-w-25 flex-1 items-center justify-center">
          <AtcButtonDefault
            className="w-full"
            product={product}
            quantity={safeThreshold}
          />
        </div>
      </div>
    </div>
  );
}
