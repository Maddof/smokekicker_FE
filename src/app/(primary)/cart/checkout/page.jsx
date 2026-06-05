import { getUserAndAddressById } from "@/lib/utils/user/userProfileUtils";
import Checkout from "./Checkout";
import { fetchCartFromBackend } from "@/lib/utils/user/userUtils";
import { getAccessTokenFromCookies } from "@/lib/utils/cookies/cookies";
import { fetchSession } from "@/lib/utils/auth/authDAL";
import { ROUTES } from "@/config/routes";
import Link from "next/link";
import { LogInIcon } from "lucide-react";

export default async function CheckoutPage() {
  const session = await fetchSession();
  if (!session) {
    return (
      <section className="neon-bg-radial-top-right text-secondary-foreground min-h-[72vh]">
        <div className="container">
          <div className="max-w-3xl">
            <h1>Not live</h1>
            <p className="mt-4">
              Currently not selling to the public.
            </p>
            <p className="text-muted-foreground mt-2">
              We process your personal data during login to
              verify your identity and comply with legal
              requirements. Learn more about how we handle
              your data in our{" "}
              <Link href={ROUTES.PRIVACY}>
                privacy policy
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    );
  }
  const user = await getUserAndAddressById();
  const token = await getAccessTokenFromCookies();
  const cart = await fetchCartFromBackend(token);
  if (!cart || cart.items.length === 0) {
    return (
      <section>
        <div className="container">
          <p>
            Your cart is empty. Add some products to your
            cart before proceeding to checkout.
          </p>
          <a
            href={ROUTES.SHOP.INDEX}
            className="bg-primary mt-4 inline-block rounded-md px-6 py-2 text-white"
          >
            Continue Shopping
          </a>
        </div>
      </section>
    );
  }
  // Pre-fill initial data for the checkout form
  const initialData = {
    givenName: user?.givenName || "",
    surname: user?.surname || "",
    email: user?.email || "",
    phone: user?.phone || "",
    postalCode: user?.addresses?.[0]?.postalCode || "",
    city: user?.addresses?.[0]?.city || "",
    line1: user?.addresses?.[0]?.line1 || "",
  };
  return (
    <div className="neon-bg-radial-top-right text-secondary-foreground min-h-[72vh]">
      <Checkout initialData={initialData} />
    </div>
  );
}
