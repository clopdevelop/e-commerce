"use client";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Separator,
} from "@/components/shadcn";
import { useCart } from "@/context/CartProvider";
import { CartItem } from "@/lib/definitions";
import { loadFromLocalStorage } from "@/lib/localStorage";
import { Address, User } from "@prisma/client";
import { ChevronLeft, XCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AddressForm } from "@/components/form/data-client/AddressForm";

interface Props {
  user: User;
  address?: Address | null;
}

export function PayPage({ user, address }: Props) {
  const [shippingPrice, setShippingPrice] = useState(0);

  const productInCart = loadFromLocalStorage();
  const [products, setProducts] = useState<CartItem[]>(productInCart);
  const { items, updateItemQuantity, removeItem } = useCart();
  useEffect(() => {
    setProducts(products);
  }, [products]);

  const handleFormSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Card className="overflow-hidden w-9/12 mx-auto">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Resumen del Pedido
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm flex gap-10">
        <div className="w-full">
          <AddressForm
            onSubmitForm={handleFormSubmit}
            address={address}
          ></AddressForm>
          <Separator className="my-2 mb-6" />
          <div className="grid gap-3">
            <div className="font-semibold">Detalles del Pedido</div>
            <ul className="grid gap-3">
              {items?.map((item) => (
                <li key={item.id} className="flex items-center justify-between">
                  <span className="text-muted-foreground w-2/4">
                    {item.name} x <span>{item.quantity}</span>
                  </span>
                  <span>{(item.unit_price * item.quantity).toFixed(2)} €</span>
                  <Input
                    className="w-14"
                    defaultValue={item.quantity}
                    onChange={(e) =>
                      updateItemQuantity(item.id, Number(e.target.value))
                    }
                    type="number"
                    min={1}
                    max={99}
                  />
                  {removeItem && (
                    <XCircleIcon
                      className="cursor-pointer"
                      onClick={() => removeItem(item.id)}
                    ></XCircleIcon>
                  )}
                </li>
              ))}
            </ul>
            <Separator className="my-4" />
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>
                  {items
                    .reduce(
                      (
                        acumulador: number,
                        item: { unit_price: number; quantity: number }
                      ) => {
                        return acumulador + item.unit_price * item.quantity;
                      },
                      0
                    )
                    .toFixed(2)}{" "}
                  €
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Envío</span>
                <span>{shippingPrice.toFixed(2)} €</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Impuestos</span>
                <span>
                  {(
                    items.reduce((acumulador, item) => {
                      return acumulador + item.unit_price * item.quantity;
                    }, 0) * 0.21
                  ).toFixed(2)}{" "}
                  €
                </span>
              </li>
              <li className="flex items-center justify-between font-semibold">
                <span className="text-muted-foreground">Total</span>
                <span>
                  {(
                    items.reduce((acumulador, item) => {
                      return acumulador + item.unit_price * item.quantity;
                    }, 0) * 1.21
                  ).toFixed(2)}{" "}
                  €
                </span>
              </li>
            </ul>
          </div>
          <Separator className="my-6" />
          <div className="flex justify-end">
          <Link href={"/pago/stripePay"}>
          <Button>Ve a pagar</Button></Link>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">1/2</div>
      </CardFooter>
    </Card>
  );
}

// <div className="w-full">
// <div className="flex flex-col gap-4">
//   <div className="grid gap-3">
//     <div className="font-semibold">Información de envío</div>
//     <address className="grid gap-0.5 not-italic text-muted-foreground">
//       <div className="flex justify-between">
//         <strong>Nombre:</strong> {user?.name}
//       </div>
//       <div className="flex">
//         <strong>Dirección:</strong> {address?.name}
//         {address?.number}
//         {address?.letter && <span> letra: {address?.letter}</span>}
//         {address?.staircase && (
//           <span>, escalera: {address?.staircase}</span>
//         )}
//         {address?.block && <span>, bloque: {address?.block}</span>}
//       </div>
//       <div className="flex justify-between">
//         <strong>Código Postal:</strong>
//         {/* todo {address?.postcode} */}
//       </div>
//     </address>
//   </div>
// </div>
// <Separator className="my-4" />
// <div className="grid gap-3">
//   <div className="font-semibold">Información del cliente</div>
//   <dl className="grid gap-3">
//     <div className="flex items-center justify-between">
//       <dt className="text-muted-foreground">Cliente</dt>
//       <dd>{user.name}</dd>
//     </div>
//     <div className="flex items-center justify-between">
//       <dt className="text-muted-foreground">Correo electrónico</dt>
//       <dd>
//         <a href="mailto:">{user.email}</a>
//       </dd>
//     </div>
//     <div className="flex items-center justify-between">
//       <dt className="text-muted-foreground">Teléfono</dt>
//       <dd>
//         <a href="tel:">
//           123456789
//           {/* todo {user?.phone} */}
//         </a>
//       </dd>
//     </div>
//   </dl>
// </div>
// <Separator className="my-4" />
// <div className="grid gap-3">
//   <div className="font-semibold">Información de pago</div>
//   <dl className="grid gap-3">
//    <Link href='/pago/stripePay'>CLICK AQUI</Link>
//   </dl>
// </div>
// <div className="flex justify-end mt-8"></div>
// </div>
