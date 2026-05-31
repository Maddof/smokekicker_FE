import { getUserAndAddressById } from "@/lib/utils/user/userProfileUtils";
import UserProfileForm from "./profileForm";
import DashboardSectionWrapper from "@/components/dashboard/DashboardSection";
import { Star, User } from "lucide-react";
import UserAccountStatus from "@/components/dashboard/account/UserAccountStatus";
import CustomerStripePaymentMethodsDisplay from "./PaymentMethodsCustomer";
import { fetchSession } from "@/lib/utils/auth/authDAL";

export const metadata = {
  title: `Konto - Smokify`,
  description: "Hantera din kontoinformation på Smokify.",
};

// Force Next.js to treat this as a dynamic page
export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const user = await fetchSession();

  if (!user) {
    return (
      <DashboardSectionWrapper>
        <p>Vänligen logga in för att se din profil.</p>
      </DashboardSectionWrapper>
    );
  }
  // // Access user from db
  const userDb = await getUserAndAddressById();
  const initialData = {
    givenName: userDb?.givenName || "",
    surname: userDb?.surname || "",
    email: userDb?.email || "",
    phone: userDb?.phone || "",
    postalCode: userDb?.addresses?.[0]?.postalCode || "",
    city: userDb?.addresses?.[0]?.city || "",
    line1: userDb?.addresses?.[0]?.line1 || "",
  };

  return (
    <DashboardSectionWrapper>
      <h2 className="text-secondary-foreground border-primary mb-12 border-l-8 pl-3 text-sm font-semibold uppercase">
        Konto
      </h2>
      <div className="grid gap-6 md:grid-cols-5">
        <div className="border-primary/50 rounded-lg border p-6 md:col-span-3">
          <h3 className="mb-2 flex items-center gap-2 font-medium">
            <User className="text-primary h-5 w-5" />
            <span>Konto information</span>
          </h3>
          <p className="text-muted-foreground mb-8">
            Du kan uppdatera din e-postadress och telefonnummer nedan. Namn och
            adressuppgifter hämtas från folkbokföringen och kan inte ändras.
          </p>
          <UserProfileForm data={initialData} />
        </div>
        <div className="border-primary/50 rounded-lg border p-6 md:col-span-2">
          <h3 className="mb-2 flex items-center gap-2 font-medium">
            <Star className="text-primary h-5 w-5" />
            <span>Konto status</span>
          </h3>
          <p className="text-muted-foreground mb-8">
            Visa din nuvarande kontostatus.
          </p>
          <UserAccountStatus user={userDb} />

          <CustomerStripePaymentMethodsDisplay />
        </div>
      </div>
    </DashboardSectionWrapper>
  );
}
