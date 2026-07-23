"use client";

import {
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { useRouter, usePathname } from "next/navigation";

import { Button } from "@/components/ui/scn/button";
import { confirmLegalAge } from "@/app/(primary)/actions/age-verification";
import { ROUTES } from "@/config/routes";
import { isBot } from "@/lib/utils/botChecker";

const AGE_COOKIE = "smokekicker_age_verified";

function hasAgeVerificationCookie() {
  return document.cookie
    .split("; ")
    .some((cookie) => cookie === `${AGE_COOKIE}=true`);
}

export function AgeVerificationDialog({ minimumAge = 18 }) {
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const confirmButtonRef = useRef(null);

  // Decide visibility on the client (keeps the tree statically renderable)
  useEffect(() => {
    if (pathname === ROUTES.ADULTS_ONLY) return;
    if (isBot()) return;
    if (hasAgeVerificationCookie()) return;
    setOpen(true);
  }, [pathname]);

  // Lock scroll + focus only while the dialog is actually open
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
      confirmButtonRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const handleConfirm = () => {
    startTransition(async () => {
      await confirmLegalAge();
      setOpen(false);
    });
  };

  const handleReject = () => {
    router.push(ROUTES.ADULTS_ONLY);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-verification-title"
      aria-describedby="age-verification-description"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
    >
      <div className="bg-background w-full max-w-md rounded-lg border p-6 shadow-lg">
        <div className="space-y-3 text-center">
          <h2
            id="age-verification-title"
            className="text-2xl font-semibold"
          >
            Are you of legal age?
          </h2>

          <p
            id="age-verification-description"
            className="text-muted-foreground text-sm"
          >
            You must be at least {minimumAge} years old to
            enter Smokekicker and purchase nicotine
            products.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <Button
            type="button"
            ref={confirmButtonRef}
            disabled={isPending}
            onClick={handleConfirm}
            className="w-full"
          >
            {isPending
              ? "Confirming..."
              : `Yes, I am ${minimumAge} or older`}
          </Button>

          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={handleReject}
            className="w-full"
          >
            No, I am under {minimumAge}
          </Button>
        </div>
      </div>
    </div>
  );
}
