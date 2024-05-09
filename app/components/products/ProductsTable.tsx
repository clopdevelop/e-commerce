import { Toaster } from "sonner";
import ProductCard from "../product/ProductCard";
import { Product } from "@/lib/definitions";
import { Suspense } from 'react';


export default async function ProductsTable({
  products,
  id_user,
}: {
  products: Product[];
  id_user: number;
}) {

  return (
      <Suspense fallback={<div>Cargando...</div>}>
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
        </Suspense>
  );
}
