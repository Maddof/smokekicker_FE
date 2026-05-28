import { fetchsubscriptionDetails } from "@/lib/utils/subscriptions/subscriptionUtils";
import { fetchSession } from "@/lib/utils/auth/authDAL";
import {
  fetchEjuicesAndIsForSub,
  fetchProductsByBrandIdAndIsForSub,
} from "@/lib/data/api/fetchProducts";
import ManageSubscription from "./ManageSubscription";
import DashboardSectionWrapper from "@/components/dashboard/DashboardSection";
import { ROUTES } from "@/config/routes";
import { SITE_NAME } from "@/config/metadata";
import QuickHeaderDashboardWrapper from "@/components/dashboard/QuickHeaderDashboard";
import QuickHeaderHeading from "@/components/dashboard/QuickHeaderHeading";
import QuickHeaderLink from "@/components/dashboard/QuickHeaderLink";

export const metadata = {
  title: `Prenumerations detaljer - ${SITE_NAME}`,
  description: "Hantera dina prenumerationer på Smokify.",
};

// Helper function to fetch available items based on subscription type
async function fetchAvailableItems(subscription) {
  switch (subscription.subscriptionType) {
    case "E_JUICE":
      return await fetchEjuicesAndIsForSub();
    case "PREFILLED_POD":
      return await fetchProductsByBrandIdAndIsForSub(subscription.brandId);
    default:
      // Fallback to brand-based fetch if subscription type is unknown
      return await fetchProductsByBrandIdAndIsForSub(subscription.brandId);
  }
}

export default async function SubscriptionDetailsPage({ params }) {
  const { id } = await params;

  const user = await fetchSession();

  if (!user) {
    return (
      <DashboardSectionWrapper>
        <p>Vänligen logga in för att se dina prenumerationer.</p>
      </DashboardSectionWrapper>
    );
  }

  const subscription = await fetchsubscriptionDetails(id);

  // Fetch available items based on subscription type
  const availableItems = await fetchAvailableItems(subscription);

  if (subscription.error) {
    return <p>{subscription.error}</p>;
  }

  if (!subscription) {
    return (
      <DashboardSectionWrapper>
        <div className="container">
          <h1>Prenumerations detaljer</h1>
          <p>Subscription not found or an error occurred.</p>
        </div>
      </DashboardSectionWrapper>
    );
  }

  return (
    <DashboardSectionWrapper>
      <QuickHeaderDashboardWrapper>
        <QuickHeaderHeading
          heading={`Prenumerations detaljer - ${subscription.id}`}
        />
        <QuickHeaderLink href={ROUTES.DASHBOARD.SUBSCRIPTIONS.ALL}>
          Se alla prenumerationer
        </QuickHeaderLink>
      </QuickHeaderDashboardWrapper>

      {/* Pass all data to ManageSubscription which will handle both display and form */}
      <ManageSubscription
        initialSubscription={subscription}
        availableItems={availableItems}
      />
    </DashboardSectionWrapper>
  );
}
