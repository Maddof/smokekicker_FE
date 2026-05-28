import DashboardSectionWrapper from "@/components/dashboard/DashboardSection";
import { Button } from "@/components/ui/scn/button";
import { fetchProductsByCategoryId } from "@/lib/data/api/fetchProducts";
import { fetchSession } from "@/lib/utils/auth/authDAL";
import {
  fetchActivePerkBySlug,
  fetchAllActivePerks,
  fetchUserPerkByPerkId,
} from "@/lib/utils/perks/fetchPerks";
import { formatCurrency } from "@/lib/utils/currencyFormatter";
import { AlertCircle, ArrowLeft, Check, Gift, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/config/routes";

export async function generateStaticParams() {
  if (process.env.NEXT_PUBLIC_SKIP_STATIC_GENERATION === "true") {
    return [];
  }
  try {
    // Fetch all perks (not user-specific)
    const perks = await fetchAllActivePerks();

    // If there's an error or no perks, return empty array
    if (!perks || perks.error || !Array.isArray(perks)) {
      console.error(
        "Error generating perk pages:",
        perks?.error || "Invalid data",
      );
      return [];
    }

    // Return an array of objects with perkSlug params
    return perks.map((perk) => ({
      perkSlug: perk.slug,
    }));
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { perkSlug } = await params;
  const perkData = await fetchActivePerkBySlug(perkSlug);

  // Default metadata if we can't fetch the perk
  if (!perkData || perkData.error) {
    return {
      title: "Perk - Smokify",
      description: "Detaljerad information om denna förmån.",
    };
  }

  return {
    title: `${perkData.name} - Smokify`,
    description:
      perkData.description || "Detaljerad information om denna förmån.",
  };
}

export default async function PerkDetailPage({ params }) {
  const { perkSlug } = await params;
  const perk = await fetchActivePerkBySlug(perkSlug);

  const user = await fetchSession();
  if (!user) {
    return <DashboardSectionWrapper>Unauthorized</DashboardSectionWrapper>;
  }

  // Handle errors or missing data
  if (!perk || perk.error) {
    return (
      <DashboardSectionWrapper>
        <div className="mb-6">
          <Link
            href={ROUTES.DASHBOARD.PERKS}
            className="text-muted-foreground hover:text-primary inline-flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" /> Tillbaka till alla reservdelar
          </Link>
        </div>

        <div className="rounded-lg border border-red-200 bg-red-50 p-6">
          <h2 className="mb-2 text-lg font-medium text-red-800">
            Ett fel uppstod
          </h2>
          <p className="text-red-700">
            {perk?.error || "Kunde inte ladda perk-information"}
          </p>
        </div>
      </DashboardSectionWrapper>
    );
  }

  // If the perk doesn't exist, show 404
  if (!perk.id) {
    notFound();
  }

  // Fetch user's eligibility status for this perk
  const userPerk = await fetchUserPerkByPerkId(perk.id);
  const isEligible = userPerk && userPerk.isEligible;

  // Only fetch products if the perk is eligible
  const products = isEligible
    ? await fetchProductsByCategoryId(perk.categoryId)
    : [];

  return (
    <DashboardSectionWrapper>
      <div className="mb-6">
        <Link
          href={ROUTES.DASHBOARD.PERKS}
          className="text-muted-foreground hover:text-primary inline-flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" /> Tillbaka till alla reservdelar
        </Link>
      </div>

      <div className="border-primary/50 mb-8 rounded-lg border p-4 sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
          {/* Perk icon/image */}
          <div className="text-primary bg-primary/10 flex h-16 w-16 items-center justify-center rounded-lg">
            {perk.imageUrl ? (
              <Image
                src={perk.imageUrl}
                alt={perk.name}
                width={64}
                height={64}
                className="h-10 w-10 object-contain"
              />
            ) : (
              <Gift className="h-10 w-10" />
            )}
          </div>

          {/* Perk info */}
          <div className="flex-1">
            <h1 className="mb-2 text-2xl font-bold">{perk.name}</h1>
            <p className="text-muted-foreground mb-4">{perk.description}</p>

            {/* Eligibility status */}
            <div className="mt-2 flex items-center gap-2">
              {isEligible ? (
                <>
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="font-medium text-green-600">
                    Du har tillgång till detta tillbehör
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-red-500" />
                  <span className="font-medium text-red-600">
                    Detta tillbehör är inte tillgängligt för dig ännu
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {isEligible ? (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Produkter du kan välja</h2>
          <p className="text-muted-foreground">
            Följande underhållsprodukter är tillgängliga för att hjälpa dig
            hålla igång din vape. Du kan lägga till en av dessa produkter till
            din nästa leverans.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {products.map((product) => {
              const priceLabel =
                typeof product.price === "number" && product.price > 0
                  ? formatCurrency(product.price)
                  : "Gratis";

              return (
                <div
                  key={product.id}
                  className="border-primary/50 flex flex-col rounded-lg border p-4 sm:p-6"
                >
                  <h3 className="mb-2 font-medium">{product.name}</h3>
                  <p className="mb-2 text-sm">Pris: {priceLabel}</p>
                  {product.stock === 0 && (
                    <p className="text-destructive mb-4 text-sm font-semibold">
                      Slut i lager
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {products.length === 0 && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-800">
              Inga underhållsprodukter är tillgängliga just nu. Kolla tillbaka
              senare.
            </div>
          )}
        </div>
      ) : (
        <div className="border-destructive rounded-lg border-2 border-dashed p-6 text-center">
          <AlertCircle className="text-destructive mx-auto mb-4 h-12 w-12" />
          <h2 className="text-destructive mb-2 text-lg font-medium">
            Detta tillbehör är inte tillgängligt ännu
          </h2>
          <p className="mb-4">
            Baserat på din beställningshistorik blir vissa underhållsprodukter
            tillgängliga för att stödja din vape-användning. Fortsätt din
            vape-prenumeration för att få tillgång till dessa
            underhållsprodukter.
          </p>
          <Button asChild>
            <Link href={ROUTES.SHOP.INDEX}>Till produkter</Link>
          </Button>
        </div>
      )}
    </DashboardSectionWrapper>
  );
}
