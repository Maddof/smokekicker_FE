import "./globals.css";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { Montserrat } from "next/font/google";
import { CheckoutProvider } from "./context/CheckoutContext";

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      "https://smokekicker.com",
  ),
  title: `Nicotine Pouches Online | EU & Worldwide Shipping`,
  description:
    "Buy nicotine pouches and tobacco freee snus on Smokekicker.com. Fast EU & International shipping, secure payments and trackable orders straight to your door",
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
