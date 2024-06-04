/**
 * v0 by Vercel.
 * @see https://v0.dev/t/qi0pnZTYeaT
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
// import Link from "next/link"
import { Card, CardHeader, CardContent } from "@/components/shadcn/card"
import { fetchProductsbyIDs } from "@/lib/data";

import { HeartIcon, StarIcon } from "lucide-react"
import Link from "next/link";
import Image from "next/image";
import ProductCard from "../product/ProductCard";
import { Button, Separator } from "../shadcn";
import { Product } from "@prisma/client";

interface Props {
  favorites?: number[]
}

export default async function FavsTable({ favorites }: Props) {
  const favproducts = true;
  let Products: Product[];

  if (favorites) {
    Products = await fetchProductsbyIDs(favorites) ?? ''
  } else {
    Products = []
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tus productos favoritos</h1>
        <Link className="text-sm font-medium underline" href="/dashboard/fav/all">
        Ver todo
        </Link>
      </div>
      <Separator className="my-4"></Separator>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 items-stretch py-4 ">
        {favproducts
          ? Products.filter((product,index) => {
            while(index<3){
              return product
            }
          }).map((product) => (
            <div key={product.id} className="shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2 overflow-hidden">
            <ProductCard product={product} id_user={1}></ProductCard>
            </div>
          ))
          : <h2>No has añadido productos a tus Favoritos</h2>
        }
      </div>
    </>
  )
}
