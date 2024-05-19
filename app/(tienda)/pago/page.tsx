import {
  getAddresByUserLog,
  getPaymentMethodsByUser,
  login,
} from "@/lib/actionscommands";
import { Address, PaymentMethod,User } from "@prisma/client";

import { redirect } from "next/navigation";
import StripeProvider from "./StripeProvider";

export default async function Home() {
  const address: Address | null = await getAddresByUserLog();

  const payment: PaymentMethod[] | null = await getPaymentMethodsByUser();

  const user: User | null = await login();
  if (!user) redirect("/");
  
  
  console.log(payment);
  console.log(address);
  console.log(user);

  return (
      <StripeProvider user={user} address={address} payment={payment}></StripeProvider>
  );
}
