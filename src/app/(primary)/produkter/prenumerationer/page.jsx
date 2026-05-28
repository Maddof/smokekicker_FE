import { fetchAllPublishedAndPredefinedBoxes } from "@/lib/data/api/fetchSubs";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils/currencyFormatter";
import { ROUTES } from "@/config/routes";
import ShopHeader from "@/components/shop/ShopHeader";
import {
  categoryContent,
  categoryFaqContent,
} from "@/lib/data/categoryContent";
import { CATEGORY_SLUGS } from "@/lib/data/categorySlugs";
import ShopHeaderBelow from "@/components/shop/ShopHeaderBelow";
import CategoryPicker from "@/components/shop/CategoryPicker";
import {
  ArrowRight,
  Clock,
  CheckCircle,
} from "lucide-react";
import { getImageUrl } from "@/lib/utils/getUrl";
import FaqSection from "@/components/FaqSectionCategory";
import CategoryBenefits from "@/components/shop/products/CategoryBenefits";
import { getPageByKey } from "@/lib/cms/getPage";
import { buildCmsPageMetadata } from "@/lib/cms/pageMetadata";

async function getSubscriptionPage() {
  const page = await getPageByKey("subscriptions");
  return page;
}

export async function generateMetadata() {
  const page = await getSubscriptionPage();

  return buildCmsPageMetadata({
    page,
    fallbackTitle: `Smarta vape prenumerationer - Fri Frakt & Flexibla Leveranser`,
    fallbackDescription:
      "Vape prenumerationer som gör skillnad – mer hållbart än engångsvapes, mer flexibel än vanliga köp. Få favoritsmaker levererade direkt hem och med fri frakt.",
    defaultPath: ROUTES.SHOP.SUBSCRIPTIONS,
  });
}

