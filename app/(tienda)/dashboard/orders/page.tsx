import { columns } from "./columns"
import { DataTable } from "./data-table"
import { fetchOrdersByUserId, getUserLogged } from "@/lib/data";

async function getData() {

  const authentication = await getUserLogged()
  const user_id = authentication?.id;
  const orders = await fetchOrdersByUserId(user_id);
  
  return orders;
}


export default async function DemoPage() {
  const data = await getData()
 
  return (
    <div className="container mx-auto">
        {data && <DataTable columns={columns} data={data} />}
    </div>
  )
}
