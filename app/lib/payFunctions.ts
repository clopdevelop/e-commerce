import { toast } from "sonner";
import { CartItem } from "./definitions";
import { PaymentMethod } from "@prisma/client";

 export async function BuyProduct(id_user: number, product: CartItem, payData: PaymentMethod) {
    try {
      const res = await fetch("api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product: product, id_user, payData },),
      });

      if (!res.ok) {
        throw new Error("Failed to create checkout session");
      }
  
      const session = await res.json();
      window.location = session.url;
    } catch (error: any) {
      console.error("Error buying product:", error);
      toast("error: " + error.message);
    }
  }