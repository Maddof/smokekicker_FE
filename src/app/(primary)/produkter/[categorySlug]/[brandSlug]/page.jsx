import { fetchProductsByCategorySlugAndBrandSlug } from "@/lib/data/api/fetchProducts";
import { fetchAllBrands, fetchBrandBySlug } from "@/lib/data/api/fetchBrands";
import {
  fetchAllPublishedCategoriesExcludeSubscription,
  fetchPublishedCategoryBySlug,
} from "@/lib/data/api/fetchCategories";
import { notFound } from "next/navigation";
import ProductFilterWrapper from "@/components/filter/ProductFilterWrapper";
import { SITE_NAME } from "@/config/metadata";
import { ROUTES } from "@/config/routes";

export async function generateMetadata({ params }) {
  const { categorySlug, brandSlug } = await params;

  // Fetch the necessary data
  const brand = await fetchBrandBySlug(brandSlug);
  const category = await fetchPublishedCategoryBySlug(categorySlug);

  // Handle case where data is missing
  if (!brand || !category) {
    return {
      title: "Produkter ej hittade | " + SITE_NAME,
      description: "Den här sidan kunde inte hittas.",
    };
  }

  // Build the metadata
  const title = `${brand.name} ${category.name}`;
  const description = `Utforska vår kollektion av ${category.name.toLowerCase()} från ${brand.name}.`;
  const url = `${process.env.NEXT_PUBLIC_SITE_URL || "https://smokify.se"}/produkter/${categorySlug}/${brandSlug}`;

  return {
    // Basic metadata
    title,
    description,
    keywords: [
      brand.name,
      category.name,
      "vejping",
      "vape",
      "e-cigaretter",
      `${brand.name} ${category.name}`,
    ].join(", "),

    // Canonical URL
    alternates: {
      canonical: url,
    },
  };
}

export async function generateStaticParams() {
  if (process.env.NEXT_PUBLIC_SKIP_STATIC_GENERATION === "true") {
    return [];
  }
  try {
    // Fetch all published categories and brands
    const categories = await fetchAllPublishedCategoriesExcludeSubscription();
    const brands = await fetchAllBrands();

    // Handle missing data safely
    if (!categories || !brands) {
      console.warn("Missing category or brand data for static paths");
      return [];
    }

    // Generate all combinations
    const paths = [];

    for (const category of categories) {
      for (const brand of brands) {
        paths.push({
          categorySlug: category.slug,
          brandSlug: brand.slug,
        });
      }
    }

    return paths;
  } catch (error) {
    console.error("Error generating static paths for brand pages:", error);
    return [];
  }
}

export default async function BrandPage({ params }) {
  const { categorySlug, brandSlug } = await params;
  const products = await fetchProductsByCategorySlugAndBrandSlug(
    categorySlug,
    brandSlug,
  );
  const brand = await fetchBrandBySlug(brandSlug);
  const category = await fetchPublishedCategoryBySlug(categorySlug);

  if (!brand) {
    notFound();
  }

  return (
    <section className="brand-products">
      <div className="container mb-8">
        <h1 className="mb-2 text-2xl font-bold">
          {category.name} från <strong>{brand.name}</strong>
        </h1>
        <p className="text-muted mb-6 text-sm">
          Utforska hela vårt sortiment av{" "}
          <a href={ROUTES.BRANDS.DETAIL(brand.slug)}>
            {brand.name} produkter här
          </a>
          .
        </p>
        <ProductFilterWrapper
          products={products}
          productCount={products.length}
        />
      </div>
    </section>
  );
}
