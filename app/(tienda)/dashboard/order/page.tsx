import { Order, Invoice } from "@/lib/definitions"
import { columns } from "./columns"
import { auth, getUser } from "@/auth";

import { DataTable } from "./data-table"
import { fetchOrdersByUserId, fetchInvoicesByUserId } from "@/lib/data";
import OrderTable from "@/components/ui/OrderTable";


async function getData(): Promise<Order[]> {

  // todo abstraer esta lógica para obtener el usuario logueado
  const authentication = await auth()
  const user_email = authentication?.user?.email || '';
  const completeUser = await getUser(user_email);
  const user_id = Number(completeUser?.id);

  const orders = await fetchOrdersByUserId(user_id);
  console.log(orders);
  
  return orders;
}


export default async function DemoPage() {
  const data = await getData()
  return (
    <div className="container mx-auto py-10">
      {/* <DataTable columns={columns} data={data} /> */}
      <OrderTable></OrderTable>
    </div>
  )
}
