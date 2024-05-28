import ProductsTable from "@/components/products/ProductsTable";
import Search from "@/components/utils/Search";
import MyPagination from "@/components/utils/myPagination";
import {
  fetchProductsPages,
  getUserID,
} from "@/lib/data";
import { CarouselProducts } from "@/components/products/CarouselProducts";
import { Suspense } from "react";
// import { addUserGoogle } from "@/lib/actionscommands";
import type { Metadata } from "next";
import { Filters } from "@/components/products/Filters";
import { Card, CardContent, CardFooter } from "@/components/shadcn";

export const dynamicParams = false;

export const metadata = {
  title: "Tienda",
  description: "Es una tienda que es la mejor.",
};


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
      {/* <h1 className="flex justify-center  mt-5"> */}
      <h1 className="font-semibold text-4xl leading-none tracking-tight p-5 text-center">
      TIENDA</h1>
      <div className="my-4">
        <Search placeholder="Buscar productos..." />
      </div>
      <Card className="m-2 border-0 shadow-none">
        <CardContent className="flex flex-col gap-5 md:flex-row p-2">
        <Filters></Filters>
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
        </CardContent>
        <CardFooter>
          <div className="mt-5 mx-auto pb-8 overflow-auto w-3/4 flex-none">
        <MyPagination
          totalPages={totalPages}
        ></MyPagination>
      </div>
        </CardFooter>
      </Card>
      
      {/* <CarouselProducts></CarouselProducts> */}
    </>
  );
}
