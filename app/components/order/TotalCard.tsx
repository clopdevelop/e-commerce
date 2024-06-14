import { fetchTotalPriceOrder } from "@/lib/data";
import { Separator } from "../shadcn";
import { Card, CardHeader, CardTitle, CardContent } from "../shadcn";

export async function Total({id_order}:{id_order:string}) {
  const Price = await fetchTotalPriceOrder(id_order)
  const totalPrice = Price.total/100
  return (
    <Card>
    <CardHeader>
      <CardTitle>Total</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span>{(totalPrice * 0.79).toFixed(2)} €</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Impuestos</span>
          <span>{(totalPrice*0.21).toFixed(2)}€</span>
        </div>
        <Separator />
        <div className="flex items-center justify-between font-medium">
          <span>Total</span>
          <span>{(totalPrice).toFixed(2)} €</span>
        </div>
      </div>
    </CardContent>
  </Card>
  );
}
