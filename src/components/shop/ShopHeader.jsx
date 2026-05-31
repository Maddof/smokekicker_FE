import Image from "next/image";
import { Button } from "@/components/ui/scn/button";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { ROUTES } from "@/config/routes";

export default function ShopHeader({
  title = "Nicotine Pouches Delivered Worldwide",
  description = "Discover selected pod systems from Frunk Bar, pre-filled pods, nicotine gum, and smart subscriptions – a simpler and more controlled alternative to traditional smoking.",
  backgroundImage = "/images/bg/nicotine-pouch_neon-bg.jpg",
  backgroundAlt = "Nicotine pouches in neon",
  primaryButtonText = "View All Products",
  primaryButtonLink = "#category-picker",
  secondaryButtonText = "View Subscriptions",
  secondaryButtonLink = "#subscriptions",
  showNavigationButtons = true,
  viewProductsText = "View Products",
  warningLabelText,
}) {
  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      id="shop-hero"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt={backgroundAlt}
          className="h-full w-full object-cover object-[0%_50%] sm:object-center"
        />
        {/* Gradient overlay: left (transparent) to right (black) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 to-black/25 sm:bg-gradient-to-l" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center justify-start px-4 py-6 sm:justify-end sm:px-6 sm:py-12">
        <div className="max-w-xl text-white">
          <h1 className="font-extrabold">{title}</h1>
          <p className="text-secondary-foreground mt-4 font-medium">
            {description}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {/* Primary button as link */}
            {showNavigationButtons ? (
              <>
                {/* Primary button as link */}
                <Button asChild>
                  <Link href={primaryButtonLink}>
                    {primaryButtonText}
                    <ChevronDown className="ml-1 h-4 w-4 animate-bounce" />
                  </Link>
                </Button>

                {/* Secondary button as link */}
                <Button
                  variant="outline"
                  asChild
                  className="text-secondary-foreground hover:text-secondary-foreground"
                >
                  <a href={secondaryButtonLink}>
                    {secondaryButtonText}
                  </a>
                </Button>
              </>
            ) : (
              /* Anchor link to products section */
              /* Anchor link to products section with arrow */
              <div className="flex flex-col items-start gap-2">
                <Button
                  asChild
                  className="flex items-center gap-2"
                >
                  <a href="#category-picker">
                    {viewProductsText}
                    <ChevronDown className="ml-1 h-4 w-4 animate-bounce" />
                  </a>
                </Button>
                <span className="text-xs text-white/60">
                  Scroll down to view {title.toLowerCase()}
                </span>
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center gap-2">
            <Image
              className="w-10"
              src="/images/icons/plus-18_white.svg"
              alt="18+"
              width={48}
              height={48}
            />
            <p className="text-xs text-white/70">
              {warningLabelText ||
                "Nicotine is an addictive substance. Not for sale to minors. Use responsibly."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
