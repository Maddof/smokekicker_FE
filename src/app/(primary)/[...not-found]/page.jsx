import Link from "next/link";
import { Frown } from "lucide-react";
import { ROUTES } from "@/config/routes";

/*
  DYNAMIC CATCH-ALL ROUTE
  The dynamic route [...not-found] acts as a fallback for any paths within the (primary) 
  group that aren't explicitly defined.
  Does not interfere with the global not-found.js.
*/

export default function Custom404() {
  return (
    <section className="bg-background flex min-h-[60vh] items-center justify-center py-20 md:py-32">
      <div className="container text-center">
        <Frown className="text-primary mx-auto h-16 w-16" aria-hidden="true" />
        <h1 className="text-foreground mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
          404
        </h1>
        <h2 className="text-foreground mt-2 text-2xl font-semibold sm:text-3xl">
          Sidan kunde inte hittas
        </h2>
        <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-lg">
          Hoppsan! Sidan du letar efter verkar ha försvunnit i röken. Det kan
          bero på en bruten länk eller att sidan har flyttats.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={ROUTES.HOME}
            className="bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary inline-flex w-full items-center justify-center rounded-md px-6 py-3 text-sm font-medium shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none sm:w-auto"
          >
            Gå till startsidan
          </Link>
          <Link
            href={ROUTES.CONTACT}
            className="border-input text-foreground hover:bg-accent hover:text-accent-foreground focus:ring-ring inline-flex w-full items-center justify-center rounded-md border bg-transparent px-6 py-3 text-sm font-medium shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none sm:w-auto"
          >
            Kontakta oss
          </Link>
        </div>
      </div>
    </section>
  );
}
