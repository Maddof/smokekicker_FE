import Image from "next/image";
import { Progress } from "@/components/ui/scn/progress";
import { Button } from "@/components/ui/scn/button";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Gift,
  Award,
  Package,
  Zap,
} from "lucide-react";
import { formatDate } from "@/lib/utils/dateFormatter";
import Link from "next/link";
import { ROUTES } from "@/config/routes";

// Helper function to get an appropriate icon based on perk name or category
function getPerkIcon(perk) {
  const name = perk.name.toLowerCase();

  if (name.includes("ersättning") || name.includes("kit")) {
    return <Package className="h-6 w-6" />;
  } else if (name.includes("rabatt") || name.includes("fri frakt")) {
    return <Zap className="h-6 w-6" />;
  } else if (name.includes("tillbehör")) {
    return <Award className="h-6 w-6" />;
  } else {
    return <Gift className="h-6 w-6" />;
  }
}

export default function PerkCard({ userPerk }) {
  // Handle case where nested perk data might be missing
  if (!userPerk.perk) {
    return (
      <div className="bg-secondary/10 rounded-lg border p-6 shadow-sm">
        <p className="text-muted-foreground">Perk information saknas</p>
      </div>
    );
  }

  const { perk } = userPerk;
  const progressPercentage = Math.min(
    (userPerk.orderCount / perk.requiredOrders) * 100,
    100,
  );

  return (
    <div className="border-primary/50 flex h-full flex-col rounded-lg border p-4 sm:p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="text-primary bg-primary/25 flex h-10 w-10 items-center justify-center rounded-full">
          {perk.imageUrl ? (
            <Image
              src={perk.imageUrl}
              alt={perk.name}
              width={24}
              height={24}
              className="h-6 w-6 object-contain"
            />
          ) : (
            getPerkIcon(perk)
          )}
        </div>
        <div>
          <h3 className="text-lg font-medium">{perk.name}</h3>
          <p className="text-muted-foreground text-sm">{perk.description}</p>
        </div>
      </div>

      <div className="mb-4 flex h-full flex-col space-y-3">
        {/* Eligibility status */}
        <div className="flex items-center gap-2">
          {userPerk.isEligible ? (
            <>
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span className="font-medium text-green-600">
                Tillgänglig att använda
              </span>
            </>
          ) : (
            <>
              <Clock className="h-5 w-5 text-amber-500" />
              <span className="text-muted-foreground">
                Inte tillgänglig ännu
              </span>
            </>
          )}
        </div>

        {/* Progress bar */}
        {!userPerk.isEligible && perk.requiredOrders > 0 && (
          <div className="mt-auto space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>
                Framsteg: {userPerk.orderCount}/{perk.requiredOrders}{" "}
                beställningar
              </span>
              <span>{progressPercentage.toFixed(0)}%</span>
            </div>
            <Progress value={progressPercentage} className="bg-accent h-2" />
          </div>
        )}

        {/* Redemption info */}
        {userPerk.redeemedCount > 0 && (
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>Använt {userPerk.redeemedCount} gånger</span>
          </div>
        )}

        {/* Next eligible date */}
        {userPerk.nextEligibleDate && (
          <div className="flex items-center gap-2 text-sm">
            <CalendarDays className="h-4 w-4 text-blue-500" />
            <span>
              Nästa tillgänglig datum: {formatDate(userPerk.nextEligibleDate)}
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-auto">
        {userPerk.isEligible ? (
          <Button asChild className="w-full">
            <Link href={`${ROUTES.DASHBOARD.PERKS}/${perk.slug}`}>
              Utforska produkter
            </Link>
          </Button>
        ) : (
          <Button
            variant="outline"
            disabled
            className="text-muted-foreground w-full"
          >
            Inte tillgänglig ännu
          </Button>
        )}
      </div>
    </div>
  );
}
