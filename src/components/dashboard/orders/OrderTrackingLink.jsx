import Link from "next/link";
import { Truck } from "lucide-react";
import { buttonVariants } from "@/components/ui/scn/button";

// Map carriers to their tracking URL formats
const carrierTrackingLinks = {
  PostNord: (trackingNumber) =>
    `https://www.postnord.se/vara-verktyg/spara-brev-paket-och-pall?shipmentId=${trackingNumber}`,
  DHL: (trackingNumber) =>
    `https://www.dhl.com/se-en/home/tracking.html?tracking-id=${trackingNumber}`,
  "DB Schenker": (trackingNumber) =>
    `https://www.dbschenker.com/se-sv/om-oss/kundservice/spara-och-sok?tracking_id=${trackingNumber}`,
  Bring: (trackingNumber) =>
    `https://tracking.bring.se/tracking/${trackingNumber}`,
  Instabox: (trackingNumber) =>
    `https://instabox.io/track/${trackingNumber}`,
};

export default function OrderTrackingLink({ order }) {
  // Get the first shipment from the order, if it exists
  const shipment = order?.shipments?.[0];

  // If there's no shipment, render a disabled button
  if (
    !shipment ||
    !shipment.trackingNumber ||
    !shipment.carrier
  ) {
    return (
      <button
        disabled
        className={`${buttonVariants({
          variant: "outline",
          size: "sm",
        })} w-full cursor-not-allowed opacity-50`}
      >
        <Truck className="mr-2 h-4 w-4" />
        Track (not shipped)
      </button>
    );
  }

  // Get the URL generation function for the specific carrier
  const getTrackingUrl =
    carrierTrackingLinks[shipment.carrier];

  // If the carrier is unknown, render a disabled button
  if (!getTrackingUrl) {
    return (
      <button
        disabled
        className={`${buttonVariants({
          variant: "outline",
          size: "sm",
        })} w-full cursor-not-allowed opacity-50`}
        title={`Unknown carrier: ${shipment.carrier}`}
      >
        <Truck className="mr-2 h-4 w-4" />
        Tracking not available
      </button>
    );
  }

  // Generate the tracking URL
  const trackingUrl = getTrackingUrl(
    shipment.trackingNumber,
  );

  return (
    <Link
      href={trackingUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${buttonVariants({
        variant: "outline",
        size: "sm",
      })} text-secondary-foreground hover:text-secondary-foreground w-full`}
    >
      <Truck className="mr-2 h-4 w-4" />
      Track
    </Link>
  );
}
