import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/scn/button";
import { ROUTES } from "@/config/routes";

export default function BankIDFailed() {
  return (
    <div className="text-secondary-foreground container mx-auto flex flex-col items-center justify-center py-12 text-center">
      <div className="border-primary/50 mx-auto max-w-md rounded-lg border p-8 shadow-sm">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <X className="h-10 w-10 text-red-500" />
        </div>

        <h1 className="mb-4 text-2xl font-bold text-red-700">
          Inloggning misslyckades
        </h1>

        <p className="mb-6">
          Vi kunde inte autentisera dig med BankID. Detta kan bero på att
          processen avbröts eller att det uppstod ett tekniskt problem.
        </p>

        <div className="flex justify-center">
          <Button asChild variant="default" className="px-6">
            <Link href={ROUTES.AUTH.BANKID}>Försök igen</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
