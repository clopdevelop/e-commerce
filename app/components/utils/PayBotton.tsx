"use client"
import { toast } from "sonner";
import { Button } from "../shadcn/button";
import { Product } from "@/lib/definitions";

export default function PayBotton({id_user, product} : {id_user: number, product :Product}) {

    async function BuyProduct(product: Product) {
        try {
          const res = await fetch("api/checkout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ product: product, id_user },),
          });
    
          const session = await res.json();
    
          if (res) {
            window.location = session.url;
          } else {
            throw new Error("Invalid session data");
          }
        } catch (error: any) {
          console.error("Error buying product:", error);
          toast("error: " + error.message);
        }
      }
  return (
    <Button className="text-white" onClick={() => BuyProduct(product)}>
      Comprar
    </Button>
  );
}
