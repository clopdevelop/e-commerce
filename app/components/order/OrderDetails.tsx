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
      type,
      total,
      status,
      paid,
      discount,
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
                <TableHead className="w-[80px] hidden md:table-cell">
                  Imagen
                </TableHead>
                <TableHead className="max-w-[150px]">Nombre</TableHead>
                <TableHead>Talla</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Precio / Unidad</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderDetails?.OrderItem.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="hidden md:table-cell">
                    <Image
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src="/placeholder.svg"
                      width="64"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.unit_price} €</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
