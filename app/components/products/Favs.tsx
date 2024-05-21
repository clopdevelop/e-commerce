/**
 * v0 by Vercel.
 * @see https://v0.dev/t/qi0pnZTYeaT
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
// import Link from "next/link"
import { Card, CardHeader, CardContent } from "@/components/shadcn/card"
import { fetchProductsbyIDs } from "@/lib/data";
import { Product } from "@/lib/definitions";
import { StarIcon } from "lucide-react"
import Link from "next/link";
import Image from "next/image";
import ProductCard from "../product/ProductCard";

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
    <div className="divide-y">
      <div className="flex items-center justify-between pb-4">
        <h1 className="text-2xl font-bold">Tus productos favoritos</h1>
        <Link className="text-sm font-medium underline" href="/dashboard/fav/all">
        Ver todo
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 items-stretch py-4">
        {favproducts
          ? Products.filter((product,index) => {
            while(index<3){
              return product
            }
          }).map((product) => (
            //   <Card key={product.id}>
            //   {/* <Link className="absolute inset-0 rounded-lg overflow-hidden z-10" href="#" /> */}
            //   <div className="grid gap-2.5 p-4">
            //     <Image
            //       alt="Thumbnail"
            //       className="aspect-square object-cover rounded-lg border border-gray-200 overflow-hidden dark:border-gray-800"
            //       height={250}
            //       src="/placeholder.svg"
            //       width={250}
            //     />
            //     <div className="grid gap-2">
            //       <h3 className="font-bold text-base leading-none">{product.name}</h3>
            //       <p className="text-sm leading-none text-muted">Description of the product. This can be long or short.</p>
            //     </div>
            //   </div>
            // </Card>
            <ProductCard product={product} id_user={1}></ProductCard>
          ))
          : <h2>No has añadido productos a tus Favoritos</h2>
        }
      </div>
     
    </div>
  )
}
