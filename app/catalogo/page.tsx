import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { data } from "@/lib/data";

export default async function Home() {
  const products = await data;
  return (
    <>
      <h1 className="py-10">Tienda</h1>
      <div className="flex flex-row">
        {products.map((product) => (
          <Card className="m-4 max-w-80 min-w-80 max-h-96 min-h-96" key={product.id_product}>
            <CardHeader>
              <CardTitle className="h-14 leading-relaxed line-clamp-2 text-balance">{product.name}</CardTitle>
              <CardDescription className="h-16">{product.description} con sillon y mesa del ikea y sus muertos a caballo punto com y eso to lo que te quieran vender</CardDescription>
            </CardHeader>
            <CardContent className="h-40">
            Imagen {/* TODO Añadir imagenes */}
            </CardContent>
            <CardFooter>
              <p>{product.price}€</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
