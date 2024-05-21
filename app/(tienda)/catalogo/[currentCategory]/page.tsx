import { auth } from "@/auth";
import ProductsTable from "@/components/products/ProductsTable";
import Search from "@/components/utils/Search";
import MyPagination from "@/components/utils/myPagination";
import {
  fetchProductsPages,
  fetchFilteredProducts,
  countProductsCatalog,
  fetchfilteredProductsperCategories,
  getUser,
  countProducts,
  fetchAllCategories,
  fetchAllProducts,
  getUserID,
} from "@/lib/data";
import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";
import Categories from "@/components/products/Categories";

export const dynamicParams = false;

//! En tiempo de compilación
export async function generateStaticParams() {
  const categories = await fetchAllCategories();

  return categories.map((category) => ({
    currentCategory: category,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { currentCategory: string };
}): Promise<Metadata> {
  return { 
    title: params.currentCategory,
  };
}

export default async function Home({
  searchParams,
  params,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
  params: {
    currentCategory: string;
  };
}) {

  const currentCategory  = params.currentCategory;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const productsOnPage = 3;
  const totalPages = await countProductsCatalog(
    currentCategory,
    query,
    productsOnPage
  );  

  const id_user = await getUserID();



  return (
    <>
      <h1 className="flex justify-center text-4xl mt-5">{currentCategory}</h1>
      <div className="my-5 flex items-center justify-between md:mt-8">
        <Search placeholder="Buscar productos..." />
      </div>
      <div className="flex flex-col gap-5 md:flex-row border p-5">
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
            category={currentCategory}
            id_user={id_user}
          />
        </Suspense>
      </div>
      <div className="mt-5 flex w-full justify-center">
        <MyPagination
          totalPages={totalPages}
        ></MyPagination>
      </div>
    </>
  );
}
