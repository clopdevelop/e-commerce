"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { addProductToCart } from "@/lib/actionscommands";
import { Toaster, toast } from "sonner"
import { Product } from "@/lib/definitions";

export default function ProductsTable({
  filteredProducts
  }: {
    filteredProducts: any[];
  }) {
    
  async function addProduct(product: { id_product: number; }) {
      try {
        const { id_product } = product;
        //todo recuperar el USERID
        await addProductToCart(1,id_product,1);
        toast("Producto agregado al carrito!")

      } catch (error) {
        console.error('Error agregando el producto al carrito:', error);
        alert('No se pudo agregar el producto al carrito.');
      }
    }
    async function BuyProduct(product: Product) {
      try {
          const res = await fetch('api/checkout', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ product: product })
          });
  
          const session = await res.json()
  
          if (res) {
              window.location = session.url;
          } else {
              throw new Error('Invalid session data');
          }
      } catch (error:any) {
          console.error("Error buying product:", error);
          toast("error: " + error.message)
      }
  }
  
    return (
        <>
        <div className="flex flex-row justify-center">
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
                  <Button onClick={() => addProduct(product)}  className="text-white">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  
                    strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 17h-11v-14h-2" /><path d="M6 5l14 1l-1 7h-13" /></svg>
                  </Button>
                  <Button className="text-white" onClick={() => BuyProduct(product)} >Comprar</Button>
                </div>
              </CardFooter>
            </Card>
            
          ))}
          <Toaster></Toaster>
        </div>
        </>
      );
  }

  

