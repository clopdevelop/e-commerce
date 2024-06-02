import { fetchTotalPriceOrder } from "@/lib/data";
import { Separator } from "../shadcn";
import { Card, CardHeader, CardTitle, CardContent } from "../shadcn";

export async function Total({id_order}:{id_order:string}) {
  const totalPrice = await fetchTotalPriceOrder(id_order)

  return (
    <Card>
    <CardHeader>
      <CardTitle>Total</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span>{totalPrice.total} €</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Envío</span>
          <span>€</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Impuestos</span>
          <span>€</span>
        </div>
        <Separator />
        <div className="flex items-center justify-between font-medium">
          <span>Total</span>
          <span>{totalPrice.total} €</span>
        </div>
      </div>
    </CardContent>
  </Card>
  );
}
