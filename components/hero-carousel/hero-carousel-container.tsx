import { getCollectionProducts } from "lib/shopify";
import HeroCarousel from "./hero-carousel";

const HeroCarouselContainer = async () => {
  const products = await getCollectionProducts({
    collection: "hidden-homepage-hero-carousel",
  });

  if (!products?.length) return null;

  return <HeroCarousel products={products} />;
};

export default HeroCarouselContainer;
