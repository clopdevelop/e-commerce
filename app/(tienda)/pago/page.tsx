import { PayPage } from "./orderdetail";
import {
  getAddresByUserLog,
} from "@/lib/data";
import { Address,User } from "@prisma/client";
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
  const addresses = await getAddresByUserLog();

  const user: User | null = await getUserLogged();
  if (!user) redirect("/");
console.log(addresses)
  return (
    <PayPage user={user} addresses={addresses}></PayPage>
  );
}