import {
  fetchAllPredefinedBoxes,
  fetchSubscriptionBoxBySlug,
} from "@/lib/data/api/fetchSubs";
import SubscriptionForm from "@/components/subscriptions/form/SubscriptionForm";
import {
  fetchAllFreeStarterKitsByBrandSlug,
  fetchEjuicesAndIsForSub,
  fetchProductsByBrandIdAndIsForSub,
} from "@/lib/data/api/fetchProducts";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils/getUrl";
import SubscriptionFreeKitForm from "@/components/subscriptions/form/freeStarterKit/SubscriptionFreeKitForm";
import StepHeading from "@/components/subscriptions/StepHeading";
import { ROUTES } from "@/config/routes";
import { SITE_NAME } from "@/config/metadata";

const fallBackImage = "/images/fallback.png";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  // Fetch the subscription box by slug
  const subscriptionBox = await fetchSubscriptionBoxBySlug(slug);

  if (!subscriptionBox) {
    return {
      title: `Prenumeration ej hittad - Smokify`,
      description: "Den här prenumerationen kunde inte hittas.",
    };
  }

  // Prepare description - use subscription box description or a fallback
  const description =
    subscriptionBox.description ||
    `Prenumerera på ${subscriptionBox.name} från Smokify. Upptäck fördelarna med vår prenumerationstjänst och få dina favoritprodukter levererade direkt till din dörr.`;

  // Build canonical URL
  const url = `https://smokify.se${ROUTES.SHOP.SUBSCRIPTION(slug)}`;
  // Get image URL for social sharing
  const imageUrl = subscriptionBox.imgUrl
    ? getImageUrl(subscriptionBox.imgUrl)
    : null;

  return {
    title: `${subscriptionBox.name} - ${SITE_NAME}`,
    description: description,
    keywords: [
      subscriptionBox.name,
      "prenumeration",
      "e-juice prenumeration",
      "vape prenumeration",
      "e-cigarett prenumeration",
    ].join(", "),
    // Open Graph / Facebook
    openGraph: {
      title: `${subscriptionBox.name} - ${SITE_NAME}`,
      description: description,
      url: url,
      images: imageUrl ? [imageUrl] : [],
      type: "website",
      locale: "sv_SE",
    },
    twitter: {
      card: "summary_large_image",
      title: `${subscriptionBox.name} - ${SITE_NAME}`,
      description: description,
      images: imageUrl ? [imageUrl] : [],
    },
    alternates: {
      canonical: url,
    },
  };
}

export async function generateStaticParams() {
  if (process.env.NEXT_PUBLIC_SKIP_STATIC_GENERATION === "true") {
    return [];
  }
  const subscriptionBoxes = await fetchAllPredefinedBoxes(); // Fetch all subs during build time

  if (!subscriptionBoxes) return [];

  return subscriptionBoxes.map((subscription) => ({
    slug: subscription.slug, // Ensure it matches your dynamic route `[slug]`
  }));
}

// Helper function to fetch available items based on subscription type
async function fetchAvailableItems(subscription) {
  switch (subscription.subscriptionType) {
    case "E_JUICE":
      return await fetchEjuicesAndIsForSub();
    case "PREFILLED_POD":
      return await fetchProductsByBrandIdAndIsForSub(subscription.brandId);
    default:
      // Fallback to brand-based fetch if subscription type is unknown
      return await fetchProductsByBrandIdAndIsForSub(subscription.brandId);
  }
}

export default async function SingleSubBoxPage({ params }) {
  const { slug } = await params;
  const subscriptionBox = await fetchSubscriptionBoxBySlug(slug);
  // const availableItems = await fetchProductsByBrandIdAndIsForSub(
  //   subscriptionBox.brandId,
  // );
  const availableItems = await fetchAvailableItems(subscriptionBox);
  const freeStarterKits = await fetchAllFreeStarterKitsByBrandSlug(
    subscriptionBox.brand.slug,
  );

  if (!subscriptionBox) {
    return (
      <section>
        <div className="container">subscriptionBox not found!</div>
      </section>
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://smokify.se";

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Hem",
        item: `${siteUrl}${ROUTES.HOME}`,
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
        name: "Prenumerationer",
        item: `${siteUrl}${ROUTES.SHOP.SUBSCRIPTIONS}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: subscriptionBox.name,
        item: `${siteUrl}${ROUTES.SHOP.SUBSCRIPTION(subscriptionBox.slug)}`,
      },
    ],
  };

  return (
    <>
      <section className="relative flex min-h-144 flex-col justify-center py-0 lg:min-h-[46rem] xl:min-h-[58rem]">
        {/* Add JSON-LD to your page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <div className="absolute inset-0 z-0">
          <Image
            src={getImageUrl(subscriptionBox.imgUrl) || fallBackImage}
            alt={subscriptionBox.name}
            width={2064}
            height={1024}
            className="h-full w-full object-cover"
            sizes="100vw"
            priority
          />
          {/* Gradient overlay: from foreground to transparent */}
          <div className="from-foreground to-foreground/10 absolute inset-0 left-0 z-10 bg-gradient-to-t" />
        </div>

        <div className="relative top-0 bottom-0 z-10 container">
          <div className="text-secondary-foreground flex w-full flex-col items-center justify-center gap-4 bg-gradient-to-b from-black/10 via-black/5 to-transparent p-5 text-center">
            <h1 className="drop-shadow-md">{subscriptionBox.name}</h1>
            <hr className="bottom-0 z-10 mt-0 h-1 w-full border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400" />
            <p className="max-w-96 font-medium text-white drop-shadow-sm">
              {subscriptionBox.description}
            </p>
          </div>
        </div>
      </section>
      <section className="bg-secondary text-secondary-foreground neon-bg-radial-bottom-right">
        <div className="container max-w-[64rem]">
          <div className="flex flex-col items-center justify-center gap-16">
            <div className="flex w-full flex-col items-center justify-center md:w-4/5">
              <StepHeading
                title="Välj ett vape-kit"
                description="Välj ditt startkit. Ingår utan extra kostnad eller med reducerat pris på första leveransen."
              />
              <SubscriptionFreeKitForm starterKits={freeStarterKits} />
            </div>
            <div className="mt-12 w-full md:w-4/5">
              <StepHeading
                title="Välj antal och smaker i varje låda"
                description="Välj hur många smaker du vill ha i din låda. Du kan välja mellan 1-8 smaker per låda."
              />
              <SubscriptionForm
                subscription={subscriptionBox}
                availableItems={availableItems}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
