import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import BenefitsBanner from "@/components/BenefitsBanner";
import { SITE_NAME } from "@/config/metadata";

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://smokify.se",
  ),
  title: `${SITE_NAME} - Vape och vitt snus med omtanke`,
  description:
    "Vapes, förfyllda pods, e-cigaretter, vitt snus, smarta prenumerationer och nikotinersättning. Din väg till en rökfri vardag börjar här.",
};

export default function RootLayout({ children }) {
  return (
    <>
      <Header />
      <section className="bg-secondary border-primary/50 border-b pt-(--header-height) pb-0">
        <div className="container">
          <Breadcrumbs
            customLabels={{
              "/sok": "Sök",
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
