import { fetchShippingAddressOrder } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "../shadcn";

export async function ShippingAddressCard({id_order}:{id_order:string}) {
  const shippingAddressOrder = await fetchShippingAddressOrder(id_order)
  return (
    <Card>
    <CardHeader>
      <CardTitle>Shipping Address</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid gap-1">
        <div>Sophia Anderson</div>
        <div>1234 Main St.</div>
        <div>Anytown, CA 12345</div>
      </div>
    </CardContent>
  </Card>
  );
}