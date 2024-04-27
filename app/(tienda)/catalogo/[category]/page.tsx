import { auth } from "@/auth";
import ProductsTable from "@/components/products/ProductsTable";
import MyPagination from "@/components/utils/myPagination";
import {
  fetchProductsPages,
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
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const productOnPage = 3;
  const totalPages = await fetchProductsPagesperCategory(params.category, query, productOnPage);

  const authentication = await auth();
  const user = authentication?.user?.id;
  const user_email = String(authentication?.user?.email);
  const completeUser = await getUser(user_email);
  const id_user = Number(completeUser?.id);
  
  console.log(params);
  const products = await fetchfilteredProductsperCategories(params.category, currentPage, productOnPage);

  function SearchBarFallback() {
    //todo cambiar por un skeleton
    return <div>Cargando...</div>;
  }

  return (
    <div className="mx-auto w-11/12">
        <h1 className="flex justify-center  py-10 text-4xl">{params.category}</h1>
      <div>
        {products.length === 0 ? (
          "No hay productos"
        ) : (
          <Suspense fallback={<SearchBarFallback />}>
            <ProductsTable
              products={products}
              currentPage={currentPage}
              id_user={id_user}
              query={query}
            />
          </Suspense>
        )}
      </div>
      <div className="my-5 flex w-full justify-center">
        <MyPagination
          totalPages={totalPages}
          currentPage={currentPage}
        ></MyPagination>
      </div>
    </div>
  );
}
