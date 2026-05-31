import DashboardSectionWrapper from "@/components/dashboard/DashboardSection";
import { SITE_NAME } from "@/config/metadata";

export const metadata = {
  title: `Mina sidor - ${SITE_NAME}`,
  description: "Din personliga kontrollpanel på Smokify.",
};

export default async function UserDashboard() {
  return (
    <DashboardSectionWrapper>
      <h2 className="text-secondary-foreground border-primary mb-12 border-l-8 pl-3 text-sm font-semibold uppercase">
        Översikt
      </h2>
      <p>
        Här i din personliga dashboard kan du hantera ditt konto och få en
        översikt över dina aktiviteter. Se dina tidigare beställningar, hantera
        prenumerationer, uppdatera ditt konto och personliga uppgifter. Navigera
        dig rätt med hjälp av knapparna i menyn.
      </p>
    </DashboardSectionWrapper>
  );
}
