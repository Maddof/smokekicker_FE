import { fetchSession } from "@/lib/utils/auth/authDAL";
import { fetchUserActiveAndPastDueSubscriptions } from "@/lib/utils/subscriptions/subscriptionUtils";
import DashboardSectionWrapper from "@/components/dashboard/DashboardSection";
import SubscriptionCard from "@/components/dashboard/subscriptions/SubscriptionCard";
import { ROUTES } from "@/config/routes";
import { SITE_NAME } from "@/config/metadata";
import QuickHeaderDashboardWrapper from "@/components/dashboard/QuickHeaderDashboard";
import QuickHeaderHeading from "@/components/dashboard/QuickHeaderHeading";
import QuickHeaderLink from "@/components/dashboard/QuickHeaderLink";

export const metadata = {
  title: `Prenumerationer - ${SITE_NAME}`,
  description: "Hantera dina aktiva prenumerationer på Smokify.",
};

export default async function UserActiveSubscriptions() {
  const user = await fetchSession();

  if (!user) {
    return (
      <DashboardSectionWrapper>
        <p>Vänligen logga in för att se dina prenumerationer.</p>
      </DashboardSectionWrapper>
    );
  }

  // Fetch the user's active subscriptions
  const subscriptions = await fetchUserActiveAndPastDueSubscriptions();

  if (!subscriptions) {
    return (
      <DashboardSectionWrapper>
        <p>Unable to fetch subscriptions</p>
      </DashboardSectionWrapper>
    );
  }

  return (
    <DashboardSectionWrapper>
      <QuickHeaderDashboardWrapper>
        <QuickHeaderHeading heading="Aktiva prenumerationer" />
        <QuickHeaderLink href={ROUTES.DASHBOARD.SUBSCRIPTIONS.ALL}>
          Se alla prenumerationer
        </QuickHeaderLink>
      </QuickHeaderDashboardWrapper>
      {subscriptions && subscriptions.length > 0 ? (
        <div className="flex flex-col gap-4">
          {subscriptions.map((subscription) => (
            <SubscriptionCard
              key={subscription.id}
              subscription={subscription}
            />
          ))}
        </div>
      ) : (
        <p>Du har inga aktiva prenumerationer.</p>
      )}
    </DashboardSectionWrapper>
  );
}
