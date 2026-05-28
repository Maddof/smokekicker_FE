import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/scn/table";

import { fetchSession } from "@/lib/utils/auth/authDAL";
import { fetchUserOrders } from "@/lib/utils/order/orderUtils";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils/currencyFormatter";
import { formatDate } from "@/lib/utils/dateFormatter";
import { PaginationComponent } from "@/components/pagination";
import { buttonVariants } from "@/components/ui/scn/button";
import DashboardSectionWrapper from "@/components/dashboard/DashboardSection";
import { ROUTES } from "@/config/routes";
import { translateOrderStatus } from "@/lib/utils/translations";
import { SITE_NAME } from "@/config/metadata";
import QuickHeaderHeading from "@/components/dashboard/QuickHeaderHeading";
import QuickHeaderLink from "@/components/dashboard/QuickHeaderLink";

export const metadata = {
  title: `Mina beställningar - ${SITE_NAME}`,
  description: "Hantera dina beställningar på Smokify.",
};

export default async function UserOrders({ searchParams }) {
  const { page } = await searchParams;

  const user = await fetchSession();

  if (!user) {
    return (
      <DashboardSectionWrapper>
        <p>Vänligen logga in för att se dina beställningar.</p>
      </DashboardSectionWrapper>
    );
  }

  const data = await fetchUserOrders(page);

  //Handle errors from the API
  if (data.error) {
    if (data.error === "Unauthorized. Please log in.") {
      // Redirect to login or display a message
      return <p>{data.error}</p>;
    }
    return <p>Unable to fetch orders: {data.error}</p>;
  }

  const { orders, totalOrders, currentPage, totalPages } = data;

  // console.log(orders);
  if (!orders || orders.length === 0) {
    return <p>No orders currently</p>;
  }

  return (
    <DashboardSectionWrapper>
      <div className="mb-10 flex items-start justify-between">
        <QuickHeaderHeading heading="Alla beställningar" />
        <QuickHeaderLink href={ROUTES.DASHBOARD.ORDERS.INDEX}>
          Se senaste beställningar
        </QuickHeaderLink>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="uppercase">ID</TableHead>
            <TableHead className="uppercase">Datum</TableHead>
            <TableHead className="uppercase">Total</TableHead>
            <TableHead className="uppercase">Status</TableHead>
            <TableHead className="uppercase">Åtgärder</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} className="border-b-muted">
              <TableCell>...{order.id.slice(-4)}</TableCell>
              <TableCell> {formatDate(order.createdAt)}</TableCell>
              <TableCell>{formatCurrency(order.totalAmount)}</TableCell>
              <TableCell>{translateOrderStatus(order.status)}</TableCell>
              <TableCell>
                <Link
                  href={`${order.id}`}
                  className={buttonVariants({ variant: "outline" })}
                >
                  Detaljer
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationComponent pageCount={totalPages} />
    </DashboardSectionWrapper>
  );
}
