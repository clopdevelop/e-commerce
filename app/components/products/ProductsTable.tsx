
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
  <div className="flex flex-col gap-5 md:flex-row">
    <div className="flex flex-col border-4 py-6 px-14 md:w-1/4">
      <h1 className="hidden md:block">CATEGORIAS</h1>
      {Categories.map((category) => (
        <h2 className="hidden md:block">{category.name}</h2>
      ))}
    </div>
    <div className="grid grid-cols-2 gap-2 md:w-3/4">
      {Products.map((product) => (
        <ProductCard key={product.id} product={product} id_user={id_user}></ProductCard>
      ))}
    </div>
  </div>
  <Toaster></Toaster>
</>

  );
}
