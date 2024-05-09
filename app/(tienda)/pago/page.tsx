import { auth } from "@/auth"
import ClientPay from "@/components/utils/ClientPayComponent";

import { redirect } from "next/navigation";

export default async function Home() {

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

  const authentication = await auth()
  const user = authentication?.user;
  if(!user)
    redirect('/')

  return (
    <ClientPay user={user}></ClientPay>
  )
}
