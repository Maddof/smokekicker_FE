import { fetchSession } from "@/lib/utils/auth/authDAL";
import { fetchUserPerks } from "@/lib/utils/perks/fetchPerks";
import DashboardSectionWrapper from "@/components/dashboard/DashboardSection";
import { Button } from "@/components/ui/scn/button";
import { Gift } from "lucide-react";
import PerkCard from "./PerkCard";
import { ROUTES } from "@/config/routes";
import Link from "next/link";
import { SITE_NAME } from "@/config/metadata";

export const metadata = {
  title: `Perks - ${SITE_NAME}`,
  description: "Upptäck dina exklusiva perks på Smokify.",
};

export default async function PerksPage() {
  const user = await fetchSession();

  if (!user) {
    return (
      <DashboardSectionWrapper>
        <p>Vänligen logga in för att se tillgång till dina reservdelar.</p>
      </DashboardSectionWrapper>
    );
  }

  const userPerks = await fetchUserPerks();

  if (userPerks.error) {
    return (
      <DashboardSectionWrapper>
        <h2 className="text-secondary-foreground border-primary mb-12 border-l-8 pl-3 text-sm font-semibold uppercase">
          Perks
        </h2>
        <p>Error: {userPerks.error}</p>
      </DashboardSectionWrapper>
    );
  }

  return (
    <DashboardSectionWrapper>
      <h2 className="text-secondary-foreground border-primary mb-8 border-l-8 pl-3 text-sm font-semibold uppercase">
        Reservdelar
      </h2>

      <div className="mb-8 max-w-3xl">
        <p className="text-muted-foreground">
          Här hittar du reservdelar och underhållsprodukter för din vape –
          exempelvis coils, ersättningspods, laddare och liknande. Dessa
          produkter hjälper dig att hålla din utrustning i gott skick. Baserat
          på din orderhistorik kan du kvalificera dig för olika reservdelar utan
          extra kostnad.
        </p>
      </div>

      {userPerks.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <Gift className="text-primary mx-auto mb-4 h-12 w-12" />
          <h3 className="mb-2 text-lg font-medium">Inga reservdelar ännu</h3>
          <p className="text-muted-foreground mx-auto mb-4 max-w-md">
            Du har inte tillgång till några stödprodukter ännu. Med tiden och
            fortsatt användning kan du få tillgång till ersättningsdelar och
            underhållsprodukter för din vape.
          </p>
          <Button asChild>
            <Link href={ROUTES.SHOP.INDEX}>Utforska produkter</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {userPerks.map((userPerk) => (
            <PerkCard key={userPerk.id} userPerk={userPerk} />
          ))}
        </div>
      )}
    </DashboardSectionWrapper>
  );
}
