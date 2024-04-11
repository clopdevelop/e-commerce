import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import AddCartButton from "@/components/utils/AddCartButton";
import { Toaster } from "sonner";
import { fetchProducts } from "@/lib/data";
import PayBotton from "../utils/PayBotton";



export default async function ProductsTable({
  currentPage,
  id_user,
}: {
  currentPage:number;
  id_user: number;
}) {
  const Products = await fetchProducts(currentPage);

  return (
    <>
      <div className="flex flex-row justify-center">
        {Products.map((product) => (
          <Card
            className="m-4 max-w-80 min-w-80 max-h-96 min-h-96"
            key={product.id}
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
            <CardFooter className="flex justify-between ">
              <p>{product.price}€</p>
              <div className="flex gap-2 ">
                {/* todo arreglar: como no existe el id user con el google auth no funciona con este */}
                <>
                  {id_user!=null ? (
                    <>
                      <AddCartButton product={product} ></AddCartButton>
                      <PayBotton id_user={id_user} product={product} />
                    </>
                  ) : (
                    <>
                      <AddCartButton product={product} ></AddCartButton>
                      <PayBotton id_user={id_user} product={product} />
                    </>
                  )}
                </>
              </div>
            </CardFooter>
          </Card>
        ))}
        <Toaster></Toaster>
      </div>
    </>
  );
}
