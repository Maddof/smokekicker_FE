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
            <Droplets className="h-3.5 w-3.5" />{" "}
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
                .slice(0, 4)
                .join(" ");
              const restPart = words.slice(4).join(" ");
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
          <HeroContentWrapper
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
          </HeroContentWrapper>

          {/* Legal note */}
          <div className="mt-6 flex items-center gap-4">
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
          className="relative -top-10 z-0"
        >
          {/* Main showcase container */}
          <div className="relative mx-auto aspect-square w-full max-w-md">
            {/* Background glow effects */}
            <div className="absolute inset-0 -z-10">
              <div className="bg-primary/30 absolute top-1/4 left-1/4 h-48 w-48 rounded-full blur-3xl" />
              <div className="absolute right-1/4 bottom-1/4 h-40 w-40 rounded-full bg-blue-400/20 blur-2xl" />
              <div className="absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-400/15 blur-xl" />
            </div>

            {/* Vape device - main focus */}
            <HeroContentWrapper
              initial={{ opacity: 0, y: 20, rotate: -5 }}
              animate={{ opacity: 1, y: 0, rotate: -5 }}
              transition={{
                delay: 0.15,
                type: "spring",
                stiffness: 120,
                damping: 18,
              }}
              className="absolute top-8 right-4 z-20 w-48 sm:w-56 md:w-64"
            >
              <div className="rounded-2xl border border-white/20 bg-linear-to-b from-white/10 to-white/5 p-4 shadow-2xl backdrop-blur-sm">
                <div className="relative flex aspect-2/3 w-full items-center justify-center overflow-hidden rounded-xl bg-linear-to-b from-slate-800/50 to-slate-900/50">
                  {/* Vape sketch image */}
                  <Image
                    src="/images/other/vape_neon-blue.webp"
                    alt="Vape device"
                    width={120}
                    height={160}
                    className="w-4/5 object-cover opacity-40"
                  />
                </div>
                {/* Product info */}
                <div className="mt-3 space-y-1">
                  <div className="h-2 w-3/4 rounded-full bg-white/30" />
                  <div className="h-2 w-1/2 rounded-full bg-white/20" />
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-white/80">
                      Vape prenumeration
                    </span>
                  </div>
                </div>
              </div>
            </HeroContentWrapper>

            {/* Pod collection - floating */}
            <HeroContentWrapper
              initial={{ opacity: 0, x: -20, rotate: 8 }}
              animate={{ opacity: 1, x: 0, rotate: 8 }}
              transition={{
                delay: 0.25,
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
              className="absolute top-6 left-2 z-10 w-40 sm:w-44"
            >
              <div className="rounded-xl border border-white/15 bg-linear-to-br from-white/8 to-white/3 p-3 shadow-xl backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-2">
                  {/* Individual pods */}
                  {[
                    {
                      color: "bg-blue-500/25",
                      name: "Blue Razz",
                    },
                    {
                      color: "bg-pink-500/25",
                      name: "Strawberry",
                    },
                    {
                      color: "bg-green-500/25",
                      name: "Lemon Lime",
                    },
                    {
                      color: "bg-purple-500/25",
                      name: "Grape",
                    },
                  ].map((pod, i) => (
                    <div
                      key={i}
                      className={`flex min-h-16 flex-col items-center justify-center rounded-lg ${pod.color} p-2`}
                    >
                      <span className="text-center text-[10px] text-white/50">
                        {pod.name}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 border-t border-white/10 pt-2">
                  <span className="text-xs text-white/80">
                    Förfyllda Pods & E-juice
                  </span>
                </div>
              </div>
            </HeroContentWrapper>

            {/* Tuggummi/Gum - bottom right */}
            <HeroContentWrapper
              initial={{ opacity: 0, y: 20, rotate: -8 }}
              animate={{ opacity: 1, y: 0, rotate: -8 }}
              transition={{
                delay: 0.35,
                type: "spring",
                stiffness: 110,
                damping: 16,
              }}
              className="absolute bottom-4 left-8 z-15 w-36 sm:w-40"
            >
              <div className="rounded-xl border border-white/15 p-3">
                <div className="relative flex aspect-4/3 w-full items-center justify-center overflow-hidden rounded-lg bg-linear-to-b from-white/40 to-white/20">
                  {/* Gum package */}
                  <div className="flex h-10 w-16 items-center justify-center rounded-md bg-linear-to-b from-white/90 to-white/70 shadow-sm">
                    <span className="text-[10px] font-bold">
                      NIKOTIN
                    </span>
                  </div>
                </div>
                <div className="mt-2 space-y-1">
                  <div className="h-1.5 w-3/4 rounded-full bg-white/25" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/80">
                      Nikotinläkemedel & Vitt snus
                    </span>
                  </div>
                </div>
              </div>
            </HeroContentWrapper>

            {/* Floating elements */}
            <HeroContentWrapper
              animate={{
                y: [-5, 5, -5],
                rotate: [0, 2, 0, -2, 0],
              }}
              transition={{
                duration: 3,
                ease: "easeInOut",
              }}
              className="bg-primary/40 absolute top-1/3 left-8 h-4 w-4 rounded-full blur-sm"
            />

            <HeroContentWrapper
              animate={{
                y: [5, -5, 5],
                x: [-2, 2, -2],
              }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute right-12 bottom-1/3 h-3 w-3 rounded-full bg-blue-400/30 blur-sm"
            />
          </div>
        </HeroContentWrapper>
      </div>
    </section>
  );
}
