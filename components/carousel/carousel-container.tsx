import { getCollectionProducts } from "lib/shopify";
import EmblaCarousel from "./embla-carousel";

const CarouselContainer = async () => {
  const products = await getCollectionProducts({
    collection: "hidden-homepage-carousel",
  });

  if (!products?.length) return null;

  return <EmblaCarousel products={products} />;
};

export default CarouselContainer;
