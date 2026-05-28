import { fetchOrderDetails } from "@/lib/utils/order/orderUtils";
import OrderDetails from "@/components/dashboard/orders/orderDetails";
import { fetchSession } from "@/lib/utils/auth/authDAL";
import OrderDetailsSummary from "@/components/dashboard/orders/OrderDetailsSummary";
import DashboardSectionWrapper from "@/components/dashboard/DashboardSection";
import { ROUTES } from "@/config/routes";
import { SITE_NAME } from "@/config/metadata";
import QuickHeaderDashboardWrapper from "@/components/dashboard/QuickHeaderDashboard";
import QuickHeaderHeading from "@/components/dashboard/QuickHeaderHeading";
import QuickHeaderLink from "@/components/dashboard/QuickHeaderLink";

export const metadata = {
  title: `Order detaljer - ${SITE_NAME}`,
  description: "Se detaljer för din beställning på Smokify.",
};

export default async function OrderDetailsPage({ params }) {
  const { orderId } = await params;

  const user = await fetchSession();

  if (!user) {
    return (
      <DashboardSectionWrapper>
        <p>Vänligen logga in för att se dina beställningar.</p>
      </DashboardSectionWrapper>
    );
  }

  const order = await fetchOrderDetails(orderId);

  if (!order || order.error) {
    return (
      <section className="pt-8 pb-16">
        <div className="container">
          <p>Order not found or an error occurred.</p>
        </div>
      </section>
    );
  }

  return (
    <DashboardSectionWrapper>
      <QuickHeaderDashboardWrapper>
        <QuickHeaderHeading heading={`Order detaljer - #${order.id}`} />
        <QuickHeaderLink href={ROUTES.DASHBOARD.ORDERS.ALL}>
          Se alla beställningar
        </QuickHeaderLink>
      </QuickHeaderDashboardWrapper>

      <OrderDetailsSummary order={order} />

      <OrderDetails order={order} />
    </DashboardSectionWrapper>
  );
}
