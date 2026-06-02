import Chat from "@/components/flavor-personality/ChatWrapper";
import { ROUTES } from "@/config/routes";
import { SITE_NAME } from "@/config/metadata";
import Image from "next/image";
import { getPageByKey } from "@/lib/cms/getPage";
import getFieldValue from "@/lib/cms/getFieldValue";
import { getImageUrl } from "@/lib/utils/getUrl";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://smokify.se";

// const SITE_URL = "https://logiest-kingston-citizenly.ngrok-free.dev";

function getSanitizedParam(rawValue, maxLength = 160) {
  if (!rawValue) return "";
  const value = String(rawValue).trim();
  return value.slice(0, maxLength);
}

async function getTastePage() {
  const page = await getPageByKey("taste-personality");
  return page;
}

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;

  const personalityName = getSanitizedParam(
    params?.personalityName,
    70,
  );
  const headline = getSanitizedParam(params?.headline, 180);
  const descriptionParam = getSanitizedParam(
    params?.description,
    240,
  );
  const shareText = getSanitizedParam(
    params?.shareText,
    240,
  );

  const hasDynamicResult = Boolean(
    personalityName || headline || descriptionParam,
  );

  const title = hasDynamicResult
    ? `${personalityName + ", " + headline || "Your flavor personality"}`
    : "What flavor are you? - Flavor Personality Test | Smokekicker";

  const description =
    shareText ||
    descriptionParam ||
    headline ||
    "Answer, click, done: your flavor personality and tailored AI recommendations are served directly. Flavor magic!";

  const pageUrl = hasDynamicResult
    ? `${SITE_URL}${ROUTES.PERSONALITY}?personalityName=${encodeURIComponent(personalityName)}&headline=${encodeURIComponent(headline)}&description=${encodeURIComponent(descriptionParam)}&shareText=${encodeURIComponent(shareText)}`
    : `${SITE_URL}${ROUTES.PERSONALITY}`;

  const ogImage = `${SITE_URL}/${ROUTES.PERSONALITY}/og?text=${encodeURIComponent(personalityName || "Flavor Personality Test")}&headline=${encodeURIComponent(headline || "")}&shareText=${encodeURIComponent(shareText || "")}`;

  return {
    title,
    description,
    alternates: {
      canonical: SITE_URL + ROUTES.PERSONALITY,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Smokekicker flavor personality",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: ogImage,
          alt: "Smokekicker flavor personality",
          type: "image/png",
        },
      ],
    },
  };
}

export default async function FlavorPersonality() {
  const page = await getTastePage();

  if (!page) {
    return (
      <div className="container py-16">
        <h1 className="text-3xl font-bold">
          Welcome to {SITE_NAME}
        </h1>
        <p className="text-muted-foreground mt-4">
          Unfortunately, we couldn't load the content for
          this page at the moment. Please try again later.
        </p>
      </div>
    );
  }

  const heroImage =
    getFieldValue(page, "hero", "backgroundImage") || {};

  return (
    <>
      <section className="neon-bg-radial-bottom-right py-6 sm:py-8">
        <div className="container">
          <div className="relative h-96 overflow-hidden rounded-3xl border border-cyan-200/30 sm:h-125">
            <Image
              // src="/images/bg/vilken_smak_ar_du_neon-futur.webp"
              src={getImageUrl(heroImage?.url)}
              alt={heroImage?.altText || heroImage?.title}
              width={heroImage?.width || 1200}
              height={heroImage?.height || 655}
              className="h-full w-full object-cover"
              style={{ objectPosition: "50% 15%" }}
            />

            <div className="absolute inset-0 bg-linear-to-tr from-black/65 via-cyan-900/45 to-cyan-950/10" />

            <p className="absolute bottom-6 left-6 inline-flex rounded-full border border-cyan-200/40 bg-cyan-300/15 px-3 py-1 text-xs font-semibold tracking-[0.08em] text-cyan-100 uppercase">
              {getFieldValue(page, "hero", "subHeadline") ||
                "What flavor are you?"}
            </p>
          </div>
        </div>
      </section>
      <section className="neon-bg-radial-top-right py-4">
        <div className="text-secondary-foreground container min-h-[72vh] py-12">
          <div className="mx-auto max-w-260">
            <h1 className="mb-4 text-center">
              {getFieldValue(page, "chat", "headline")}
            </h1>
            <p className="mx-auto mb-6 max-w-96 text-center">
              {getFieldValue(page, "chat", "description") ||
                ""}
            </p>
            <Chat />
          </div>
        </div>
      </section>
    </>
  );
}
