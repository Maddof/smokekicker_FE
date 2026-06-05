import Link from "next/link";
import {
  ShoppingBag,
  Droplets,
  Calendar,
  Package2,
  Repeat,
  Leaf,
  ChevronsRight,
  Candy,
  Zap,
  Droplet,
  Truck,
} from "lucide-react";
import { normalizeHeroCategoryLinks } from "@/lib/cms/normalizeHeroCategoryLinks";
import { ROUTES } from "@/config/routes";
import { Button } from "../../ui/scn/button";
import Image from "next/image";
import { HeroContentWrapper } from "./HeroAnimation";

// Reusable USP Link Item component
function CategoryLinkItem({ href, icon: Icon, children }) {
  return (
    <li>
      <Link
        href={href}
        className="focus-visible:ring-primary flex h-full items-center gap-2 rounded-xl border border-neutral-800/60 bg-neutral-900/40 px-3 py-2 focus-visible:ring-2 focus-visible:outline-none"
      >
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4" aria-hidden="true" />
          <span>{children}</span>
        </div>
      </Link>
    </li>
  );
}

export default function SmokifyHero({
  categoryQuickLinks,
  className,
  eyebrowText,
  headline,
  description,
  primaryCta,
  secondaryCta,
  disclaimer,
}) {
  const resolvedEyebrowText = eyebrowText;
  const resolvedHeadline = headline;
  const resolvedDescription = description;
  const resolvedPrimaryCta = primaryCta;
  const resolvedSecondaryCta = secondaryCta;
  const resolvedDisclaimer = disclaimer;
  const normalizedCategoryQuickLinks =
    normalizeHeroCategoryLinks(categoryQuickLinks);
  const resolvedCategoryLinks =
    normalizedCategoryQuickLinks.length > 0
      ? normalizedCategoryQuickLinks
      : [];

  return (
    <section
      className={[
        "relative isolate overflow-hidden pb-6",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Decorative background */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-b from-neutral-900 to-black" />
        <div className="absolute -top-28 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />
        <svg
          className="absolute inset-0 -z-10 h-full w-full opacity-[0.07]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#grid)"
          />
        </svg>
        <div className="bg-primary/10 absolute top-1/2 right-0 h-72 w-72 -translate-y-1/2 rounded-full blur-3xl" />
      </div>

      <div className="container grid max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-2 lg:gap-16">
        {/* Left: copy & CTAs */}
        <div className="z-10">
          <HeroContentWrapper
            type="div"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-primary/25 border-primary/50 text-primary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium shadow-sm"
          >
            <Truck className="h-3.5 w-3.5" />
            {resolvedEyebrowText}
          </HeroContentWrapper>

          <HeroContentWrapper
            type="h1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.55 }}
            className="mt-4 max-w-2xl text-3xl font-semibold tracking-wide text-white sm:mt-5 sm:text-4xl md:text-5xl"
          >
            {(() => {
              const words = resolvedHeadline.split(" ");
              const gradientPart = words
                .slice(0, 2)
                .join(" ");
              const restPart = words.slice(2).join(" ");
              return (
                <>
                  <span className="from-primary bg-linear-to-r to-white bg-clip-text text-transparent">
                    {gradientPart}
                  </span>
                  {restPart && " " + restPart}
                </>
              );
            })()}
          </HeroContentWrapper>

          <HeroContentWrapper
            type="p"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-3 text-base leading-relaxed text-neutral-300 sm:text-lg"
          >
            {resolvedDescription}
          </HeroContentWrapper>

          {/* CTAs */}
          <HeroContentWrapper
            type="div"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.45 }}
            className="mt-6 grid w-full grid-cols-1 gap-3 sm:grid-cols-2"
          >
            <Button
              asChild
              className="w-full justify-center"
            >
              <Link
                href={ROUTES.SHOP.CATEGORY(
                  "nicotine-pouches",
                )}
              >
                <ShoppingBag className="mr-2 h-4 w-4" />{" "}
                {resolvedPrimaryCta}
              </Link>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-center border border-white/20 bg-transparent text-white hover:border-white/40 hover:bg-white/5 hover:text-white"
              asChild
            >
              <Link href={ROUTES.BRANDS.INDEX}>
                <Calendar className="mr-2 h-4 w-4" />{" "}
                {resolvedSecondaryCta}
              </Link>
            </Button>
          </HeroContentWrapper>

          {/* USPs */}
          {/* Disabled for now, can be re-enabled if we want to add quick links to popular categories in the hero section */}
          {/* <HeroContentWrapper
            type="ul"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.45 }}
            className="mt-8 grid grid-cols-1 gap-3 text-sm text-neutral-300 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
          >
            {resolvedCategoryLinks.map((item) => (
              <CategoryLinkItem
                key={`${item.href}-${item.label}`}
                href={item.href}
                icon={item.icon}
              >
                {item.label}
              </CategoryLinkItem>
            ))}
          </HeroContentWrapper> */}

          {/* Legal note */}
          <div className="mt-8 flex items-center gap-4">
            <Image
              className="w-10"
              src="/images/icons/plus-18_white.svg"
              alt="18 års gräns"
              width={48}
              height={48}
            />
            <p className="text-xs leading-relaxed text-neutral-400">
              {resolvedDisclaimer}
            </p>
          </div>
        </div>

        {/* Right: visual mockups */}
        <HeroContentWrapper
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative -top-10 z-0 h-full w-full"
        >
          {/* Main showcase container */}
          <div className="h-full w-full">
            {/* Background glow effects */}
            <div className="absolute inset-0 -z-10">
              <div className="bg-primary/30 absolute top-1/4 left-1/4 h-48 w-48 rounded-full blur-3xl" />
              <div className="absolute right-1/4 bottom-1/4 h-40 w-40 rounded-full bg-blue-400/20 blur-2xl" />
            </div>
            {/* Main product image */}
            <Image
              src="/images/other/kicking_cigarette.webp"
              alt="Kicking cigarette"
              width={120}
              height={160}
              className="h-full w-full object-contain opacity-40"
              loading="eager"
            />
          </div>
        </HeroContentWrapper>
      </div>
    </section>
  );
}
