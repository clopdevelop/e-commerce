import { columns } from "./columns"
import { auth } from "@/auth";
import { DataTable } from "./data-table"
import { fetchOrdersByUserId, fetchInvoicesByUserId, getUserLogged } from "@/lib/data";
import OrderTable from "@/components/ui/OrderTable";
import { Order, OrderItem } from ".prisma/client";


async function getData() {

  const authentication = await getUserLogged()
  const user_id = authentication?.id;
  const orders = await fetchOrdersByUserId(user_id);
  
  return orders;
}


export default async function DemoPage() {
  const data = await getData()
 
  console.log(data)
  return (
    <div className="container mx-auto">
        {data && <DataTable columns={columns} data={data} />}
    </div>
  )
}
