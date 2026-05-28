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
 * CategorySlider – Enhanced responsive Swiper.js carousel for category links.
 * - Auto-generated category data with proper routing
 * - Keyboard, mouse, and touch-friendly
 * - Auto-play with pause on hover
 * - Better responsive breakpoints
 * - Improved accessibility
 */
export default function FeaturedCategoriesSlider({
  items,
  heading = "Upptäck vapes, vitt snus & nikotinprodukter",
  description = "Utforska vårt sortiment av noga utvalda produkter. Allt från podsystem till tobaksfritt vitt snus och nikotinersättning.",
  className,
  showAutoplay = false,
}) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  const categories = items;

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
            {heading}
          </h2>
          {description && (
            <p className="text-muted mx-auto max-w-2xl">{description}</p>
          )}
        </div>

        {/* Navigation Controls */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              ref={prevRef}
              aria-label="Föregående kategori"
              className="prev-btn group inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
            </button>
            <button
              ref={nextRef}
              aria-label="Nästa kategori"
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
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
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
            prevSlideMessage: "Föregående kategori",
            nextSlideMessage: "Nästa kategori",
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
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
          className="pb-12!"
        >
          {categories.map((category, index) => (
            <SwiperSlide key={`${category.href}-${index}`}>
              <CategoryCard item={category} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

function CategoryCard({ item }) {
  return (
    <Link
      href={item.href}
      className="group block overflow-hidden rounded-2xl bg-white/5 shadow-lg backdrop-blur transition-all duration-300 hover:bg-white/10 hover:shadow-xl"
      aria-label={`Utforska kategori: ${item.title}`}
    >
      <div className="relative aspect-3/4 w-full overflow-hidden">
        <Image
          src={item.imageSrc}
          alt={item.imageAlt || item.title}
          fill
          // sizes="(max-width: 480px) 85vw, (max-width: 768px) 45vw, (max-width: 1024px) 33vw, 25vw"
          sizes="(max-width: 479px) 85vw, (max-width: 639px) 67vw, (max-width: 767px) 50vw, (max-width: 1023px) 40vw, (max-width: 1279px) 33vw, (max-width: 1535px) 29vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          priority={false}
        />

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black via-black/50 to-transparent p-4">
          <div className="mb-1">
            <h3 className="mb line-clamp-2 text-base font-bold text-white sm:text-lg">
              {item.title}
            </h3>
            {item.description && (
              <p className="line-clamp-2 text-white">{item.description}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-medium tracking-wide uppercase">
              Utforska
            </span>
            <span className="bg-primary group-hover:bg-primary/80 inline-flex h-8 w-8 items-center justify-center rounded-full text-white backdrop-blur transition-all group-hover:translate-x-1">
              <ChevronRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
