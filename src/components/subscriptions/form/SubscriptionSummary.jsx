"use client";

import { formatCurrency } from "@/lib/utils/currencyFormatter";
import StepHeading from "../StepHeading";
import { PackageOpen } from "lucide-react";

export default function SubscriptionSummary({ currentTotal, intervalCount }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <StepHeading
        title="Sammanfattning"
        description="En sammanfattning av din vape prenumeration."
      />
      <PackageOpen className="text-primary mb-4 h-28 w-28" strokeWidth={0.5} />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p>Pris per låda:</p>
          <p>Leveransintervall:</p>
        </div>
        <div>
          <p className="text-primary font-semibold">
            {formatCurrency(currentTotal)}
          </p>
          <p className="text-primary font-semibold">
            {intervalCount === 1 && "Varje vecka"}
            {intervalCount === 2 && "Varannan vecka"}
            {intervalCount > 2 && `Var ${intervalCount}:e vecka`}
          </p>
        </div>
      </div>
    </div>
  );
}
