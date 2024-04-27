import { auth } from "@/auth"
import ClientPay from "@/components/utils/ClientPayComponent";

import { redirect } from "next/navigation";

export default async function Home() {

  const authentication = await auth()
  const user = authentication?.user;
  if(!user)
    redirect('/')

  return (
    <ClientPay user={user}></ClientPay>
  )
}