export default async function SubscriptionsPage() {
  const subscriptionBoxesPublished =
    await fetchAllPublishedAndPredefinedBoxes();

  const headerConfig = categoryContent["prenumerationer"];
  const belowHeroConfig = headerConfig.belowHero;

  if (!subscriptionBoxesPublished) {
    return (
      <section>
        <div className="container">
          Subscription boxes not found!
        </div>
      </section>
    );
  }

  // Translate interval to Swedish
  const getIntervalText = (cycle, count) => {
    if (cycle === "week") {
      return count === 1
        ? "Varje vecka"
        : `Var ${count}:e vecka`;
    } else if (cycle === "month") {
      return count === 1
        ? "Varje månad"
        : `Var ${count}:e månad`;
    }
    return `${count} ${cycle}`;
  };

  // Generate breadcrumb JSON-LD
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://smokify.se";
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Hem",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Produkter",
        item: `${siteUrl}${ROUTES.SHOP.INDEX}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Vape Prenumerationer",
        item: `${siteUrl}${ROUTES.SHOP.SUBSCRIPTIONS}`,
      },
    ],
  };

  const faqPageJsonLd =
    categoryFaqContent[CATEGORY_SLUGS.SUBSCRIPTIONS]?.items
      ?.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: categoryFaqContent[
            CATEGORY_SLUGS.SUBSCRIPTIONS
          ].items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;
  return (
    <>
      {/* Add JSON-LD to your page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      {faqPageJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqPageJsonLd),
          }}
        />
      )}
      <ShopHeader
        title={headerConfig.title}
        description={headerConfig.description}
        showNavigationButtons={
          headerConfig.showNavigationButtons
        }
        backgroundImage={headerConfig.heroImage}
        backgroundAlt={headerConfig.heroImageAlt}
        viewProductsText="Se prenumerationer"
      />

      <ShopHeaderBelow
        title={belowHeroConfig.title}
        iconImgBg={belowHeroConfig.iconImgBg}
        inconImgBgAlt={belowHeroConfig.inconImgBgAlt}
        initialParagraphs={
          belowHeroConfig.initialParagraphs
        }
      >
        {belowHeroConfig.content}
      </ShopHeaderBelow>

      <CategoryPicker
        currentPath={ROUTES.SHOP.SUBSCRIPTIONS}
      />

      <section className="from-background to-secondary/10 bg-gradient-to-b">
        <div className="container">
          <h2 className="mb-4 text-center text-3xl font-bold">
            Vape prenumerationer
          </h2>

          <p className="text-muted mx-auto mb-2 max-w-2xl text-center">
            Vi erbjuder två typer av vape-prenumerationer.
            Den första är en prenumeration med förfyllda
            poddar, där du enkelt byter ut hela podden när
            den är slut. Den andra är en prenumeration med
            påfyllningsbara podsystem, där du också byter
            podd – men själv fyller på med e-vätska. Oavsett
            vilken prenumeration du väljer ingår alltid ett
            passande vape startkit. Du prenumererar antingen
            på förfyllda poddar eller på e-vätskor, beroende
            på vad som passar dig bäst.
          </p>
          <p className="text-muted mx-auto mb-2 max-w-2xl text-center">
            I båda prenumerationerna ingår även reservdelar
            som håller din vape-enhet i toppskick. Du
            anpassar själv din låda genom att välja smaker,
            antal produkter och leveransintervall. Vill du
            trappa ner? Lägg enkelt till nikotintuggummin
            eller nikotinfria alternativ i din nästa
            leverans.
          </p>
          <p className="text-muted mx-auto mb-12 max-w-2xl text-center">
            Du har alltid full kontroll över din
            prenumeration och kan ändra innehåll eller
            leveranser när som helst. Allt sköts från din
            kontrollpanel efter köp.
          </p>

          <div className="flex flex-col gap-20 md:gap-28">
            {subscriptionBoxesPublished.map(
              (subscription, index) => (
                <div
                  key={subscription.id}
                  className={`relative flex flex-col gap-10 lg:flex-row ${
                    index % 2 !== 0
                      ? "lg:flex-row-reverse"
                      : ""
                  }`}
                >
                  {/* Image Section */}
                  <div className="relative w-full lg:w-1/2">
                    <div className="aspect-4/3 rounded-2xl focus-within:ring-2 focus-within:ring-offset-2">
                      <Link
                        href={ROUTES.SHOP.SUBSCRIPTION(
                          subscription.slug,
                        )}
                        className="group block h-full w-full overflow-hidden rounded-2xl"
                      >
                        <Image
                          src={
                            getImageUrl(
                              subscription.imgUrl,
                            ) || fallBackImage
                          }
                          alt={subscription.name}
                          width={800}
                          height={600}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 group-focus-visible:scale-105"
                        />
                      </Link>
                    </div>

                    {/* Brand Badge */}
                    <div className="absolute top-0 mt-4 ml-2 flex w-full flex-wrap gap-2">
                      <div className="border-foreground bg-foreground flex items-center justify-center rounded-full border px-4 py-2 text-center text-xs font-medium text-white md:text-sm">
                        {subscription.subscriptionType ===
                        "E_JUICE"
                          ? "E-Juice Prenumeration"
                          : "Förfylld Pod Prenumeration"}
                      </div>

                      {/* Starter Kit Badge */}
                      {subscription.includesStarterKit && (
                        <div className="border-primary flex items-center justify-center rounded-full border bg-transparent px-4 py-2 text-center text-xs font-medium text-white md:text-sm">
                          Inkl. Startkit
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex w-full flex-col justify-center lg:w-1/2">
                    <Link
                      href={ROUTES.SHOP.SUBSCRIPTION(
                        subscription.slug,
                      )}
                      className="text-primary mb-1 text-sm font-medium"
                    >
                      <h3 className="text-2xl font-bold md:text-3xl">
                        {subscription.name}
                      </h3>
                    </Link>

                    <div className="mb-4 flex items-center gap-2">
                      <Clock className="text-primary h-4 w-4" />
                      <span className="text-muted text-sm">
                        {getIntervalText(
                          subscription.billingCycle,
                          subscription.intervalCount,
                        )}
                      </span>
                    </div>

                    <p className="mb-6">
                      {subscription.description}
                    </p>

                    <div className="border-primary mb-6 rounded-xl border p-4">
                      <h4 className="mb-1 flex items-center gap-2 font-medium">
                        <span>Utvalt smakurval:</span>
                      </h4>
                      <p className="mb-3 text-xs md:text-sm">
                        Varje prenumeration startar med
                        slumpmässigt valda smaker. Du kan
                        enkelt anpassa smakerna före eller
                        efter ditt köp.
                      </p>

                      <ul className="space-y-3">
                        {subscription.items.map((item) => (
                          <li
                            key={item.id}
                            className="flex items-center gap-3"
                          >
                            <div className="relative h-8 w-8 overflow-hidden rounded-md">
                              <Image
                                src={
                                  getImageUrl(
                                    item.product.imgUrl,
                                  ) || fallBackImage
                                }
                                alt={item.product.name}
                                width={40}
                                height={40}
                                className="object-contain"
                              />
                            </div>
                            <span>{item.product.name}</span>
                            <span className="ml-auto text-sm font-medium">
                              {item.quantity}x
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6 flex items-end justify-between">
                      <div>
                        <p className="text-muted mb-1 text-sm">
                          {subscription.subscriptionType ===
                          "E_JUICE"
                            ? "Pris per e-juice"
                            : "Pris per pod"}
                        </p>
                        <p className="text-primary text-3xl font-bold">
                          {formatCurrency(
                            subscription.price /
                              subscription.items.reduce(
                                (acc, item) =>
                                  acc + item.quantity,
                                0,
                              ),
                          )}
                        </p>
                      </div>
                    </div>

                    <ul className="grid gap-3 md:grid-cols-2">
                      <li className="text-muted flex items-center gap-2">
                        <CheckCircle className="h-6 w-6 text-green-500" />
                        <span>Ingen bindningstid</span>
                      </li>
                      <li className="text-muted flex items-center gap-2">
                        <CheckCircle className="h-6 w-6 text-green-500" />
                        <span>
                          Ändra eller avbryt när som helst
                        </span>
                      </li>
                      <li className="text-muted flex items-center gap-2">
                        <CheckCircle className="h-6 w-6 text-green-500" />
                        <span>
                          Gratis frakt på alla leveranser
                        </span>
                      </li>
                      <li className="text-muted flex items-center gap-2">
                        <CheckCircle className="h-6 w-6 text-green-500" />
                        <span>Ersättningsdelar ingår</span>
                      </li>
                    </ul>

                    <Link
                      href={ROUTES.SHOP.SUBSCRIPTION(
                        subscription.slug,
                      )}
                      className="bg-primary hover:bg-primary/90 group mt-8 inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium text-white transition-colors"
                    >
                      Anpassa din prenumeration
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>

                  {/* Decorative elements */}
                  <div
                    className={`absolute top-1/2 -z-10 hidden -translate-y-1/2 lg:block ${
                      index % 2 !== 0
                        ? "left-0 -translate-x-1/4"
                        : "right-0 translate-x-1/4"
                    }`}
                  >
                    <div className="bg-primary/5 h-[300px] w-[300px] rounded-full blur-3xl"></div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <FaqSection
        categorySlug={CATEGORY_SLUGS.SUBSCRIPTIONS}
      />

      <CategoryBenefits
        categorySlug={CATEGORY_SLUGS.SUBSCRIPTIONS}
      />
    </>
  );
}
