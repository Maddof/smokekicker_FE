"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/scn/button";
import { setCookie } from "@/lib/utils/cookies/cookiesClient";
import { ROUTES } from "@/config/routes";

const AGE_COOKIE = "smokekicker_age_verified";
const AGE_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export function AgeConfirmReturn({ minimumAge = 18 }) {
  const router = useRouter();

  const handleConfirm = () => {
    setCookie(AGE_COOKIE, "true", AGE_COOKIE_MAX_AGE);
    router.push(ROUTES.HOME);
  };

  return (
    <Button
      type="button"
      onClick={handleConfirm}
      className="w-full"
    >
      {`Yes, I am ${minimumAge} or older`}
    </Button>
  );
}
