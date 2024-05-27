import { columns } from "./columns"
import { auth } from "@/auth";
import { DataTable } from "./data-table"
import { fetchOrdersByUserId, fetchInvoicesByUserId } from "@/lib/data";
import OrderTable from "@/components/ui/OrderTable";
import { Order, OrderItem } from ".prisma/client";


async function getData() {

  const authentication = await auth()
  const user_id = Number(authentication?.user?.id);
  console.log(user_id)
  const orders = await fetchOrdersByUserId(user_id);
  
  return orders;
}


export default async function DemoPage() {
  const data = await getData()
  console.log(data)
  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={data} />
      {/* <OrderTable></OrderTable> */}
    </div>
  )
}
