"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import FacebookShareButton from "./share/FBshare";
import XShareButton from "./share/XShare";
import { Share } from "lucide-react";

function clampText(value, maxLength) {
  if (!value) return "";
  return String(value).trim().slice(0, maxLength);
}

export default function ResultCard({ result }) {
  const [supportsWebShare, setSupportsWebShare] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const shareParams = new URLSearchParams({
    personalityName: result.personalityName || "",
    headline: result.headline || "",
    description: result.description || "",
    shareText: result.shareText || "",
  });

  const ogImageParams = new URLSearchParams({
    text: clampText(result.personalityName, 70) || "Smakpersonlighetstest",
    headline: clampText(result.headline, 180),
    shareText: clampText(result.shareText, 240),
  });

  const shareUrl = `/smak-personlighet?${shareParams.toString()}`;
  // const shareUrl = `/smak-personlighet`;

  const ogImageUrl = `/smak-personlighet/og?${ogImageParams.toString()}`;

  useEffect(() => {
    setSupportsWebShare(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  const handleNativeShare = async () => {
    if (!supportsWebShare) return;

    setIsLoading(true);

    const blob = await fetch(ogImageUrl)
      .then((r) => r.blob())
      .catch(() => null);

    const shareData = {
      title: result.personalityName || "Upptäck din smak",
      text:
        result.shareText ||
        result.headline ||
        "Svara, klicka, klart: din smakpersonlighet och skräddarsydda AI-rekommendationer serveras direkt. Smakmagi!",
      url: window.location.origin + "/smak-personlighet",
    };

    // Försök inkludera delningsbilden om den kunde hämtas
    if (blob) {
      const file = new File([blob], "smakpersonlighet.png", {
        type: "image/png",
      });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        shareData.files = [file];
      }
    }

    try {
      await navigator.share(shareData);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.log("Share failed or was cancelled", error);
      }
      // Ignore cancellation or blocked share errors.
    } finally {
      setIsLoading(false);
    }
  };

  // console.log("ResultCard render:", {
  //   shareUrl,
  //   ogImageUrl,
  //   result,
  // });

  return (
    <div className="mt-6 flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <aside className="rounded-2xl border border-cyan-200/40 bg-linear-to-br from-cyan-100/95 via-sky-100/90 to-blue-100/85 p-4 text-black sm:w-60 sm:shrink-0">
          <p className="text-foreground/80 text-xs tracking-wide uppercase">
            Din smakpersonlighet
          </p>
          <p className="mt-2 text-lg leading-tight font-bold">
            {result.personalityName}
          </p>
          <p className="text-foreground/80 mt-2 text-sm leading-snug font-medium">
            {result.headline}
          </p>
        </aside>

        <div className="rounded-2xl border border-white/20 bg-white/10 p-4 sm:flex-1">
          <p className="text-secondary-foreground/80 text-xs tracking-wide uppercase">
            Resultat
          </p>
          <p className="text-secondary-foreground mt-3">{result.description}</p>
        </div>
      </div>

      {result.shareText ? (
        <div className="rounded-2xl border border-white/20 bg-white/10 p-4">
          <p className="text-secondary-foreground/80 text-xs tracking-wide uppercase">
            Dela resultatet
          </p>
          <div className="mt-4">
            {/* Förhandsgranskning av delningsbild */}
            <Image
              key={ogImageUrl}
              src={ogImageUrl}
              alt="Förhandsgranskning av delningsbild"
              className="mt-3 mb-4 w-full rounded-xl object-cover"
              width={1200}
              height={630}
              unoptimized
            />
            {supportsWebShare ? (
              <button
                type="button"
                onClick={handleNativeShare}
                className="inline-flex items-center rounded-xl border border-cyan-100/80 bg-cyan-100 px-5 py-3 text-sm font-semibold text-slate-950 uppercase transition hover:brightness-105 focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
                disabled={isLoading}
              >
                <Share className="mr-2 h-4 w-4" />
                {isLoading ? "Delar..." : "Dela"}
              </button>
            ) : (
              <div className="flex flex-wrap gap-x-2 gap-y-3">
                <FacebookShareButton shareUrl={shareUrl} />
                <XShareButton
                  shareUrl={shareUrl}
                  shareText={result.shareText || result.headline}
                />
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
