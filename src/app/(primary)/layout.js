import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import BenefitsBanner from "@/components/BenefitsBanner";
import { SITE_NAME } from "@/config/metadata";

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      "https://smokekicker.com",
  ),
  title: `${SITE_NAME} - Buy Nicotine Pouches Online Worldwide | Fast EU Shipping`,
  description:
    "Discover premium nicotine pouches at Smokekicker. Fast worldwide shipping, modern flavors, and smoke-free nicotine products for every lifestyle.",
};

export default function RootLayout({ children }) {
  return (
    <>
      <Header />
      <section className="bg-secondary border-primary/50 border-b pt-(--header-height) pb-0">
        <div className="container">
          <Breadcrumbs
            customLabels={{
              "/search": "Search",
            }}
          />
        </div>
      </section>
      <BenefitsBanner />

      <main style={{ minHeight: "72vh" }}>{children}</main>
      <Footer />
    </>
  );
}
