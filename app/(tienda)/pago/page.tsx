import {
  getAddresByUserLog,
  getPaymentMethodsByUser,
} from "@/lib/actionscommands";
import { Address, PaymentMethod,User } from "@prisma/client";

import { redirect } from "next/navigation";
import StripeProvider from "./StripeProvider";
import { getUserLogged } from "@/lib/data";

export default async function Home() {
  const address: Address | null = await getAddresByUserLog();

  const payment: PaymentMethod[] | null = await getPaymentMethodsByUser();

  const user: User | null = await getUserLogged();
  if (!user) redirect("/");
  
  return (
      <StripeProvider user={user} address={address} payment={payment}></StripeProvider>
  );
}
