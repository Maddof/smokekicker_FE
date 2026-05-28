import AboutShort from "@/components/landingPage/aboutshort/AbourtShort";
import SmokifyHero from "@/components/landingPage/hero/SmokifyHero";
import FeaturedProducts from "@/components/landingPage/featured/FeaturedProducts";
import FeaturedCategoriesSlider from "@/components/landingPage/categoryslider/FeaturedCategoriesSlider";
import { ROUTES } from "@/config/routes";
import { getImageUrl } from "@/lib/utils/getUrl";
import HeroQuizBanner from "@/components/landingPage/heroQuizBanner/HeroQuizBanner";
import FaqSectionCMS from "@/components/FaqSectionCMS";
import LatestBlogPosts from "@/components/LatestBlogPosts";

const fallBackImage = "/images/fallback.png";
const getFieldValue = (section, key) => {
  if (!Array.isArray(section?.fields)) return undefined;
  return section.fields.find((field) => field?.key === key)?.value;
};

export function HomeHeroSection({ section }) {
  return (
    <SmokifyHero
      categoryQuickLinks={section?.categoryQuickLinks}
      eyebrowText={section?.eyebrowText}
      headline={section?.headline}
      description={section?.description}
      primaryCta={section?.primaryCta}
      secondaryCta={section?.secondaryCta}
      disclaimer={section?.disclaimer}
    />
  );
}

export function HomeAboutSection({ section }) {
  return (
    <AboutShort
      eyebrowLabel={section?.eyebrowLabel}
      headline={section?.headline}
      description={section?.description}
      pillarCards={section?.pillarCards}
      trustBadges={section?.trustBadges}
      aboutLink={section?.aboutLink}
    />
  );
}

export function HomeFeaturedCategoriesSection({ section }) {
  const featuredCategoryItems = [...(section?.selectedCategories ?? [])]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((selectedCategory) => {
      const category = selectedCategory?.category;
      const featuredImage = category?.media?.find(
        (mediaItem) => mediaItem.role === "FEATURED_IMAGE",
      );

      return {
        title: category?.name,
        href: category?.slug ? ROUTES.SHOP.CATEGORY(category.slug) : undefined,
        imageSrc: getImageUrl(featuredImage?.url) || fallBackImage,
        imageAlt: featuredImage?.altText || category?.name,
        description: category?.details?.shortDesc,
      };
    })
    .filter((item) => item.title && item.href);

  return (
    <FeaturedCategoriesSlider
      items={
        featuredCategoryItems.length > 0 ? featuredCategoryItems : undefined
      }
      heading={section?.headline ?? getFieldValue(section, "headline")}
      description={section?.description}
    />
  );
}

export function HomeHeroQuizBannerSection({ section }) {
  const backgroundImageField = getFieldValue(section, "backgroundImage");

  return (
    <HeroQuizBanner
      backgroundImageSrc={
        getImageUrl(section?.backgroundImage.url) || fallBackImage
      }
      backgroundImageAlt={backgroundImageField?.altText}
      headline={section?.headline}
      description={section?.description}
      ctaLabel={section?.ctaLabel}
    />
  );
}

export function HomeFeaturedProductsSection({ section }) {
  const products = [...(section?.selectedProducts ?? [])]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((item) => item.product);

  return (
    <FeaturedProducts
      products={products}
      headline={section?.headline}
      description={section?.description}
      ctaLabel={section?.ctaLabel}
    />
  );
}

export function HomeFaqSection({ section }) {
  const items = [...(section?.faqItems ?? [])]
    .filter((item) => item?.isVisible)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <FaqSectionCMS
      title={section?.headline ?? getFieldValue(section, "headline")}
      description={
        section?.description ?? getFieldValue(section, "description")
      }
      items={items}
    />
  );
}

export function HomeLatestBlogPostsSection({ section, posts }) {
  return (
    <LatestBlogPosts
      posts={posts}
      headline={section?.headline ?? getFieldValue(section, "headline")}
      description={
        section?.description ?? getFieldValue(section, "description")
      }
      showExcerpt={section?.config?.showExcerpt ?? true}
    />
  );
}

// Mapping of section keys to their corresponding React components
export const homeSectionComponents = {
  hero: HomeHeroSection,
  aboutShort: HomeAboutSection,
  featuredCategories: HomeFeaturedCategoriesSection,
  heroQuizBanner: HomeHeroQuizBannerSection,
  featuredProducts: HomeFeaturedProductsSection,
  faqHome: HomeFaqSection,
  latestBlogPosts: HomeLatestBlogPostsSection,
  // Add more section components here as needed, e.g.:
  // flavorQuizCTA: HomeFlavorQuizCTASection,
};
