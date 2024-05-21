import ProductsTable from "@/components/products/ProductsTable";
import Search from "@/components/utils/Search";
import MyPagination from "@/components/utils/myPagination";
import {
    countProducts,
  countProductsCatalog,
  fetchAllCategories,
  fetchFilteredProducts,
  fetchProductsPages,
  getUserID,
} from "@/lib/data";
import { CarouselProducts } from "@/components/products/CarouselProducts";
import Link from "next/link";
import { Suspense } from "react";
import Categories from "@/components/products/Categories";
// import { addUserGoogle } from "@/lib/actionscommands";
import type { Metadata } from "next";

export const dynamicParams = false;

export const metadata = {
  title: "La mejor Tienda",
  description: "Es una tienda que es la mejor.",
};
// export async function generateMetadata({
//   params,
// }: {
//   params: { currentCategory: string };
// }): Promise<Metadata> {
//   return { 
//     title: params.currentCategory,
//   };
// }

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  
  // const totalPages = await fetchProductsPages(query, productsOnPage);
  const productsOnPage = 3;
  const totalPages = await fetchProductsPages(query,productsOnPage);


  const id_user = await getUserID();


  // Todo55555 utilizar esta funcion para guardrar el usario de google en la base de datos
  // ? El problema es que no funciona el adaptador de prisma
  // if(user==='cristianlogo6@gmail.com' && authentication !=null){
  //   addUserGoogle(authentication)
  // }

  return (
    <>
      <h1 className="flex justify-center text-4xl mt-5">TIENDA</h1>
      <div className="my-5  md:mt-8">
        <Search placeholder="Buscar productos..." />
      </div>
      <div className="flex flex-col gap-5 md:flex-row border">
        <Categories></Categories>
        <Suspense
          key={query+currentPage}
          fallback={
            <div className="grid grid-cols-3 gap-2 md:w-3/4">Cargando...</div>
          }
        >
          <ProductsTable
            query={query}
            currentPage={currentPage}
            productsOnPage={productsOnPage}
            id_user={id_user}
          />
        </Suspense>
      </div>
      <div className="mt-5 mx-auto pb-8 overflow-auto w-3/4">
        <MyPagination
          totalPages={totalPages}
        ></MyPagination>
      </div>
      {/* <CarouselProducts></CarouselProducts> */}
    </>
  );
}
