import { Button } from "@/components/ui/scn/button";
import { ChevronDown } from "lucide-react";

export default function BlogHero({
  title = "Blogg",
  description = "Guider, produkttips och aktuell information om vapes, e-cigaretter och nikotinpåsar. Här hittar du information om allt från skademinimering och vanliga frågor till nyheter och gällande lagar och regler.",
  backgroundImage = "/images/bg/blog_hero_moon-neon.jpg",
  backgroundAlt = "Blog Hero Background",
  viewBlogPostsText = "Se blogginlägg",
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
          className="h-full w-full object-cover object-[45%_50%] sm:object-center"
        />
        {/* Gradient overlay: left (transparent) to right (black) */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center justify-center px-6 py-6 sm:py-12">
        <div className="flex flex-col items-center gap-6 text-center text-white">
          <h1 className="font-extrabold">{title}</h1>
          <p className="text-secondary-foreground max-w-md font-medium">
            {description}
          </p>

          <div className="flex flex-col items-center gap-2">
            <Button
              asChild
              variant="outline"
              className="flex items-center gap-2 hover:text-white"
            >
              <a href="#category-picker">{viewBlogPostsText}</a>
            </Button>

            <span className="text-xs text-white/60">
              Scrolla ner för att se blogginlägg
            </span>
            <ChevronDown className="h-4 w-4 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
