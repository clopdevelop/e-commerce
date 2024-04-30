import ProductsTable from "@/components/products/ProductsTable";
import Search from "@/components/utils/Search";
import MyPagination from "@/components/utils/myPagination";

import { fetchAllCategories, fetchFilteredProducts, fetchProductsPages } from '@/lib/data';
import { auth } from "@/auth";
import {CarouselProducts} from "@/components/products/CarouselProducts";
import Link from "next/link";
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

  
  const Categories = await fetchAllCategories();
  
  return (
    <>
      <h1 className="flex justify-center text-4xl mt-5">TIENDA</h1>
      <div className="my-5  md:mt-8">
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
              className={`py-2 px-4 border-b hidden md:block`}
            >
              {category}
            </Link>
          ))}
        </div>
        <ProductsTable products={products} id_user={id_user} />
      </div>
      <div className="mt-5 flex w-full justify-center">
          <MyPagination totalPages={totalPages} currentPage={currentPage}></MyPagination>
      </div>
      <CarouselProducts></CarouselProducts>
    </>
  );
}
