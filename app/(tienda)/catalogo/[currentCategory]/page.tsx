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
  countProducts,
  fetchAllCategories,
} from "@/lib/data";
import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";

export const dynamicParams = false;

//! En tiempo de compilación
export async function generateStaticParams() {
  const categories = await fetchAllCategories();

  return categories.map((category) => ({
    category: category,
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
  const { currentCategory } = params;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const productOnPage = 3;
  const totalPages = await fetchProductsPagesperCategory(
    currentCategory,
    query,
    productOnPage
  );

  const authentication = await auth();
  const id_user = Number(authentication?.user?.id);

  const products = await fetchfilteredProductsperCategories(
    currentCategory,
    currentPage,
    productOnPage,
    query
  );
  
  const Categories = await fetchAllCategories();

  console.log(currentCategory);
  return (
    <>
      <h1 className="flex justify-center text-4xl mt-5">{currentCategory}</h1>
      <div className="my-5 flex items-center justify-between md:mt-8">
        <Search placeholder="Buscar productos..." />
      </div>
      <div className="flex flex-col gap-5 md:flex-row border p-5">
        <div className="flex flex-col flex-grow border rounded-lg p-6">
          <h1 className="text-lg font-semibold mb-4 hidden md:block">
            CATEGORIAS
          </h1>
          {Categories.map((category) => (
            <Link
              href={`/catalogo/${category}`}
              key={category}
              className={`py-2 px-4 border-b hidden md:block ${
                currentCategory === category ? "bg-secondary" : ""
              }`}
            >
              {category}
            </Link>
          ))}
        </div>
        <ProductsTable products={products} id_user={id_user} />
      </div>
      <div className="mt-5 flex w-full justify-center">
        <MyPagination
          totalPages={totalPages}
          currentPage={currentPage}
        ></MyPagination>
      </div>
    </>
  );
}
