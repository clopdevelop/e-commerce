import { Toaster } from "sonner";
import {
  fetchAllCategories,
  fetchAllProducts,
  fetchFilteredProducts,
  fetchProducts,
} from "@/lib/data";
import ProductCard from "../product/ProductCard";
import Link from "next/link";
import { Product } from "@/lib/definitions";

export default async function ProductsTable({
  products,
  currentPage,
  id_user,
  query,
}: {
  products?: Product[];
  currentPage: number;
  id_user: number;
  query: string;
}) {
  const productsOnPage = 3;
  const Products =
    products ??
    (await fetchFilteredProducts(query, currentPage, productsOnPage));

  const Categories = await fetchAllCategories();
  return (
    <>
      <div className="flex flex-col gap-5 md:flex-row">
        <div className="flex flex-col flex-grow border rounded-lg p-6">
          <h1 className="text-lg font-semibold mb-4 hidden md:block">
            CATEGORIAS
          </h1>
          {Categories.map((category) => (
            <Link
              href={`/catalogo/${category}`}
              key={category}
              className="py-2 px-4 border-b hidden md:block"
            >
              {category}
            </Link>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2 md:w-3/4">
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-5 border"> */}
          {Products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              id_user={id_user}
            ></ProductCard>
          ))}
        </div>
      </div>
      <Toaster></Toaster>
    </>
  );
}
