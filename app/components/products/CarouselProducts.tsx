import { fetchAllProducts } from '@/lib/data';
import Link from 'next/link';
// import { GridTileImage } from './c';

export async function CarouselProducts() {
    const products= await fetchAllProducts();
  // Collections that start with `hidden-*` are hidden from the search page.
//   const products = await getCollectionProducts({ collection: 'hidden-homepage-carousel' });

  if (!products?.length) return null;

  // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
  const carouselProducts = [...products, ...products, ...products];


  return (
    <div className="w-full overflow-x-auto my-10 pb-6 pt-1">
      <ul className="flex animate-carousel gap-4">
        {carouselProducts.map((product) => (
          <li
            key={`${product.id}`}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >
            <Link href={`/product/${product.id}`} className="relative h-full w-full">
              <div className='group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black'>
                {product.name}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
  
}
