import { fetchOrder } from "@/lib/data";
import { OrderDetails } from "@/components/order/orderDetails";

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  unit_price: number;
}

interface Order {
  code: string;
  paid: boolean;
  status: string;
  type: string;
  id_delivery_type: string;
  total: number;
  created_at: Date;
  OrderItem: OrderItem[];
}

export default async function OrderPage({
  params,
}: {
  params: { order: string };
}) {
  // const order: Order = await fetchOrder(Number(params.order));

  return (
    // <div className="container mx-auto p-6">
    //   <h1 className="text-2xl font-bold mb-4">Detalles del Pedido</h1>
    //   <div className="bg-white shadow-md rounded-lg p-6 mb-6">
    //     <h2 className="text-xl font-semibold">ID Pedido: {order?.code}</h2>
    //     <p>ID Paid: {order?.paid ? "Sí" : "No"}</p>
    //     <p>Status: {order?.status}</p>
    //     <p>Type: {order?.type}</p>
    //     <p>Delivery Type: {order?.id_delivery_type}</p>
    //     <p>Total: {order?.total.toFixed(2)} €</p>
    //     <p>Fecha de Creación: {new Date(order?.created_at).toLocaleDateString()}</p>
    //   </div>

    //   <h2 className="text-xl font-semibold mb-4">Artículos del Pedido</h2>
    //   <div className="bg-white shadow-md rounded-lg p-6">
    //     {order?.OrderItem.map((item) => (
    //       <div key={item.id} className="border-b border-gray-200 pb-4 mb-4">
    //         <h3 className="text-lg">{item.name} x{item.quantity}</h3>
    //         <p>Precio Unitario: {item.unit_price.toFixed(2)} €</p>
    //         <p>Subtotal: {(item.unit_price * item.quantity).toFixed(2)} €</p>
    //       </div>
    //     ))}
    //     <div className="mt-6 text-right">
    //       <h3 className="text-xl font-bold">
    //         Total con IVA (21%):{" "}
    //         {(
    //           order?.OrderItem.reduce((acumulador, item) => {
    //             return acumulador + item.unit_price * item.quantity;
    //           }, 0) * 1.21
    //         ).toFixed(2)}{" "}
    //         €
    //       </h3>
    //     </div>
    //   </div>
    // </div>
    <OrderDetails></OrderDetails>
  );
}
