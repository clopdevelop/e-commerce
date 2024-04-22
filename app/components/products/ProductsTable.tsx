
import { Toaster } from "sonner";
import { fetchAllCategories, fetchAllProducts, fetchFilteredProducts, fetchProducts } from "@/lib/data";
import ProductCard from "../product/ProductCard";



export default async function ProductsTable({
  currentPage,
  id_user,
  query
}: {
  currentPage: number
  id_user: number
  query: string
}) {
  const productsOnPage = 3;
  const Products = await fetchFilteredProducts(query, currentPage, productsOnPage);
  const Categories = await fetchAllCategories();

  return (
    <>
      <div className="flex gap-5">
        <div className="flex flex-col border-4 py-6 px-14">
        <h1>CATEGORIAS</h1>
        {Categories.map((category) => (
            <h2>{category.name}</h2>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {Products.map((product) => (
            <ProductCard product={product} id_user={id_user}></ProductCard>
          ))}
        </div>
      </div>
      <Toaster></Toaster>
    </>
  );
}
