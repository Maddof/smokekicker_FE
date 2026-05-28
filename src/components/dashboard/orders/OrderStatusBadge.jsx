import {
  Clock,
  RefreshCw,
  CheckCircle,
  XCircle,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function OrderStatusBadge({ status, className }) {
  // Configuration for different statuses
  const statusConfig = {
    PENDING: {
      label: "Initierad",
      icon: Clock,
      className: "bg-amber-100 text-amber-800 border-amber-200",
    },
    PROCESSING: {
      label: "Behandlas",
      icon: RefreshCw,
      className: "bg-blue-100 text-blue-800 border-blue-200",
    },
    COMPLETED: {
      label: "Slutförd",
      icon: CheckCircle,
      className: "bg-green-100 text-green-800 border-green-200",
    },
    CANCELED: {
      label: "Avbruten",
      icon: XCircle,
      className: "bg-red-100 text-red-800 border-red-200",
    },
    REFUNDED: {
      label: "Återbetald",
      icon: RotateCcw,
      className: "bg-purple-100 text-purple-800 border-purple-200",
    },
  };

  // Fallback for unknown status
  const config = statusConfig[status] || {
    label: status,
    icon: Clock,
    className: "bg-gray-100 text-gray-800 border-gray-200",
  };

  const IconComponent = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        config.className,
        className,
      )}
    >
      <IconComponent className="h-3.5 w-3.5" />
      <span>{config.label}</span>
    </span>
  );
}
