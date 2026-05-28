import {
  MapPin,
  CreditCard,
  Clock,
  AlertTriangle,
  Check,
  XCircle,
  RotateCcw,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils/currencyFormatter";
import { formatDate } from "@/lib/utils/dateFormatter";
import { translateOrderStatus } from "@/lib/utils/translations";

export default function OrderDetailsSummary({ order }) {
  // Get payment status icon based on order status
  const getPaymentStatusIcon = (status) => {
    switch (status) {
      case "PENDING":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "PROCESSING":
        return <Check className="h-4 w-4 text-green-500" />;
      case "COMPLETED":
        return <Check className="h-4 w-4 text-green-500" />;
      case "CANCELED":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "REFUNDED":
        return <RotateCcw className="h-4 w-4 text-blue-500" />;
      case "PARTIALLY_REFUNDED":
        return <RotateCcw className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
    }
  };

  const hasPaymentInfo =
    order.paymentBrand || order.paymentLast4 || order.paymentMethod;

  const paymentStatusIcon = getPaymentStatusIcon(order.status);

  return (
    <div className="mb-8 grid gap-6 md:grid-cols-3">
      {/* Order Summary - Left Column */}
      <div className="border-primary/50 rounded-lg border p-4 md:row-span-2">
        <div className="mb-4 border-b pb-3">
          <h3 className="font-semibold">Ordersammanfattning</h3>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Orderdatum</span>
            <span>{formatDate(order.createdAt)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Status</span>
            <div className="flex items-center gap-1">
              {paymentStatusIcon}
              <span>{translateOrderStatus(order.status)}</span>
            </div>
          </div>
          <hr className="border-primary/20" />
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Frakt</span>
              <span>{formatCurrency(order.shippingTotalCost || 0)}</span>
            </div>
            {order.tax > 0 && (
              <div className="flex justify-between">
                <span>Moms</span>
                <span>{formatCurrency(order.tax || 0)}</span>
              </div>
            )}
            <hr className="border-primary/20" />
            <div className="flex justify-between text-lg font-semibold">
              <span>Totalt</span>
              <span className="text-primary">
                {formatCurrency(order.totalAmount)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Address - Top Right */}
      <div className="border-primary/50 rounded-lg border p-4 md:col-span-2">
        <div className="mb-4 border-b pb-3">
          <h3 className="flex items-center gap-2">
            <MapPin className="text-primary h-5 w-5" />
            <span className="font-semibold">Leveransadress</span>
          </h3>
        </div>
        {order.orderAddress ? (
          <div className="space-y-1">
            <p className="text-muted-foreground">
              {order.orderAddress?.line1 || "Ingen adress angiven"}
            </p>
            <p className="text-muted-foreground">{order.orderAddress?.line2}</p>
            <p className="text-muted-foreground">
              {order.orderAddress?.postalCode} {order.orderAddress?.city}
            </p>
            <p className="text-muted-foreground">
              {order.orderAddress?.country || "Sverige"}
            </p>
          </div>
        ) : (
          <p className="text-muted-foreground">Ingen leveransadress angiven</p>
        )}
      </div>

      {/* Payment Method - Bottom Right */}
      <div className="border-primary/50 rounded-lg border p-4 md:col-span-2">
        <div className="mb-4 border-b pb-3">
          <h3 className="flex items-center gap-2">
            <CreditCard className="text-primary h-5 w-5" />
            <span className="font-semibold">Betalningsmetod</span>
          </h3>
        </div>
        <div className="space-y-2">
          {hasPaymentInfo ? (
            <>
              <div className="flex items-center gap-2">
                <span>
                  {order.paymentBrand || "Kortbetalning"}
                  {order.paymentLast4 && ` **** ${order.paymentLast4}`}
                </span>
              </div>
              {order.stripePaymentIntentId && (
                <p className="text-muted-foreground text-xs">
                  Ref: {order.stripePaymentIntentId.replace(/^pi_/, "")}
                </p>
              )}
            </>
          ) : (
            <p className="text-muted-foreground">Betalningsmetod via Stripe</p>
          )}
        </div>
      </div>
    </div>
  );
}
