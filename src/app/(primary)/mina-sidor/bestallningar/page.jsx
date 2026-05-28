import { fetchSession } from "@/lib/utils/auth/authDAL";
import { fetchRecentOrders } from "@/lib/utils/order/orderUtils";
import RecentOrderCard from "@/components/dashboard/orders/RecentOrderCard";
import DashboardSectionWrapper from "@/components/dashboard/DashboardSection";
import { ROUTES } from "@/config/routes";
import { SITE_NAME } from "@/config/metadata";
import QuickHeaderDashboardWrapper from "@/components/dashboard/QuickHeaderDashboard";
import QuickHeaderHeading from "@/components/dashboard/QuickHeaderHeading";
import QuickHeaderLink from "@/components/dashboard/QuickHeaderLink";

export const metadata = {
  title: `Mina beställningar - ${SITE_NAME}`,
  description: "Översikt över dina senaste beställningar på Smokify.",
};

export default async function RecentOrders() {
  const user = await fetchSession();

  if (!user) {
    return (
      <DashboardSectionWrapper>
        <p>Vänligen logga in för att se dina beställningar.</p>
      </DashboardSectionWrapper>
    );
  }

  // Fetch only the 3 most recent orders
  const orders = await fetchRecentOrders();

  if (orders.error) {
    return <p>Unable to fetch orders: {orders.error}</p>;
  }

  return (
    <DashboardSectionWrapper>
      <QuickHeaderDashboardWrapper>
        <QuickHeaderHeading heading="Senaste beställningar" />
        <QuickHeaderLink href={ROUTES.DASHBOARD.ORDERS.ALL}>
          Se alla beställningar
        </QuickHeaderLink>
      </QuickHeaderDashboardWrapper>

      {orders && orders.length > 0 ? (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <RecentOrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <p>Du har inga beställningar än.</p>
      )}
    </DashboardSectionWrapper>
  );
}
