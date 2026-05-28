import AtcButtonDefault from "@/components/cart/atcButton";
import { ROUTES } from "@/config/routes";
import { formatCurrency } from "@/lib/utils/currencyFormatter";
import Link from "next/link";

export default function SameBrandProductsPicker({
  sameBrandProducts = [],
  title,
  brandName,
  description = "Välj bland alla övriga poddar, glöm inte att köpa med dig startkittet!",
  emptyMessage = "Inga andra produkter tillgängliga just nu.",
  showIfEmpty = false,
}) {
  const resolvedTitle =
    title || (brandName ? `Mer från ${brandName}` : "Upptäck övriga smaker");

  // If no products and we don't want to show empty state, return null
  if (sameBrandProducts.length === 0 && !showIfEmpty) {
    return null;
  }

  return (
    <section
      className="bg-secondary text-secondary-foreground neon-bg-radial-top-right"
      id="same-brand-products-picker"
    >
      <div className="container">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="flex w-full flex-col items-center justify-center gap-4 md:w-1/3">
            <div className="flex max-w-full flex-col items-start gap-4 md:max-w-72">
              <h2 className="h2-product">{resolvedTitle}</h2>
              <p className="text-primary">
                {description + (brandName ? brandName : "")}
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col items-start gap-4 md:w-2/3 md:flex-row">
            <div className="grid w-full auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2">
              {sameBrandProducts.length > 0 ? (
                sameBrandProducts.map((sameBrandProduct) => (
                  <div
                    key={sameBrandProduct.id}
                    className="grid-item flex flex-grow basis-full items-stretch gap-2 md:basis-[calc(50%-0.5rem)]"
                  >
                    <div
                      className="border-muted flex flex-grow items-center rounded-r-md border-[1px] border-l-[1rem] px-3 py-2"
                      style={{
                        borderLeftColor: sameBrandProduct.details?.color
                          ? `${sameBrandProduct.details.color}`
                          : "#888888",
                      }}
                    >
                      <Link
                        href={ROUTES.SHOP.PRODUCT(
                          sameBrandProduct.category.slug,
                          sameBrandProduct.brand.slug,
                          sameBrandProduct.slug,
                        )}
                        className="text-secondary-foreground mr-2 text-sm"
                      >
                        {sameBrandProduct.name},{" "}
                        {formatCurrency(sameBrandProduct.price)}
                      </Link>
                    </div>
                    <div className="flex h-full min-w-14 items-center">
                      <AtcButtonDefault
                        product={sameBrandProduct}
                        className="h-full w-full"
                        sameBrandProductPickerButton={true}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 py-4 text-center">
                  {emptyMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
