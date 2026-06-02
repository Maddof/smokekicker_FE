import "./globals.css";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { Montserrat } from "next/font/google";
import { CheckoutProvider } from "./context/CheckoutContext";
import { SITE_NAME } from "@/config/metadata";

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      "https://smokify.se",
  ),
  title: `${SITE_NAME} - Vape och vitt snus med omtanke`,
  description:
    "Förfyllda pods, e-cigaretter, vitt snus, unika prenumerationer och nikotinersättning. Din väg till en rökfri vardag börjar här.",
};

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-montserrat",
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth" // to disable smooth scrolling when routing via Next.js
      className={`${montserrat.variable} scroll-pt-(--header-height) scroll-smooth`}
    >
      <body>
        <AuthProvider>
          <CartProvider>
            <CheckoutProvider>{children}</CheckoutProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
