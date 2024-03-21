import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchFilteredProducts } from "@/lib/data";

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

  

