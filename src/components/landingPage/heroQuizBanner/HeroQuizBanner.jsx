import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/config/routes";

export default function HeroQuizBanner({
  backgroundImageSrc,
  backgroundImageAlt,
  headline,
  description,
  ctaLabel,
  ctaHref,
}) {
  return (
    <section aria-labelledby="personality-quiz-cta" className="py-10 sm:py-14">
      <div className="container">
        <div className="relative min-h-90 overflow-hidden rounded-3xl border border-cyan-200/30 sm:min-h-105">
          <Image
            src={backgroundImageSrc}
            alt={backgroundImageAlt || ""}
            fill
            sizes="(max-width: 1024px) 100vw, 1280px"
            className="object-cover"
            style={{ objectPosition: "50% 10%" }}
          />

          {/* Overlay för bättre kontrast */}
          <div className="via-black-900/50 absolute inset-0 bg-linear-to-tr from-black/60 to-black/15" />

          <div className="relative z-10 flex min-h-90 items-end p-6 sm:min-h-105 sm:p-10">
            <div className="max-w-xl">
              <h2
                id="personality-quiz-cta"
                className="mb-3 text-3xl leading-tight font-bold text-white sm:text-5xl"
              >
                {headline}
              </h2>
              <p className="mb-6 max-w-96 font-medium text-white">
                {description}
              </p>
              <Link
                href={ctaHref || ROUTES.PERSONALITY}
                className="inline-flex items-center rounded-xl border border-cyan-100/80 bg-cyan-100 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-105 focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
              >
                {ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
