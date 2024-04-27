"use client"
import { toast } from "sonner";
import { Button } from "../shadcn/button";
import { Product } from "@/lib/definitions";
import Link from "next/link";

// export async function BuyProduct(id_user: number, product: Product) {
//     try {
//       const res = await fetch("api/checkout", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ product: product, id_user },),
//       });

//       if (!res.ok) {
//         throw new Error("Failed to create checkout session");
//       }

  
//       const session = await res.json();
//       window.location = session.url;
//     } catch (error: any) {
//       console.error("Error buying product:", error);
//       toast("error: " + error.message);
//     }
//   }

// export default function PayBotton({id_user, product} : {id_user: number, product :Product}) {
  export default function PayButton() {

  return (
    <Link href="/pago">
      {/* <Button className="text-white" onClick={() => BuyProduct(id_user,product)}> */}
      <Button className="text-white">
        Comprar
      </Button>
    </Link>
  );
}
