import CarouselContainer from "components/carousel/carousel-container";
import { ThreeItemGrid } from "components/grid/three-items";
import HeroCarouselContainer from "components/hero-carousel/hero-carousel-container";
import Footer from "components/layout/footer";
import Link from "next/link";

export const metadata = {
  description:
    "High-performance ecommerce store built with Next.js, Vercel, and Shopify.",
  openGraph: {
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroCarouselContainer />

      <div className="max-w-(--breakpoint-2xl) mx-auto px-4 mb-8">
        <h1 className="text-6xl mb-4">Sick & Legend</h1>
        <p className="max-w-6xl">
          With its bold graffiti design and striking colors, the Sick & Legend
          logo embodies urban attitude, creativity, and boundless energy. Made
          for those who dare to stand out, it&apos;s far more than just a
          visual — it&apos;s a statement of style and character.
        </p>
      </div>
      <ThreeItemGrid />
      <CarouselContainer />
      <Link href="/search">
        <button className="bg-purple-600 hover:bg-purple-500 shadow-lg  hover:shadow-purple-500/30 transition-all duration-300 text-white px-4 py-2 rounded-md mx-auto block my-12 ">
          View all products
        </button>
      </Link>
      <Footer />
    </>
  );
}
