import ProductsTable from "@/components/products/ProductsTable";
import Search from "@/components/utils/Search";
import MyPagination from "@/components/utils/myPagination";

import { Suspense } from 'react';
import { fetchProducts } from "@/lib/data";
import { fetchProductsPages } from '@/lib/data';
import { auth, getUser } from "@/auth";
import { addUserGoogle } from "@/lib/actionscommands";

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

  const totalPages = await fetchProductsPages(query);


  //Recuperar el USERID
  const authentication = await auth()
  console.log(authentication)
  const user = String(authentication?.user?.email)
  const completeUser = await getUser(user);
  const id_user = Number(completeUser?.id_user)

// Todo utilizar esta funcion para guardrar el usario de google en la base de datos
  // if(user==='cristianlogo6@gmail.com' && authentication !=null){
  //   addUserGoogle(authentication)
  // }

  // This component passed as a fallback to the Suspense boundary
  // will be rendered in place of the search bar in the initial HTML.
  // When the value is available during React hydration the fallback
  // will be replaced with the `<SearchBar>` component.
  function SearchBarFallback() {
    return <div>Cargando...</div>
  }

  return (
    <>
      <h1 className="py-10">Tienda</h1>
      <div className="my-5 flex items-center justify-between gap-2 md:mt-8">
         <Search placeholder="Buscar productos..." />
      </div>
        <Suspense fallback={<SearchBarFallback />}>
      <ProductsTable currentPage={currentPage} id_user={id_user} />
        </Suspense>
      <div className="mt-5 flex w-full justify-center">
          <MyPagination totalPages={totalPages} currentPage={currentPage}></MyPagination>
      </div>
    </>
  );
}
