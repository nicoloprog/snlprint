import { Carousel } from "components/carousel";
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
          Avec son design graffiti audacieux et ses couleurs percutantes, le
          logo Sick & Legend incarne l&apos;attitude urbaine, la créativité et
          l&apos;énergie sans limite. Pensé pour ceux qui osent se démarquer, il
          est bien plus qu&apos;un simple visuel : c&apos;est une déclaration de
          style et de caractère.
        </p>
      </div>
      <ThreeItemGrid />
      <Carousel />

      <Link href="/search">
        <button className="bg-purple-600 hover:bg-purple-500 shadow-lg  hover:shadow-purple-500/30 transition-all duration-300 text-white px-4 py-2 rounded-md mx-auto block my-12 ">
          Voir tous les produits
        </button>
      </Link>

      <Footer />
    </>
  );
}
