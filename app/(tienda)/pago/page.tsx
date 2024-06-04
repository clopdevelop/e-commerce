import {
  getAddresByUserLog,
} from "@/lib/data";
import { Address, PaymentMethod,User } from "@prisma/client";
import { redirect } from "next/navigation";
import StripeProvider from "./StripeProvider";
import { getUserLogged } from "@/lib/data";

export default async function Home() {
  const address: Address | null = await getAddresByUserLog();

  const user: User | null = await getUserLogged();
  if (!user) redirect("/");
  
  return (
    <div className="p-6">
      <StripeProvider user={user} address={address}></StripeProvider>
    </div>
  );
}
