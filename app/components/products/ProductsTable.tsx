import { Toaster } from "sonner";
import ProductCard from "../product/ProductCard";
import { Product } from "@/lib/definitions";
import { Suspense } from "react";
import {
  countProductsCatalog,
  fetchAllProducts,
  fetchFilteredProducts,
  fetchfilteredProductsperCategories,
} from "@/lib/data";
import MyPagination from "../utils/myPagination";

export default async function ProductsTable({
   query,
  currentPage,
  productsOnPage,
  category,
  id_user,
}: {
  query: string;
  currentPage: number;
  productsOnPage: number;
  category?: string;
  id_user: number;
}) {
  if(!category) category=''

  const products = await fetchfilteredProductsperCategories(
    query,
    currentPage,
    productsOnPage,
    category,
  );

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
      <Toaster></Toaster>
    </div>
  );
}
