import { auth } from "@/auth";
import ProductsTable from "@/components/products/ProductsTable";
import Search from "@/components/utils/Search";
import MyPagination from "@/components/utils/myPagination";
import {
  fetchProductsPages,
  fetchFilteredProducts,
  fetchProductsPagesperCategory,
  fetchfilteredProductsperCategories,
  getUser,
} from "@/lib/data";
import { Suspense } from "react";

export default async function Home({
  searchParams,
  params,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
  params: {
    category: string;
  };
}) {
  const {category} = params;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const productOnPage = 3;
  const totalPages = await fetchProductsPagesperCategory(
    category,
    query,
    productOnPage
  );

  const authentication = await auth();
  const id_user = Number(authentication?.user?.id);

  const products = await fetchfilteredProductsperCategories(
    category,
    currentPage,
    productOnPage,
    query
  );

  function SearchBarFallback() {
    //todo cambiar por un skeleton
    return <div>Cargando...</div>;
  }

  return (
    <>
      <h1 className="flex justify-center text-4xl mt-5">{category}</h1>
      <div className="my-5 flex items-center justify-between md:mt-8">
        <Search placeholder="Buscar productos..." />
      </div>
      <Suspense fallback={<SearchBarFallback />}>
        <ProductsTable products={products} id_user={id_user} currentCategory={category}/>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <MyPagination
          totalPages={totalPages}
          currentPage={currentPage}
        ></MyPagination>
      </div>
    </>
  );
}
