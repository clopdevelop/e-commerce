import { fetchAllProducts } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
// import { GridTileImage } from './c';

export async function CarouselProducts() {
  const products = await fetchAllProducts();
  // Collections that start with `hidden-*` are hidden from the search page.
  //   const products = await getCollectionProducts({ collection: 'hidden-homepage-carousel' });

  if (!products?.length) return null;

  // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
  const carouselProducts = [...products, ...products, ...products];

  return (
    <div className="w-full overflow-x-auto my-6 md:mt-12 pb-6">
      <ul className="flex animate-carousel gap-20">
        {carouselProducts.map((product) => (
          <li
            key={`${product.id}`}
            className="relative h-20vh max-h-34 w-1/3 max-w-xs flex-none md:w-1/12"
          >
            <Link
              href={`/catalogo/product/${product.id}`}
              className="relative h-full w-full text-balance text-center"
            >
              <div className="group flex flex-col h-full w-full items-center justify-between overflow-hidden rounded-lg bg-white hover:border-blue-600 dark:bg-black gap-2 shadow-lg p-2">
                <div className="h-15 py-2">
                  {product.name ? (
                    <span>{product.name}</span>
                  ) : (
                    <span className="text-transparent">Sin nombre</span>
                  )}
                </div>
                <div className="h-24 w-24 relative">
                  <Image
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    src={product.ProductImage[0].url ?? ""}
                    width={100}
                    height={100}
                    priority={true}
                    objectFit="cover"
                  />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
