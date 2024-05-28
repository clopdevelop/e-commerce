import { columns } from "./columns"
import { auth } from "@/auth";
import { DataTable } from "./data-table"
import { fetchOrdersByUserId, fetchInvoicesByUserId, login } from "@/lib/data";
import OrderTable from "@/components/ui/OrderTable";
import { Order, OrderItem } from ".prisma/client";


async function getData() {

  const authentication = await login()
  const user_id = authentication?.id;
  const orders = await fetchOrdersByUserId(user_id);
  
  return orders;
}


export default async function DemoPage() {
  const data = await getData()
  return (
    <div className="container mx-auto">
      
        {data && <DataTable columns={columns} data={data} />}
      {/* <OrderTable></OrderTable> */}
    </div>
  )
}
