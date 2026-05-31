import { resolveCmsIcon } from "@/lib/cms/resolveCmsIcon";

export function AboutHeroSection({ section }) {
  return (
    <section
      id="hero-about"
      className="neon-bg-radial-top-right py-16 md:py-24"
    >
      <div className="container">
        <div className="text-secondary-foreground mx-auto max-w-3xl text-center">
          <h1 className="mb-6">{section?.headline}</h1>
          <p className="mb-8">{section?.subheadline}</p>
          <div className="bg-primary/10 text-primary inline-block rounded-lg px-6 py-3">
            <p className="font-medium">{section?.slogan}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutJourneySection({ section }) {
  return (
    <section id="our-journey" className="">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-3xl font-bold">
            {section?.headline || "Vår resa"}
          </h2>

          {section?.content ? (
            <div
              className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-md sm:p-6 md:p-8"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          ) : (
            <div className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-md sm:p-6 md:p-8">
              Tyvärr kunde vi inte ladda innehållet för den här sektionen just
              nu.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function AboutCoreValuesSection({ section }) {
  const coreValueItems = Array.isArray(section?.coreValueItems)
    ? section.coreValueItems
    : [];

  return (
    <section id="core-values" className="neon-bg-radial-bottom-right">
      <div className="container">
        <h2 className="text-secondary-foreground mb-12 text-center">
          {section?.headline || "Våra kärnvärden"}
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {coreValueItems.length > 0 ? (
            coreValueItems.map((item, index) => {
              const Icon = resolveCmsIcon(item?.icon);

              return (
                <div
                  key={`${item?.title || "core-value"}-${index}`}
                  className="border-primary/80 w-full shrink-0 rounded-xl border bg-black/5 p-4 shadow-sm md:w-[calc(50%-1rem)] xl:w-[calc((100%-8rem)/2)]"
                >
                  <div className="mb-4 flex items-center gap-2">
                    <div className="text-primary flex items-center justify-center">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-primary font-semibold">
                      {item?.title || "Kärnvärde"}
                    </h3>
                  </div>
                  <p className="text-secondary-foreground">
                    {item?.description || ""}
                  </p>
                </div>
              );
            })
          ) : (
            <p className="text-muted-foreground">
              Tyvärr kunde vi inte ladda kärnvärden just nu.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

// Mapping of section keys to their corresponding React components for the About Us page
export const aboutSectionComponents = {
  hero: AboutHeroSection,
  ourJourney: AboutJourneySection,
  coreValues: AboutCoreValuesSection,
};
