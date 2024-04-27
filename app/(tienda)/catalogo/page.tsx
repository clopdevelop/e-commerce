import ProductsTable from "@/components/products/ProductsTable";
import Search from "@/components/utils/Search";
import MyPagination from "@/components/utils/myPagination";

import { Suspense } from 'react';
import { fetchFilteredProducts, fetchProductsPages } from '@/lib/data';
import { auth } from "@/auth";
import { getUser } from "@/lib/data";
import {CarouselProducts} from "@/components/products/CarouselProducts";
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
  const productsOnPage = 3;
  const totalPages = await fetchProductsPages(query,productsOnPage);

  const products = await fetchFilteredProducts(query, currentPage, productsOnPage);

  //Recuperar el USERID
  const authentication = await auth()
  const id_user = Number(authentication?.user?.id)

  
// Todo55555 utilizar esta funcion para guardrar el usario de google en la base de datos
// ? El problema es que no funciona el adaptador de prisma
  // if(user==='cristianlogo6@gmail.com' && authentication !=null){
  //   addUserGoogle(authentication)
  // }


  function SearchBarFallback() {
    //todo999999 cambiar por un skeleton
    return <div>Cargando...</div>
  }

  
  return (
    <>
      <h1 className="flex justify-center text-4xl mt-5">TIENDA</h1>
      <div className="my-5  md:mt-8">
         <Search placeholder="Buscar productos..." />
      </div>
      <Suspense fallback={<SearchBarFallback />}>
        <ProductsTable products={products} id_user={id_user} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
          <MyPagination totalPages={totalPages} currentPage={currentPage}></MyPagination>
      </div>
      <CarouselProducts></CarouselProducts>
    </>
  );
}
