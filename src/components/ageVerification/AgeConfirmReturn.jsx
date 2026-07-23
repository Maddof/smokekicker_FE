"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/scn/button";
import { confirmLegalAge } from "@/app/(primary)/actions/age-verification";
import { ROUTES } from "@/config/routes";

export function AgeConfirmReturn({ minimumAge = 18 }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleConfirm = () => {
    startTransition(async () => {
      await confirmLegalAge();
      router.push(ROUTES.HOME);
    });
  };

  return (
    <Button
      type="button"
      disabled={isPending}
      onClick={handleConfirm}
      className="w-full"
    >
      {isPending
        ? "Confirming..."
        : `Yes, I am ${minimumAge} or older`}
    </Button>
  );
}
