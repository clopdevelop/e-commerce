import { auth } from "@/auth";
import ProductsTable from "@/components/products/ProductsTable";
import Search from "@/components/utils/Search";
import MyPagination from "@/components/utils/myPagination";
import {
  countProductsCatalog,
  fetchAllCategories,
  getUserIDSession,
} from "@/lib/data";
import { Suspense } from "react";
import type { Metadata } from "next";
import Categories from "@/components/products/Categories";
import { Card, CardContent } from "@/components/shadcn";
import { Filters } from "@/components/products/Filters";
import { ProductSkeletonCard } from "@/components/product/ProductSkeletonCard";

// Los segmentos dinámicos no incluidos en devolverán un error 404
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
  const currentCategory = params.currentCategory;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const productsOnPage = 3;
  const totalPages = await countProductsCatalog(
    currentCategory,
    query,
    productsOnPage
  );

  const id_user = await getUserIDSession();

  return (
    <>
      <h1 className="font-semibold text-4xl leading-none tracking-tight p-5 text-center">
        {currentCategory}
      </h1>
      <div className="my-4 flex items-center justify-between">
        <Search placeholder="Buscar productos..." />
      </div>
      <Card className="m-2 border-0 shadow-none">
        <CardContent className="flex flex-col gap-5 md:flex-row p-2">
          <Filters></Filters>
          <Suspense
            key={query + currentPage}
            fallback={
              <div className="grid  lg:grid-cols-3 gap-2 md:w-3/4">
                <ProductSkeletonCard></ProductSkeletonCard>
                <ProductSkeletonCard></ProductSkeletonCard>
                <ProductSkeletonCard></ProductSkeletonCard>
              </div>
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
        </CardContent>
      </Card>
      <div className="mt-5 flex w-full justify-center">
        <MyPagination totalPages={totalPages}></MyPagination>
      </div>
    </>
  );
}
