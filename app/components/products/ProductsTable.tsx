import { Toaster } from "sonner";
import ProductCard from "../product/ProductCard";
import { Product } from "@/lib/definitions";
import { Suspense } from "react";
import {
  countProductsCatalog,
  fetchAllProducts,
  fetchfilteredProducts,
} from "@/lib/data";
import MyPagination from "../utils/myPagination";
import { ProductSkeletonCard } from "../skeletons/ProductSkeletonCard";

export default async function ProductsTable({
   query,
  currentPage,
  productsOnPage,
  category,
  id_user,
  min,
  max
}: {
  query: string;
  currentPage: number;
  productsOnPage: number;
  category?: string;
  id_user: number;
  min: number;
  max: number;
}) {
  if(!category) category=''

  const priceRange = { min:min, max:max }

  const products = await fetchfilteredProducts(
    query,
    currentPage,
    productsOnPage,
    category,
    priceRange
  );
  console.log(products)

  return (
    <div className="grid  lg:grid-cols-3 gap-2 md:w-3/4">
      {products.length !== 0 ? (
        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            id_user={id_user}
          ></ProductCard>
        ))
      ) : (
        <div className="flex flex-col p-2 text-xl">No hay resultados </div>
      )}
      <Toaster richColors></Toaster>
    </div>
  );
}
