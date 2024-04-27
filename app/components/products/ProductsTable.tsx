import { Toaster } from "sonner";
import {
  fetchAllCategories,
} from "@/lib/data";
import ProductCard from "../product/ProductCard";
import Link from "next/link";
import { Product } from "@/lib/definitions";

export default async function ProductsTable({
  products,
  id_user,
  currentCategory,
}: {
  products: Product[];
  id_user: number;
  currentCategory?: string;
}) {


  console.log(currentCategory);
  

  const Categories = await fetchAllCategories();
  return (
    <div className="flex flex-col gap-5 md:flex-row border p-5">
        <div className="flex flex-col flex-grow border rounded-lg p-6">
          <h1 className="text-lg font-semibold mb-4 hidden md:block">
            CATEGORIAS
          </h1>
          {Categories.map((category) => (
            <Link
              href={`/catalogo/${category}`}
              key={category}
              className={`py-2 px-4 border-b hidden md:block ${currentCategory===category ? 'bg-secondary' : ''}`}
            >
              {category}
            </Link>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2 md:w-3/4">
        {products.length!==0 ? (
           products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              id_user={id_user}
            ></ProductCard>
          ))
        ):  (<div className="flex flex-col p-2 text-xl">No hay resultados </div>)
        }
      <Toaster></Toaster>
        </div>
    </div>
  );
}
