import ShopHeader from "@/components/shop/ShopHeader";
import {
  fetchAllPublishedCategories,
  fetchPublishedCategoryBySlug,
} from "@/lib/data/api/fetchCategories";
import { fetchProductsByCategorySlug } from "@/lib/data/api/fetchProducts";
import { notFound } from "next/navigation";
import {
  categoryContent,
  categoryFaqContent,
} from "@/lib/data/categoryContent";
import ShopHeaderBelow from "@/components/shop/ShopHeaderBelow";
import CategoryPicker from "@/components/shop/CategoryPicker";
import { SITE_NAME } from "@/config/metadata";
import { ROUTES } from "@/config/routes";
import { getImageUrl } from "@/lib/utils/getUrl";
import FaqSection from "@/components/FaqSectionCategory";
import CategoryBenefits from "@/components/shop/products/CategoryBenefits";
import HowToPrefilledPodSystem from "@/components/shop/products/HowToPrefilledPodSystem";
import PrefilledPodsFeatures from "@/components/shop/products/PrefilledPodsFeatures";
import NicotinePouchCollectionFeatures from "@/components/shop/products/NicotinePouchesFeatures";
import ProductFilterWrapper from "@/components/filter/ProductFilterWrapper";
import BlogCard from "@/components/blogg/BlogCard";

const fallBackImage = "/images/fallback.png";

export const revalidate = 21600; // Revalidate this page every 6 hours (21600 seconds) to keep content fresh without overloading the server. Adjust as needed based on how often product/category data changes.

