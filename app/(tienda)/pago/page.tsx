import ClientPay from "@/components/form/data-client/ClientPay";
import {
  getAddresByUserLog,
  getPaymentMethodsByUser,
  login,
} from "@/lib/actionscommands";
import { User } from "@/lib/definitions";
import { Address, PaymentMethod } from "@prisma/client";


import { redirect } from "next/navigation";

export default async function Home() {
  const address: Address | null = await getAddresByUserLog();

  const payment: PaymentMethod[] | null = await getPaymentMethodsByUser();

  console.log(payment);


 

  // const authentication = await auth()
  // const user : User | undefined = authentication?.user;
  const user: User | null = await login();
  console.log(user);
  if (!user) redirect("/");

  return (
      <ClientPay user={user} address={address} payment={payment}></ClientPay>
  );
}
