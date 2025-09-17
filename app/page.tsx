import { Carousel } from "components/carousel";
import { ThreeItemGrid } from "components/grid/three-items";
import Footer from "components/layout/footer";

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
      <Footer />
    </>
  );
}