export async function generateMetadata({ params }) {
  const { categorySlug } = await params;
  const category = await fetchPublishedCategoryBySlug(categorySlug);

  const categoryHeaderConfig = categoryContent[categorySlug];

  if (!category) {
    return {
      title: `Produkter - ${SITE_NAME}`,
      description: "Utforska vårt breda sortiment av produkter.",
    };
  }

  const title =
    category.seoMetaTitle || categoryHeaderConfig.title || category.name;
  const description =
    category.seoMetaDescription || categoryHeaderConfig.description;

  return {
    title: title,
    description:
      description ||
      `Utforska vårt sortiment av ${category.name.toLowerCase()} och hitta rätt produkt för dig.`,
    openGraph: {
      title: title,
      description:
        description ||
        `Utforska vårt sortiment av ${category.name.toLowerCase()} och hitta rätt produkt för dig.`,
      url: `https://smokify.se/produkter/${category.slug}`,
      type: "website",
      images: [
        {
          url: categoryHeaderConfig.heroImage || "/opengraph-image.jpg",
          width: 1500,
          height: 660,
          alt: categoryHeaderConfig.heroImageAlt || title,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  if (process.env.NEXT_PUBLIC_SKIP_STATIC_GENERATION === "true") {
    return [];
  }
  const categories = await fetchAllPublishedCategories();
  if (!categories) {
    return [];
  }

  return categories.map((category) => ({
    categorySlug: category.slug,
  }));
}

export default async function CategoryPage({ params }) {
  const { categorySlug } = await params;
  const currentPath = `/produkter/${categorySlug}`;

  const category = await fetchPublishedCategoryBySlug(categorySlug);

  // Use notFound() instead of returning an error component
  if (!category) {
    notFound();
  }

  const posts = category.relatedPostsLinks;

  const products = await fetchProductsByCategorySlug(categorySlug);

  if (!products) {
    return (
      <section>
        <div className="container">
          <p>Error: Unable to fetch products for this category</p>
        </div>
      </section>
    );
  }

  const categoryHeaderConfig = categoryContent[categorySlug] || {
    title: category.name,
    description: category.description,
    showNavigationButtons: false,
  };

  const relatedPostsConfig = categoryContent[categorySlug]
    ?.relatedPostsSection || {
    title: "Relaterade blogginlägg",
    description: "",
  };

  // Get below hero content or use default
  const belowHeroConfig = categoryHeaderConfig.belowHero || {
    title: "Om " + category.name,
    initialParagraphs: 1,
    content: <p>Utforska vårt urval av {category.name.toLowerCase()}.</p>,
  };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://smokify.se";

  const categoryUrl = `${siteUrl}${currentPath}`;
  const title =
    category.seoMetaTitle ||
    categoryContent[categorySlug]?.title ||
    category.name;
  const description =
    category.seoMetaDescription ||
    categoryContent[categorySlug]?.description ||
    `Utforska vårt sortiment av ${category.name.toLowerCase()} och hitta rätt produkt för dig.`;

  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": categoryUrl,
    url: categoryUrl,
    name: title,
    description,
    inLanguage: "sv-SE",
    isPartOf: {
      "@id": `${siteUrl}#website`,
    },
    publisher: { "@id": `${siteUrl}#organization` },
    ...(products.length > 0 && {
      mainEntity: {
        "@type": "ItemList",
        name: category.name,
        numberOfItems: products.length,
        itemListElement: products.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Product",
            "@id": `${siteUrl}${ROUTES.SHOP.PRODUCT(product.category?.slug, product.brand?.slug, product.slug)}#product`,
            url: `${siteUrl}${ROUTES.SHOP.PRODUCT(product.category?.slug, product.brand?.slug, product.slug)}`,
            name: product.name,
            image: [getImageUrl(product.imgUrl) || fallBackImage],
            description:
              product.details.shortDesc +
              " " +
              product.details.longDesc.slice(0, 150) +
              "...",
            brand: product.brand
              ? { "@type": "Brand", name: product.brand.name }
              : undefined,
            offers: {
              "@type": "Offer",
              priceCurrency: product.currency ?? "SEK",
              price: (product.price / 100).toFixed(2),
              availability:
                product.stock > 0
                  ? "https://schema.org/InStock"
                  : "https://schema.org/OutOfStock",
              url: `${siteUrl}${ROUTES.SHOP.PRODUCT(product.category?.slug, product.brand?.slug, product.slug)}`,
            },
          },
        })),
      },
    }),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Hem",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Produkter",
        item: `${siteUrl}${ROUTES.SHOP.INDEX}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: `${siteUrl}${currentPath}`,
      },
    ],
  };

  const faqPageJsonLd =
    categoryFaqContent[categorySlug]?.items?.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: categoryFaqContent[categorySlug].items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <>
      {/* Add JSON-LD to your page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqPageJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
        />
      )}
      <ShopHeader
        title={categoryHeaderConfig.title}
        description={categoryHeaderConfig.description}
        showNavigationButtons={categoryHeaderConfig.showNavigationButtons}
        backgroundImage={categoryHeaderConfig.heroImage}
        backgroundAlt={categoryHeaderConfig.heroImageAlt}
        warningLabelText={categoryHeaderConfig.warningLabelText}
      />

      <ShopHeaderBelow
        title={belowHeroConfig.title}
        iconImgBg={belowHeroConfig.iconImgBg}
        inconImgBgAlt={belowHeroConfig.inconImgBgAlt}
        initialParagraphs={belowHeroConfig.initialParagraphs}
      >
        {belowHeroConfig.content}
      </ShopHeaderBelow>

      <CategoryPicker currentPath={currentPath} />

      {/* Product listing section */}
      <section
        id="category-products"
        aria-labelledby="category-products-heading"
      >
        <div className="container">
          <h2 id="category-products-heading" className="mb-6">
            Produkter i {category.name}
          </h2>

          <ProductFilterWrapper
            products={products}
            productCount={products.length}
            initialDisplayCount={12}
          />
        </div>
      </section>
      {category.slug === "start-kit-forfyllda-podsystem" && (
        <HowToPrefilledPodSystem />
      )}
      {category.slug === "forfyllda-poddar" && <PrefilledPodsFeatures />}
      {category.slug === "vitt-snus" && <NicotinePouchCollectionFeatures />}
      <CategoryBenefits categorySlug={categorySlug} />
      <FaqSection categorySlug={categorySlug} />

      {posts.length > 0 && (
        <section
          id="related-blog-posts"
          className="mx-auto max-w-7xl px-4 py-10 sm:px-6"
        >
          <h2 className="mb-6">{relatedPostsConfig.title}</h2>
          <p className="mb-6">{relatedPostsConfig.description}</p>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((item) => (
              <li key={item.postId}>
                <BlogCard post={item.post} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
