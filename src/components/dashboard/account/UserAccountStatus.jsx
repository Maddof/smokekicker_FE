import { ROUTES } from "@/config/routes";
import { formatDate } from "@/lib/utils/dateFormatter";
import { Clock, Info, Package } from "lucide-react";
import Link from "next/link";

export default function UserAccountStatus({ user }) {
  // Calculate account age
  const accountCreatedDate = new Date(user.createdAt);
  const currentDate = new Date();
  const accountAgeInDays = Math.floor(
    (currentDate - accountCreatedDate) / (1000 * 60 * 60 * 24),
  );

  return (
    <div className="space-y-6">
      {/* Account age section */}
      <div>
        <div className="mb-2 flex items-center gap-2 text-sm font-medium">
          <Info className="text-primary/70 h-4 w-4" />
          <span>Kontoinformation</span>
        </div>
        <div className="bg-primary/10 rounded-md p-3">
          <p className="text-sm">
            <span className="font-medium">Konto skapad:</span>{" "}
            {formatDate(user.createdAt)}
          </p>
          <p className="text-sm">
            <span className="font-medium">Konto ålder:</span> {accountAgeInDays}{" "}
            dagar
          </p>
          <p className="text-sm">
            <span className="font-medium">Senaste inloggning:</span>{" "}
            {formatDate(user.lastLogin)}
          </p>
        </div>
      </div>

      {/* Activity status */}
      <div>
        <div className="mb-2 flex items-center gap-2 text-sm font-medium">
          <Clock className="text-primary/70 h-4 w-4" />
          <span>Kontostatus</span>
        </div>
        <div className="bg-primary/10 rounded-md p-3">
          <div className="flex items-center">
            <div
              className={`h-2 w-2 rounded-full ${user.lastLogin ? "bg-green-500" : "bg-amber-500"} mr-2`}
            ></div>
            <p className="text-sm">{user.lastLogin ? "Aktiv" : "Inaktiv"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
