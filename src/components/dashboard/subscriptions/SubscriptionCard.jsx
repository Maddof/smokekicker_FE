import { formatCurrency } from "@/lib/utils/currencyFormatter";
import { formatDate } from "@/lib/utils/dateFormatter";
import { CalendarClock, Package, Eye, PlusCircle } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/scn/button";
import SubscriptionStatusBadge from "./SubStatusBadge";
import { ROUTES } from "@/config/routes";

export default function SubscriptionCard({ subscription }) {
  // Format the billing cycle text
  const getBillingCycleText = (cycle, count) => {
    const intervalMap = {
      day: count === 1 ? "Dagligen" : `Var ${count} dag`,
      week: count === 1 ? "Varje vecka" : `Var ${count} vecka`,
      month: count === 1 ? "Varje månad" : `Var ${count} månad`,
      year: count === 1 ? "Årligen" : `Vart ${count} år`,
    };

    return intervalMap[cycle] || `${count} ${cycle}`;
  };

  // Calculate total items in subscription
  const totalItems = subscription.items.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  // Check if there are pending one-time items
  const pendingOneTimeItems =
    subscription.oneTimeItems?.filter((item) => item.status === "PENDING") ||
    [];

  // Calculate total one-time items
  const totalOneTimeItems = pendingOneTimeItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  // One times total price
  const oneTimeItemsTotal = pendingOneTimeItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const totalNextBox = subscription.price + oneTimeItemsTotal;

  return (
    <div className="border-primary/50 rounded-lg border p-4 shadow-sm sm:p-6">
      <div className="flex justify-between">
        <h3 className="text-base font-medium uppercase">{subscription.name}</h3>
        <SubscriptionStatusBadge status={subscription.status} />
      </div>

      <div className="mb-3">
        <p className="text-muted-foreground">
          Nästa debitering:{" "}
          <span>{formatDate(subscription.nextBillingDate)}</span>
        </p>
      </div>

      <div className="mb-6 flex flex-row flex-wrap justify-between gap-4">
        <div>
          <div className="text-muted-foreground mb-1 flex items-center gap-1">
            <Package className="h-4 w-4" /> Prenumerationsartiklar
          </div>
          <ul className="list-disc pl-5">
            {subscription.items.map((item) => (
              <li key={item.id} className="text-sm">
                {item.product.name} x {item.quantity}
              </li>
            ))}
          </ul>
        </div>

        {/* One-time items for next order */}
        <div className="min-w-[180px]">
          <div className="text-muted-foreground mb-1 flex items-center gap-1">
            <PlusCircle className="h-4 w-4" /> Engångsartiklar nästa leverans
          </div>

          {pendingOneTimeItems.length > 0 ? (
            <ul className="list-disc pl-5">
              {pendingOneTimeItems.map((item) => (
                <li key={item.id} className="text-sm">
                  {item.product.name} x {item.quantity}{" "}
                  <span className="text-muted-foreground">
                    ({formatCurrency(item.price)})
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground pl-5 text-sm italic">
              Inga engångsartiklar
            </p>
          )}
        </div>

        <div>
          <div className="text-muted-foreground mb-1 flex items-center gap-1">
            <CalendarClock className="h-4 w-4" /> Prenumerationsdetaljer
          </div>
          <p>
            <strong>Grundpris:</strong> {formatCurrency(subscription.price)}
          </p>

          {oneTimeItemsTotal > 0 && (
            <>
              <p>
                <strong>Engångsartiklar:</strong>{" "}
                {formatCurrency(oneTimeItemsTotal)}
              </p>
              <p className="text-primary border-primary/90 mt-1 mb-2 border-t pt-1 font-medium">
                <strong>Nästa faktura:</strong> {formatCurrency(totalNextBox)}
              </p>
            </>
          )}
          <p>
            <strong>Intervall:</strong>{" "}
            {getBillingCycleText(
              subscription.billingCycle,
              subscription.intervalCount,
            )}
          </p>
          <p>
            <strong>Produkter:</strong> {totalItems} st
          </p>
          {totalOneTimeItems > 0 && (
            <p>
              <strong>Extra artiklar:</strong> {totalOneTimeItems} st
            </p>
          )}
        </div>
      </div>

      <div className="xxsm:flex-row flex flex-col justify-between gap-4">
        <div>
          <Link
            href={ROUTES.DASHBOARD.SUBSCRIPTIONS.DETAIL(subscription.id)}
            className={`${buttonVariants({
              variant: "default",
              size: "sm",
            })} w-full`}
          >
            <Eye className="mr-1 h-4 w-4" />
            Hantera
          </Link>
        </div>
      </div>
    </div>
  );
}
