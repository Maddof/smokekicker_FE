import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { AboutContentWrapper } from "./AboutAnimation";
import { ScrollBlob } from "./BlurryCircle";
import { resolveCmsIcon } from "@/lib/cms/resolveCmsIcon";

function parseJsonField(value) {
  if (Array.isArray(value)) return value;
  if (typeof value !== "string") return null;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export default function AboutShort({
  eyebrowLabel,
  headline,
  description,
  pillarCards,
  trustBadges,
  aboutLink,
}) {
  const resolvedEyebrowLabel = eyebrowLabel;
  const resolvedHeadline = headline;
  const resolvedDescription = description;
  const resolvedAboutLink = aboutLink;
  const resolvedPillarCards = parseJsonField(pillarCards);
  const resolvedTrustBadges = parseJsonField(trustBadges);

  return (
    <section
      id="about-short-section"
      className="relative isolate overflow-hidden bg-linear-to-b from-black to-neutral-950 py-16 sm:py-20"
    >
      {/* Bakgrund/ornament */}
      {/* Stor, suddig cirk som bakgrundsornament */}
      <ScrollBlob />

      <div className="relative container">
        {/* Label */}
        <AboutContentWrapper
          type="span"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="bg-primary/25 border-primary/50 text-primary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium shadow-sm"
        >
          {resolvedEyebrowLabel}
        </AboutContentWrapper>

        {/* Heading + Ingress */}
        <div className="mt-4 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <AboutContentWrapper
            type="h2"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            {resolvedHeadline}
          </AboutContentWrapper>

          <AboutContentWrapper
            type="p"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05, duration: 0.5 }}
            className="max-w-2xl text-base leading-relaxed text-white sm:text-lg"
          >
            <BoldFirstSentence text={resolvedDescription} />
          </AboutContentWrapper>
        </div>

        {/* Tre pelare */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
          {resolvedPillarCards.map((card) => {
            const Icon = resolveCmsIcon(card.icon);
            return (
              <PillarCard
                key={card.title}
                icon={<Icon className="h-5 w-5" />}
                title={card.title}
                desc={card.description}
              />
            );
          })}
        </div>

        {/* Trust row */}
        <div className="mt-6 grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
          {resolvedTrustBadges.map((badge) => {
            const Icon = resolveCmsIcon(badge.icon);
            return (
              <TrustItem
                key={badge.label}
                icon={<Icon className="h-4 w-4" />}
                text={badge.label}
              />
            );
          })}
        </div>

        {/* CTA to About */}
        <div className="mt-6">
          <Link
            href={ROUTES.ABOUT}
            className="inline-flex items-center gap-2 text-sm font-medium"
            aria-label="Läs vår resa på Om oss-sidan"
          >
            <ChevronRight className="h-4 w-4" />
            {resolvedAboutLink}
          </Link>
        </div>
      </div>
    </section>
  );
}

function BoldFirstSentence({ text }) {
  const dotIndex = text.indexOf(". ");
  if (dotIndex === -1) return text;
  const first = text.slice(0, dotIndex + 1);
  const rest = text.slice(dotIndex + 1);
  return (
    <>
      <b>{first}</b>
      {rest}
    </>
  );
}

function PillarCard({ icon, title, desc }) {
  return (
    <AboutContentWrapper
      type="article"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="group rounded-2xl border border-white/10 bg-black/15 p-5 text-neutral-200 shadow-sm backdrop-blur hover:border-white/20"
    >
      <div className="flex items-start gap-3">
        <div className="inline-flex items-center justify-center pt-1 text-white">
          {icon}
        </div>
        <div>
          <h3 className="text-base font-semibold text-white">
            {title}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-white/90">
            {desc}
          </p>
        </div>
      </div>
    </AboutContentWrapper>
  );
}

function TrustItem({ icon, text }) {
  return (
    <div className="inline-flex items-center gap-4 rounded-xl border border-white/10 bg-black/15 px-5 py-2 backdrop-blur">
      <span className="text-white">{icon}</span>
      <span className="text-white/90">{text}</span>
    </div>
  );
}
