import Image from "next/image";
import { categoryBenefitsContent } from "@/lib/data/categoryContent";

export default function CategoryBenefits({ categorySlug }) {
  // Get category-specific benefits content or use fallbacks
  const benefitsConfig = categoryBenefitsContent[
    categorySlug
  ] || {
    title: "The Benefits of Nicotine Pouches",
    description: "Discover the advantages of our range.",
    benefits: [],
    showImage: false,
  };

  // If no benefits defined for this category, don't render anything
  if (
    !benefitsConfig.benefits ||
    benefitsConfig.benefits.length === 0
  ) {
    return null;
  }

  return (
    <section>
      <div className="container">
        <div className="flex flex-col gap-8 md:flex-row">
          {benefitsConfig.showImage && (
            <div className="flex w-full items-center justify-center md:w-1/2">
              <Image
                src={benefitsConfig.image.src}
                alt={benefitsConfig.image.alt}
                width={benefitsConfig.image.width}
                height={benefitsConfig.image.height}
                className="h-auto w-full max-w-120 rounded-lg border object-contain shadow-lg"
              />
            </div>
          )}
          <div className="flex w-full flex-col gap-6 md:w-1/2">
            <h2 className="uppercase">
              {benefitsConfig.title}
            </h2>
            <p className="text-gray-500">
              {benefitsConfig.description}
            </p>

            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              {benefitsConfig.benefits.map(
                (benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 md:flex-col"
                  >
                    <div className="bg-primary/10 flex h-18 w-18 shrink-0 items-center justify-center rounded-full md:h-22 md:w-22">
                      <Image
                        src={benefit.icon.src}
                        alt={benefit.icon.alt}
                        width={benefit.icon.width}
                        height={benefit.icon.height}
                        className="h-10 w-10 md:h-14 md:w-14"
                      />
                    </div>
                    <div className="flex flex-col md:items-center md:text-center">
                      <h3 className="mb-1 font-semibold">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {benefit.text}
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
