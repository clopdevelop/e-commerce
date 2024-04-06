import { Order, Invoice } from "@/lib/definitions"
import { columns } from "./columns"
import { auth, getUser } from "@/auth";

import { DataTable } from "./data-table"
import { fetchOrdersByUserId, fetchInvoicesByUserId } from "@/lib/data";

import {UserOrder} from '@/lib/definitions'

async function getData(): Promise<UserOrder[]> {

  // todo abstraer esta lógica para obtener el usuario logueado
  const authentication = await auth();
  const user = String(authentication?.user?.email);
  const completeUser = await getUser(user);
  
  const id = completeUser.id_user ?? 0;
  let orders = await fetchOrdersByUserId(id);
  const invoices = await fetchInvoicesByUserId(id);
  
    let updatedOrders = orders.map(order => {
      // Encuentra la factura correspondiente al pedido actual por id_order
      const invoice = invoices.find(invoice => invoice.id_order === order.id_order);
      
      return {
        ...order,
    // añadir la propiedad `amount` a cada objeto del array
        amount: invoice ? invoice.amount : undefined, 
      };
    });
  
    return updatedOrders;
}


export default async function DemoPage() {
  let data = await getData()
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
