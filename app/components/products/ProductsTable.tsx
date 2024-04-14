
import { Toaster } from "sonner";
import { fetchProducts } from "@/lib/data";
import ProductCard from "../product/ProductCard";



export default async function ProductsTable({
  currentPage,
  id_user,
}: {
  currentPage:number;
  id_user: number;
}) {
  const Products = await fetchProducts(currentPage);

  return (
    <>
      <div className="flex flex-row justify-center">
        {Products.map((product) => (
          <ProductCard product={product} id_user={id_user}></ProductCard>
        ))}
        <Toaster></Toaster>
      </div>
    </>
  );
}
