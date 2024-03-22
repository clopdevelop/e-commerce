import ProductsTable from "@/components/ProductsTable";
import Search from "@/components/Search";
import MyPagination from "@/components/myPagination";

import { fetchFilteredProducts } from "@/lib/data";
import { fetchProductsPages } from '@/lib/data';

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const filteredProducts = await fetchFilteredProducts(query, currentPage);


  const totalPages = await fetchProductsPages(query);


  return (
    <>
      <h1 className="py-10">Tienda</h1>
      <div className="my-5 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar productos..." />
      </div>
      <ProductsTable 
       filteredProducts={filteredProducts} />
      <div className="mt-5 flex w-full justify-center">
          <MyPagination totalPages={totalPages} currentPage={currentPage}></MyPagination>
      </div>
    </>
  );
}
