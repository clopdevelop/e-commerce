import { PayPage } from "./orderdetail";
import {
  getAddresByUserLog,
} from "@/lib/data";
import { Address, PaymentMethod,User } from "@prisma/client";
import { redirect } from "next/navigation";
import { getUserLogged } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { AddressForm } from "@/components/form/data-client/AddressForm";

export default async function NamePage() {
  const address: Address | null = await getAddresByUserLog();

  const user: User | null = await getUserLogged();
  if (!user) redirect("/");
console.log(address)
  return (
    <PayPage user={user} address={address}></PayPage>
  );
}