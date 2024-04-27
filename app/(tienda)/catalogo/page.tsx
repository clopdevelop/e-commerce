import ProductsTable from "@/components/products/ProductsTable";
import Search from "@/components/utils/Search";
import MyPagination from "@/components/utils/myPagination";

import { Suspense } from 'react';
import { fetchProductsPages } from '@/lib/data';
import { auth } from "@/auth";
import { getUser } from "@/lib/data";
// import { addUserGoogle } from "@/lib/actionscommands";

export const metadata = {
  title: 'La mejor Tienda',
  description: 'Es una tienda que es la mejor.',
 };

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
  const productOnPage = 3;
  const totalPages = await fetchProductsPages(query,productOnPage);


  //Recuperar el USERID
  const authentication = await auth()
  const user = authentication?.user?.id
  const user_email = String(authentication?.user?.email)
  const completeUser = await getUser(user_email);
  const id_user = Number(completeUser?.id)

// Todo utilizar esta funcion para guardrar el usario de google en la base de datos
// ? El problema es que no funciona el adaptador de prisma
  // if(user==='cristianlogo6@gmail.com' && authentication !=null){
  //   addUserGoogle(authentication)
  // }


  function SearchBarFallback() {
    //todo cambiar por un skeleton
    return <div>Cargando...</div>
  }

  return (
    <>
      <h1>Tienda</h1>
      <div className="my-5 flex items-center justify-between gap-2 md:mt-8">
         <Search placeholder="Buscar productos..." />
      </div>
        <Suspense fallback={<SearchBarFallback />}>
          <ProductsTable currentPage={currentPage} id_user={id_user} query={query} />
        </Suspense>
      <div className="mt-5 flex w-full justify-center">
          <MyPagination totalPages={totalPages} currentPage={currentPage}></MyPagination>
      </div>
    </>
  );
}
