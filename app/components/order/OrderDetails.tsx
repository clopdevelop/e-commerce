import {
  CardTitle,
  CardHeader,
  CardContent,
  Card,
} from "@/components/shadcn/card";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/shadcn/table";
import { fetchOrderDetails } from "@/lib/data";
import Image from "next/image";

export async function OrderDetails({ id_order }: { id_order: string }) {
  const orderDetails = await fetchOrderDetails(id_order);
  console.log(orderDetails);

  if (orderDetails !== null) {
    const {
      OrderItem,
      id,
      code,
      order_type,
      total,
      status,
      paid,
      created_at,
      id_user,
      id_delivery_type,
    } = orderDetails;
  }
  const formattedDate = orderDetails?.created_at
    ? orderDetails.created_at.toLocaleDateString()
    : "No date available";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detalles del Pedido</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">
              Fecha del Pedido
            </span>
            <span>{formattedDate}</span>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="max-w-[150px]">Nombre</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Precio / Unidad</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderDetails?.OrderItem.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.product.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.product.price} €</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
