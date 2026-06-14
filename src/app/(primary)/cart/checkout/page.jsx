import { cookies } from "next/headers";

import { getUserAndAddressById } from "@/lib/utils/user/userProfileUtils";
import Checkout from "./Checkout";
import { getAccessTokenFromCookies } from "@/lib/utils/cookies/cookies";
import { fetchSession } from "@/lib/utils/auth/authDAL";
import { ROUTES } from "@/config/routes";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const GUEST_CART_COOKIE_NAME =
  process.env.NEXT_PUBLIC_GUEST_CART_COOKIE_NAME ||
  "guest_cart";

const EmptyCart = () => (
  <section className="neon-bg-radial-top-right text-secondary-foreground min-h-[72vh]">
    <div className="container">
      <p>
        Your cart is empty. Add some products to your cart
        before proceeding to checkout.
      </p>
      <a
        href={ROUTES.SHOP.CATEGORY("nicotine-pouches")}
        className="bg-primary mt-4 inline-block rounded-md px-6 py-2 text-white"
      >
        Continue Shopping
      </a>
    </div>
  </section>
);

const fetchCartFromBackend = async (token) => {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.get(
      GUEST_CART_COOKIE_NAME,
    );

    const headers = {
      Cookie: cookieHeader
        ? `${GUEST_CART_COOKIE_NAME}=${cookieHeader.value}`
        : "",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: "GET",
      cache: "no-store", // Ensure we get the latest cart data
      headers: headers,
    });

    if (!response.ok) {
      // return null; // Return null if cart is empty or there's an error
      throw new Error("Failed to fetch cart.");
    }

    const data = await response.json();
    return data; // Return the data to the caller
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error; // Let the caller handle the error
  }
};

export default async function CheckoutPage() {
  const session = await fetchSession();
  const token = session
    ? await getAccessTokenFromCookies()
    : null;
  const cart = await fetchCartFromBackend(token);

  if (!cart || cart.items.length === 0) {
    return <EmptyCart />;
  }

  let user = null;
  if (session) {
    user = await getUserAndAddressById();
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
