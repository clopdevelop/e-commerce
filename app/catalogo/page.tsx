import ProductsTable from "@/components/ProductsTable";
import Search from "@/components/Search";
import MyPagination from "@/components/myPagination";

import { fetchFilteredProducts } from "@/lib/data";
import { fetchProductsPages } from '@/lib/data';
import { auth, getUser } from "@/auth";

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

  const filteredProducts = await fetchFilteredProducts(query, currentPage);


  const totalPages = await fetchProductsPages(query);

  //Recuperar el USERID
  const authentication = await auth()
  console.log(authentication)
  const user = String(authentication?.user?.email)
  const completeUser = await getUser(user);
  const id_user = Number(completeUser?.id_user)

  return (
    <>
      <h1 className="py-10">Tienda</h1>
      <div className="my-5 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar productos..." />
      </div>
      <ProductsTable 
       filteredProducts={filteredProducts} id_user={id_user} />
      <div className="mt-5 flex w-full justify-center">
          <MyPagination totalPages={totalPages} currentPage={currentPage}></MyPagination>
      </div>
    </>
  );
}
