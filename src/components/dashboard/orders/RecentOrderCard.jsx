import { buttonVariants } from "@/components/ui/scn/button";
import { formatCurrency } from "@/lib/utils/currencyFormatter";
import { formatDate } from "@/lib/utils/dateFormatter";
import { Eye, Truck } from "lucide-react";
import Link from "next/link";
import OrderStatusBadge from "./OrderStatusBadge";
import { ROUTES } from "@/config/routes";
import OrderTrackingLink from "./OrderTrackingLink";

export default function RecentOrderCard({ order }) {
  return (
    <div className="border-primary/50 rounded-lg border p-4 sm:p-6">
      <div className="flex justify-between">
        <h3 className="text-base font-medium uppercase">
          Order #{order.id.slice(-4)}
        </h3>
        <OrderStatusBadge status={order.status} />
      </div>
      <div className="mb-3">
        <p className="text-muted-foreground">
          Beställt den <span>{formatDate(order.createdAt)}</span>
        </p>
      </div>
      <div className="xsm:flex-row mb-6 flex flex-col justify-between gap-4">
        <div>
          <div className="text-muted-foreground mb-1">Beställda artiklar</div>
          <ul className="list-disc pl-5">
            {order.orderItems.map((item) => (
              <li key={item.id} className="text-sm">
                {item?.productName ?? item?.subscriptionBoxName} x{" "}
                {item.quantity}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-muted-foreground mb-1">Order sammanfattning</div>
          <p>
            <strong>Totalt:</strong> {formatCurrency(order.totalAmount)}
          </p>
          <p>
            <strong>Frakt kostnad:</strong>{" "}
            {formatCurrency(order.shippingTotalCost)}
          </p>
          <p>
            <strong>Frakt metod:</strong> {order.shippingRateName || "Standard"}
          </p>
        </div>
      </div>
      <div className="xxsm:flex-row flex flex-col justify-between gap-4">
        <div>
          <Link
            href={ROUTES.DASHBOARD.ORDERS.DETAIL(order.id)}
            className={`${buttonVariants({
              variant: "default",
              size: "sm",
            })} w-full`}
          >
            <Eye className="h-4 w-4" />
            Se detaljer
          </Link>
        </div>
        <div>
          <OrderTrackingLink order={order} />
        </div>
      </div>
    </div>
  );
}
