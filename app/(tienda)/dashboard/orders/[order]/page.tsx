import { fetchOrder } from "@/lib/data";

export default async function NamePage({
  params,
}: {
  params: { order: string };
}) {
  const order = await fetchOrder(Number(params.order));

  return (
    <div>
      <h1>ID Pedido: {order?.code}</h1>
      <h1>ID paid: {order?.paid}</h1>
      <h1>ID status: {order?.status}</h1>
      <h1>ID type: {order?.type}</h1>
      <h1>ID id_delivery_type: {order?.id_delivery_type}</h1>
      <h1>ID total: {order?.total}</h1>
      <h1>ID created_at: {order?.created_at.toString()}</h1>
      <div>
      {order?.OrderItem.map((item) => (
        <h1>{item.name} x{item.quantity} ---  {item.unit_price*item.quantity}</h1>
      ))}
      <h1>Total:</h1>
      <span>
                      {order && (
                        order?.OrderItem.reduce((acumulador, item) => {
                          return acumulador + item.unit_price * item.quantity;
                        }, 0) * 1.21
                      ).toFixed(2)}{" "}
                      €
                    </span>
      </div>
    </div>
  );
}
