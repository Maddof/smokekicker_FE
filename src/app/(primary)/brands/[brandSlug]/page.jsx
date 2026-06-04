import { notFound } from "next/navigation";
import {
  fetchAllBrands,
  fetchBrandBySlug,
} from "@/lib/data/api/fetchBrands";
import { fetchProductsByBrandSlug } from "@/lib/data/api/fetchProducts";
import ProductFilterWrapper from "@/components/filter/ProductFilterWrapper";
import { ReadMore } from "@/components/ReadMore";
import Image from "next/image";
import { ROUTES } from "@/config/routes";
import { getImageUrl } from "@/lib/utils/getUrl";

export const revalidate = 86400; // Revalidate every 24 hours

export async function generateMetadata({ params }) {
  const { brandSlug } = await params;
  const brand = await fetchBrandBySlug(brandSlug);

  if (!brand) {
    return {
      title: "Brand not found",
      description:
        "The requested brand could not be found.",
    };
  }

  return {
    title: `${brand.name}`,
    description:
      brand.description ||
      `Explore ${brand.name} products at Smokekicker - quality, taste, and a better experience without tobacco smoke.`,
  };
}

export async function generateStaticParams() {
  if (
    process.env.NEXT_PUBLIC_SKIP_STATIC_GENERATION ===
    "true"
  ) {
    return [];
  }
  try {
    const brands = await fetchAllBrands();

    if (!brands || !Array.isArray(brands)) {
      console.warn("No brands found for static generation");
      return [];
    }

    return brands
      .filter((brand) => brand && brand.slug)
      .map((brand) => ({
        brandSlug: brand.slug,
      }));
  } catch (error) {
    console.error(
      "Error generating static params for brand pages:",
      error,
    );
    return [];
  }
}

export default async function BrandPage({ params }) {
  const { brandSlug } = await params;

  try {
    // Fetch brand information
    const brand = await fetchBrandBySlug(brandSlug);

    if (!brand) {
      notFound();
    }

    const logoMedia = brand.media?.find(
      (m) => m.role === "LOGO",
    );
    const logoUrl = logoMedia?.mediaAsset?.url;

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://smokekicker.com";

    // Generate JSON-LD for breadcrumbs
    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Brands",
          item: `${siteUrl}${ROUTES.BRANDS.INDEX}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: brand.name,
          item: `${siteUrl}${ROUTES.BRANDS.DETAIL(brand.slug)}`,
        },
      ],
    };

    // Fetch products for this brand
    const products =
      await fetchProductsByBrandSlug(brandSlug);

    return (
      <section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbJsonLd),
          }}
        />
        <div className="container">
          <div className="mb-8">
            <div className="mb-4 flex flex-col gap-4">
              {logoUrl && (
                <Image
                  src={getImageUrl(logoUrl)}
                  alt={
                    logoMedia?.mediaAsset?.altText ||
                    brand.name
                  }
                  width={
                    logoMedia?.mediaAsset?.width || 400
                  }
                  height={
                    logoMedia?.mediaAsset?.height || 200
                  }
                  className="aspect-2/1 w-auto max-w-60 rounded-md object-contain"
                />
              )}
              <h1>{brand.name}</h1>
              {brand.description && (
                <ReadMore initialParagraphs={1}>
                  <div className="text-muted max-w-3xl">
                    {brand.description
                      .split("\n")
                      .map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                  </div>
                </ReadMore>
              )}
            </div>
          </div>

          {/* Product list with filter */}
          <ProductFilterWrapper
            products={products}
            productCount={products.length}
          />
        </div>
      </section>
    );
  } catch (error) {
    console.error(
      `Error loading brand page for ${brandSlug}:`,
      error,
    );
    return (
      <section>
        <div className="container py-8">
          <h1>An error occurred</h1>
          <p>
            We couldn't load this brand. Please try again
            later.
          </p>
        </div>
      </section>
    );
  }
}
