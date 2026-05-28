import {
  FileEdit,
  Clock,
  PlayCircle,
  PauseCircle,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SubscriptionStatusBadge({ status, className }) {
  // Configuration for different subscription statuses
  const statusConfig = {
    DRAFT: {
      label: "Utkast",
      icon: FileEdit,
      className: "bg-slate-100 text-slate-800 border-slate-200",
    },
    PENDING: {
      label: "Väntar",
      icon: Clock,
      className: "bg-amber-100 text-amber-800 border-amber-200",
    },
    ACTIVE: {
      label: "Aktiv",
      icon: PlayCircle,
      className: "bg-green-100 text-green-800 border-green-200",
    },
    PAUSED: {
      label: "Pausad",
      icon: PauseCircle,
      className: "bg-blue-100 text-blue-800 border-blue-200",
    },
    CANCELED: {
      label: "Avslutad",
      icon: XCircle,
      className: "bg-red-100 text-red-800 border-red-200",
    },
    PAST_DUE: {
      label: "Förfallen",
      icon: Clock,
      className: "bg-yellow-100 text-yellow-800 border-yellow-200",
    },
  };

  // Fallback for unknown status
  const config = statusConfig[status] || {
    label: status,
    icon: FileEdit,
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
