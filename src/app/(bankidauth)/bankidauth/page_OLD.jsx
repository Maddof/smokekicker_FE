"use client";

import { useRouter, useSearchParams } from "next/navigation";
import BankIDAuth from "@/components/bankid/BankIDAuth";
import Image from "next/image";

export default function BankIDAuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get the returnUrl from query parameter, or try to use the referrer
  const getReturnUrl = () => {
    // First check if returnUrl is in query params
    const urlParam = searchParams.get("returnUrl");
    if (urlParam) return urlParam;

    // Otherwise, try to get the referrer, but only if it's from our site
    const referrer = document.referrer;
    if (referrer && referrer.startsWith(window.location.origin)) {
      // Extract just the path part
      return new URL(referrer).pathname;
    }

    // Default to homepage
    return "/";
  };

  // Use this when redirecting to the success page
  const handleAuthSuccess = () => {
    const returnUrl = encodeURIComponent(getReturnUrl());
    router.push(`/bankidauth/success?returnUrl=${returnUrl}`);
  };

  return (
    <section className="text-secondary-foreground">
      <div className="container mx-auto flex flex-col items-center text-center">
        <Image
          src="/smokify_logo_orange.svg"
          alt="Smokify Logo"
          width={400}
          height={200}
          className="mb-4 max-w-48"
        />
        <h1 className="mb-2">BankID Authentication Demo</h1>
        <p className="text-muted-foreground">
          OBS! Om du inte är över 18 år kommer du bli nekad inloggning.
        </p>
        <BankIDAuth />
      </div>
    </section>
  );
}
