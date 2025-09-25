"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { Product } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

interface HeroCarouselProps {
  products: Product[];
}

export default function HeroCarousel({ products }: HeroCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
      dragFree: false,
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

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

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <div className="max-w-(--breakpoint-2xl) mx-auto px-4 mb-12 relative ">
      {/* <div className="absolute -translate-x-[40%] -translate-y-[20%] w-[2000px] h-[2000px] -z-1 animate-slow-spin">
        <Image
          src="/paint-splash.png"
          alt="Sick & Legend"
          fill
          objectFit="contain"
        />
      </div> */}
      <div className="relative w-full h-[calc(100vh-104px)] 2xl:h-[calc(100vh-140px)] min-h-[500px] overflow-hidden rounded-2xl">
        {/* Embla Carousel Container */}
        <div className="embla h-full" ref={emblaRef}>
          <div className="embla__container flex h-full">
            {products.map(
              ({ id, title, handle, description, featuredImage }) => (
                <div
                  key={id}
                  className="embla__slide flex-[0_0_100%] min-w-0 relative group border border-transparent overflow-hidden rounded-2xl hover:border-purple-600"
                >
                  <Link
                    href={`/product/${handle}`}
                    className="relative h-full w-full"
                  >
                    <div className="relative w-full h-full group-hover:scale-105 transition duration-300">
                      {/* Optimized Background Image */}
                      {featuredImage?.url && (
                        <Image
                          src={featuredImage.url}
                          alt={featuredImage.altText || title || "Hero slide"}
                          fill
                          className="object-cover transition duration-300 ease-in-out group-hover:scale-105"
                          priority={true} // Preload all hero images
                          sizes="100vw"
                          quality={90}
                        />
                      )}

                      {/* Overlay for better text readability */}
                      <div className="absolute inset-0 bg-black/50" />

                      {/* Content */}
                      {(title || description) && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center text-white px-8">
                            {title && (
                              <h1 className="text-4xl md:text-8xl font-bold mb-4 font-story-script">
                                {title}
                              </h1>
                            )}
                            {description && (
                              <p className="text-lg md:text-3xl max-w-3/4 mx-auto font-permanent-marker">
                                {description}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </Link>
                </div>
              )
            )}
          </div>
        </div>

        {/* Navigation Arrows - Positioned on top */}
        <button
          className="hidden lg:block absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-200 group"
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
          <ChevronRightIcon className="w-6 h-6 text-white group-hover:scale-110  transition-transform" />
        </button>

        {/* Pagination Dots - Positioned on top */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === selectedIndex
                  ? "bg-purple-600 scale-125 w-6"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
