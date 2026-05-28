"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function BankIDSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get the return URL from query parameters, default to homepage if not provided
    const returnUrl = searchParams.get("returnUrl") || "/";

    // Set a timeout to show the success message briefly before redirecting
    const redirectTimeout = setTimeout(() => {
      router.push(returnUrl);
    }, 3000); // 3 seconds delay

    // Cleanup function to clear the timeout if component unmounts
    return () => clearTimeout(redirectTimeout);
  }, [router, searchParams]);
  // const router = useRouter();

  // useEffect(() => {
  //   // Set a timeout to show the success message briefly before redirecting
  //   const redirectTimeout = setTimeout(() => {
  //     router.push("/");
  //   }, 50000); // 50 seconds delay

  //   // Cleanup function to clear the timeout if component unmounts
  //   return () => clearTimeout(redirectTimeout);
  // }, [router]);

  return (
    <div className="text-secondary-foreground container mx-auto flex flex-col items-center justify-center py-12 text-center">
      <div className="border-primary/50 mx-auto max-w-md rounded-lg border p-8 shadow-sm">
        <svg
          className="mx-auto mb-4 h-16 w-16 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h1 className="mb-4 text-2xl font-bold">Inloggning lyckades</h1>
        <p className="mb-4">
          Din autentisering var framgångsrik! Du har nu tillgång till ditt
          konto.
        </p>
        <p className="animate-pulse">Omdirigerar till föregående sida...</p>
      </div>
    </div>
  );
}
