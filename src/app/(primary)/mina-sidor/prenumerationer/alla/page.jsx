import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/scn/table";
import { fetchSession } from "@/lib/utils/auth/authDAL";
import { fetchUserSubscriptions } from "@/lib/utils/subscriptions/subscriptionUtils";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils/currencyFormatter";
import { formatDate } from "@/lib/utils/dateFormatter";
import { PaginationComponent } from "@/components/pagination";
import { buttonVariants } from "@/components/ui/scn/button";
import DashboardSectionWrapper from "@/components/dashboard/DashboardSection";
import { ROUTES } from "@/config/routes";
import { translateSubscriptionStatus } from "@/lib/utils/translations";
import { SITE_NAME } from "@/config/metadata";
import QuickHeaderDashboardWrapper from "@/components/dashboard/QuickHeaderDashboard";
import QuickHeaderHeading from "@/components/dashboard/QuickHeaderHeading";
import QuickHeaderLink from "@/components/dashboard/QuickHeaderLink";

export const metadata = {
  title: `Mina prenumerationer - ${SITE_NAME}`,
  description: "Hantera dina prenumerationer på Smokify.",
};

export default async function UserSubscriptions({ searchParams }) {
  const { page } = (await searchParams) || {};
  const user = await fetchSession();

  if (!user) {
    return <p>Please log in to view your subscriptions.</p>;
  }

  // Fetch the user's subscriptions (implement fetchUserSubscriptions in your utils)
  const data = await fetchUserSubscriptions(page);

  if (data.error) {
    if (data.error === "Unauthorized. Please log in.") {
      return <p>{data.error}</p>;
    }
    return <p>Unable to fetch subscriptions: {data.error}</p>;
  }

  const { subscriptions, totalSubscriptions, currentPage, totalPages } = data;

  if (!subscriptions || subscriptions.length === 0) {
    return (
      <DashboardSectionWrapper>
        <p>Inga prenumerationer hittades.</p>
      </DashboardSectionWrapper>
    );
  }

  return (
    <DashboardSectionWrapper>
      <QuickHeaderDashboardWrapper>
        <QuickHeaderHeading heading="Alla prenumerationer" />
        <QuickHeaderLink href={ROUTES.DASHBOARD.SUBSCRIPTIONS.ACTIVE}>
          Se aktiva prenumerationer
        </QuickHeaderLink>
      </QuickHeaderDashboardWrapper>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="uppercase">ID</TableHead>
            <TableHead className="uppercase">Name</TableHead>
            <TableHead className="uppercase">Skapad</TableHead>
            <TableHead className="uppercase">Pris</TableHead>
            <TableHead className="uppercase">Status</TableHead>
            <TableHead className="uppercase">Faktureringscykel</TableHead>
            <TableHead className="uppercase">Intervallräkning</TableHead>
            <TableHead className="uppercase">Åtgärder</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscriptions.map((sub) => (
            <TableRow key={sub.id} className="border-b-muted">
              <TableCell>...{sub.id.slice(-4)}</TableCell>
              <TableCell>{sub.name}</TableCell>
              <TableCell>{formatDate(sub.createdAt)}</TableCell>
              <TableCell>{formatCurrency(sub.price)}</TableCell>
              <TableCell>{translateSubscriptionStatus(sub.status)}</TableCell>
              <TableCell>{sub.billingCycle}</TableCell>
              <TableCell>{sub.intervalCount}</TableCell>
              <TableCell>
                <Link
                  href={ROUTES.DASHBOARD.SUBSCRIPTIONS.DETAIL(sub.id)}
                  className={buttonVariants({ variant: "outline" })}
                >
                  Hantera
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
