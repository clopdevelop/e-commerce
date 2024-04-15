/**
 * v0 by Vercel.
 * @see https://v0.dev/t/qi0pnZTYeaT
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
// import Link from "next/link"
import { Card, CardHeader, CardContent } from "@/components/shadcn/card"
import { StarIcon } from "lucide-react"

export default function FavsProducts() {
  const favproducts = false;



  return (
    <div className="divide-y">
      <div className="flex items-center justify-between pb-4">
        <h1 className="text-2xl font-bold">Tus productos favoritos</h1>
        {/* <Link className="text-sm font-medium underline" href="#"> */}
        Ver todo
        {/* </Link> */}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 items-stretch py-4">
        <Card>
          {/* <Link className="absolute inset-0 rounded-lg overflow-hidden z-10" href="#" /> */}
          <div className="grid gap-2.5 p-4">
            <img
              alt="Thumbnail"
              className="aspect-square object-cover rounded-lg border border-gray-200 overflow-hidden dark:border-gray-800"
              height={250}
              src="/placeholder.svg"
              width={250}
            />
            <div className="grid gap-2">
              <h3 className="font-bold text-base leading-none">Example Product Title</h3>
              <p className="text-sm leading-none text-muted">Description of the product. This can be long or short.</p>
            </div>
          </div>
        </Card>
        <>{favproducts
          ? ({/* <FavProducts> products={favproducts}></Favs>   */ })
          : (<h2>No has añadido productos a tus Favoritos</h2>)
        }</>
      </div>
      <div className="flex items-center justify-between pt-8 pb-4">
        <h1 className="text-2xl font-bold">Nuevos productos de proveedores seguidos</h1>
        {/* <Link className="text-sm font-medium underline" href="#"> */}
        Ver todo
        {/* </Link> */}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 items-stretch py-4">
        <Card>
          {/* <Link className="absolute inset-0 rounded-lg overflow-hidden z-10" href="#" /> */}
          <div className="grid gap-6 md:gap-3 items-start">
            <Card>
              <CardHeader className="pb-0">
                {/* <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              </div>
            </div> */}
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid sm:grid-cols-2 gap-4">
                  <img
                    alt="Product Image"
                    className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                    height={600}
                    src="/placeholder.svg"
                    width={600}
                  />
                  <img
                    alt="Product Image"
                    className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                    height={600}
                    src="/placeholder.svg"
                    width={600}
                  />
                  <img
                    alt="Product Image"
                    className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                    height={600}
                    src="/placeholder.svg"
                    width={600}
                  />
                  <img
                    alt="Product Image"
                    className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                    height={600}
                    src="/placeholder.svg"
                    width={600}
                  />
                </div>
              </CardContent>
              <CardContent className="pt-0">
                <h3 className="font-bold text-xl sm:text-2xl">WhimsiMug: Sip in Style and Magic</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                  </div>
                </div>
                <div className="grid gap-4 text-sm leading-loose">
                  <p>Introducing the WhimsiMug, a delightful companion for your daily sips of joy.</p>
                  <p>
                    The magic truly lies in the design - a burst of vibrant colors and whimsical patterns that dance across
                    the mug's surface, telling a story of wonder and creativity. Every sip from the WhimsiMug is like
                    stepping into a world of imagination, where the ordinary transforms into the extraordinary.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              {/* <Link className="absolute inset-0 rounded-lg overflow-hidden z-10" href="#" /> */}
              <div className="grid gap-2.5 p-4">
                <img
                  alt="Thumbnail"
                  className="aspect-square object-cover rounded-lg border border-gray-200 overflow-hidden dark:border-gray-800"
                  height={250}
                  src="/placeholder.svg"
                  width={250}
                />
                <div className="grid gap-2">
                  <h3 className="font-bold text-base leading-none">Example Product Title</h3>
                  <p className="text-sm leading-none text-muted">Description of the product. This can be long or short.</p>
                </div>
              </div>
            </Card>
            <Card>
              {/* <Link className="absolute inset-0 rounded-lg overflow-hidden z-10" href="#" /> */}
              <div className="grid gap-2.5 p-4">
                <img
                  alt="Thumbnail"
                  className="aspect-square object-cover rounded-lg border border-gray-200 overflow-hidden dark:border-gray-800"
                  height={250}
                  src="/placeholder.svg"
                  width={250}
                />
                <div className="grid gap-2">
                  <h3 className="font-bold text-base leading-none">Example Product Title</h3>
                  <p className="text-sm leading-none text-muted">Description of the product. This can be long or short.</p>
                </div>
              </div>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  )
}
