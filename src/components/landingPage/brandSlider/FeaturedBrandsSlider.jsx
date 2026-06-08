"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  A11y,
  Keyboard,
  Autoplay,
} from "swiper/modules";

// Swiper core styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/**
 * FeaturedBrandsSlider – Enhanced responsive Swiper.js carousel for brand links.
 * - Auto-generated brand data with proper routing
 * - Keyboard, mouse, and touch-friendly
 * - Auto-play with pause on hover
 * - Better responsive breakpoints
 * - Improved accessibility
 */

const brands = [
  {
    title: "Zyn",
    imageSrc:
      "/images/other/featuredBrandsSlider/zyn_logo.svg",
    imageAlt: "Zyn Logo",
    href: "/brands/zyn",
  },
  {
    title: "Pablo",
    imageSrc:
      "/images/other/featuredBrandsSlider/pablo_logo.svg",
    imageAlt: "Pablo Logo",
    href: "/brands/pablo",
  },
  {
    title: "Velo",
    imageSrc:
      "/images/other/featuredBrandsSlider/velo_logo.svg",
    imageAlt: "Velo Logo",
    href: "/brands/velo",
  },
  {
    title: "Siberia",
    imageSrc:
      "/images/other/featuredBrandsSlider/siberia_logo.svg",
    imageAlt: "Siberia Logo",
    href: "/brands/siberia",
  },
  {
    title: "Loop",
    imageSrc:
      "/images/other/featuredBrandsSlider/loop_logo.svg",
    imageAlt: "Loop Logo",
    href: "/brands/loop",
  },
];

export default function FeaturedBrandsSlider({
  items,
  headline = "Leading Nicotine Pouch Brands",
  description = "From iconic Swedish brands to innovative newcomers, explore the nicotine pouch brands shaping the future of smoke-free alternatives.",
  className,
  showAutoplay = false,
}) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  // const brands = items;

  const handleMouseEnter = () => {
    if (swiperRef.current?.autoplay) {
      swiperRef.current.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (swiperRef.current?.autoplay && showAutoplay) {
      swiperRef.current.autoplay.start();
    }
  };

  return (
    <section
      className={["relative py-12 md:py-16", className]
        .filter(Boolean)
        .join(" ")}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-2xl font-bold tracking-tight md:text-4xl">
            {headline}
          </h2>
          {description && (
            <p className="text-muted mx-auto max-w-2xl">
              {description}
            </p>
          )}
        </div>

        {/* Navigation Controls */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              ref={prevRef}
              aria-label="Previous brand"
              className="prev-btn group inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
            </button>
            <button
              ref={nextRef}
              aria-label="Next brand"
              className="next-btn group inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Swiper */}
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            // Set navigation after swiper is initialized
            if (prevRef.current && nextRef.current) {
              swiper.params.navigation.prevEl =
                prevRef.current;
              swiper.params.navigation.nextEl =
                nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }
          }}
          modules={[
            Navigation,
            Pagination,
            A11y,
            Keyboard,
            ...(showAutoplay ? [Autoplay] : []),
          ]}
          keyboard={{ enabled: true }}
          a11y={{
            // enabled: true,
            prevSlideMessage: "Previous brand",
            nextSlideMessage: "Next brand",
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl =
              prevRef.current;
            swiper.params.navigation.nextEl =
              nextRef.current;
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          pagination={{
            clickable: true,
            bulletActiveClass: "!bg-primary !opacity-100",
            bulletClass:
              "swiper-pagination-bullet !bg-black/40 !opacity-60 hover:!bg-black/60",
          }}
          autoplay={
            showAutoplay
              ? {
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
              : false
          }
          spaceBetween={16}
          slidesPerView={1.2}
          breakpoints={{
            480: {
              slidesPerView: 1.5,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 18,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 22,
            },
            1280: {
              slidesPerView: 3.5,
              spaceBetween: 24,
            },
            1536: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
          className="smokekicker-slider pb-12!"
        >
          {brands.map((brand, index) => (
            <SwiperSlide key={`${brand.href}-${index}`}>
              <BrandCard item={brand} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

function BrandCard({ item, index }) {
  const backgroundVariations = [1, 2, 3, 4];
  const variationNumber =
    backgroundVariations[
      index % backgroundVariations.length
    ];

  return (
    <Link
      href={item.href}
      className="group aspect-1 flex min-h-80 flex-col items-center justify-center overflow-hidden rounded-2xl bg-cover bg-center px-6 shadow-lg backdrop-blur transition-all duration-300 hover:bg-white/10 hover:shadow-xl"
      style={{
        backgroundImage: `url('/images/other/featuredBrandsSlider/bg/dark-orange_bg_variation-${variationNumber}.webp')`,
      }}
      aria-label={`Browse brand: ${item.title}`}
    >
      <Image
        src={item.imageSrc}
        alt={item.imageAlt || item.title}
        width={400}
        height={200}
        className="h-auto w-4/5 object-cover opacity-80 invert-100 transition-[transform__opacity] duration-500 group-hover:scale-110 group-hover:opacity-100"
        priority={false}
      />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black to-black/10 px-4 pt-6 pb-4">
        <div className="mb-1">
          <h3 className="text-base font-bold text-white sm:text-lg">
            {item.title}
          </h3>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs font-medium tracking-wide uppercase">
            Shop
          </span>
          <span className="bg-primary group-hover:bg-primary/80 inline-flex h-8 w-8 items-center justify-center rounded-full text-white backdrop-blur transition-all group-hover:translate-x-1">
            <ChevronRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
