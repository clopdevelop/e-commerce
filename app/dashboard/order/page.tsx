import { Order, Invoice } from "@/lib/definitions"
import { columns } from "./columns"

import { DataTable } from "./data-table"
import { fetchOrdersByUserId, fetchInvoicesByUserId } from "@/lib/data";

async function getData(): Promise<Order[]> {
  
  let orders = await fetchOrdersByUserId(2);
  const invoices = await fetchInvoicesByUserId(2);
  
    // Asumiendo que quieres añadir la propiedad `amount` a cada objeto del array
    let updatedOrders = orders.map(order => {
      // Encuentra la factura correspondiente al pedido actual por id_order
      const invoice = invoices.find(invoice => invoice.id_order === order.id_order);
  
      return {
        ...order, // Copia todas las propiedades existentes del objeto
        amount: invoice ? invoice.amount : undefined, // Añade o modifica la propiedad `amount` con el valor encontrado, o undefined si no hay factura correspondiente
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
