import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchFilteredProducts } from "@/lib/data";
import { Button } from "./ui/button";

export default async function ProductsTable({
    query,
    currentPage,
  }: {
    query: string;
    currentPage: number;
  }) {
    const filteredProducts = await fetchFilteredProducts(query, currentPage);

    return (
        <>
        <div className="flex flex-row">
          {filteredProducts.map((product) => (
            <Card
              className="m-4 max-w-80 min-w-80 max-h-96 min-h-96"
              key={product.id_product}
            >
              <CardHeader>
                <CardTitle className="h-14 leading-relaxed line-clamp-2 text-balance">
                  {product.name}
                </CardTitle>
                <CardDescription className="h-16">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="h-36">
                Imagen {/* TODO Añadir imagenes */}
              </CardContent>
              <CardFooter className='flex justify-between '>
                <p>{product.price}€</p>
                <div className="flex gap-2 ">
                <Button className="text-white"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 17h-11v-14h-2" /><path d="M6 5l14 1l-1 7h-13" /></svg></Button>
                <Button className="text-white">Comprar</Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        </>
      );
  }

  

