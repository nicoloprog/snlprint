"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { Product } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { GridTileImage } from "../grid/tile";

interface EmblaCarouselProps {
  products: Product[];
}

export default function EmblaCarousel({ products }: EmblaCarouselProps) {
  // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
  const carouselProducts = [...products, ...products, ...products];

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
      dragFree: false,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const scrollbar = document.querySelector(
        ".scrollbar-track"
      ) as HTMLElement;
      if (!scrollbar) return;

      const rect = scrollbar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, clickX / rect.width));
      const targetIndex = Math.round(percentage * (scrollSnaps.length - 1));
      scrollTo(targetIndex);
    },
    [isDragging, scrollSnaps.length, scrollTo]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div className="relative">
      {/* Background paint drop */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-(--breakpoint-2xl) h-full -z-1">
        <div className="absolute bottom-0 translate-x-[30%] translate-y-[30%] w-[2000px] h-[2000px]">
          <Image
            src="/paint-drop.png"
            alt="Sick & Legend"
            fill
            objectFit="contain"
          />
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full overflow-hidden pb-6 pt-1 mb-6 px-4">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex">
            {carouselProducts.map((product, i) => (
              <div
                key={`${product.handle}${i}`}
                className="embla__slide flex-[0_0_auto] relative aspect-square h-[30vh] max-h-[275px] w-[90%] max-w-[475px] md:w-1/3 mr-4"
              >
                <Link
                  href={`/product/${product.handle}`}
                  className="relative h-full w-full"
                >
                  <GridTileImage
                    alt={product.title}
                    label={{
                      title: product.title,
                      amount: product.priceRange.maxVariantPrice.amount,
                      currencyCode:
                        product.priceRange.maxVariantPrice.currencyCode,
                    }}
                    src={product.featuredImage?.url}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-200 group"
          onClick={scrollPrev}
          aria-label="Previous slide"
        >
          <ChevronLeftIcon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </button>

        <button
          className="hidden lg:block absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-200 group"
          onClick={scrollNext}
          aria-label="Next slide"
        >
          <ChevronRightIcon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </button>

        {/* Scrollbar Pagination */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 w-64 h-2 bg-white/20 rounded-full">
          <div
            className="h-full w-12 bg-purple-600 rounded-full transition-all duration-300 ease-out cursor-pointer"
            style={{
              transform: `translateX(${(selectedIndex / (scrollSnaps.length - 1)) * (256 - 48)}px)`,
            }}
            onClick={() => scrollTo(selectedIndex)}
            aria-label="Current slide indicator"
          />
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const percentage = clickX / rect.width;
              const targetIndex = Math.round(
                percentage * (scrollSnaps.length - 1)
              );
              scrollTo(targetIndex);
            }}
          />
        </div>
      </div>
    </div>
  );
}
