"use client";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  MoreVertical,
  Truck,
} from "lucide-react";
import { Button } from "@/components/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { Separator } from "@/components/shadcn/separator";
import { useCart } from "@/context/CartProvider";
import { CartItem, Order, ShippingPrices } from "@/lib/definitions";
import {
  Input,
} from "@/components/shadcn";
import { useForm } from "react-hook-form";
import { loadFromLocalStorage } from "@/lib/localStorage";


//----------------------------------

import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/form/pay/checkoutForm";
import { Address, User } from "@prisma/client";

import { AddressForm } from "@/components/form/data-client/AddressForm";

interface Props {
  user: User;
  address: Address | null;
}
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
  { apiVersion: "2024-04-10" }
);

export default function StripeProvider({ user, address }: Props) {
  const [open, setOpen] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [shippingPrice, setShippingPrice] = useState(0);


  const productInCart = loadFromLocalStorage();
  const [products, setProducts] = useState<CartItem[]>(productInCart);
  const { items, updateItemQuantity } = useCart();
  useEffect(() => {
    setProducts(products);
  }, [products]);


  useEffect(() => {
    fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [{ id: "xl-tshirt", price: 1000 }],
        customer: {
          id: "clwly2gxm0000hteqnutne391",
          name: "Usuario",
          email: "usuario@gmail.com",
          address: {
            line1: "123 Main St",
            line2: "",
            city: "Anytown",
            state: "CA",
            postal_code: "12345",
            country: "US",
          },
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  type ThemeType = "stripe" | "night" | "flat" | undefined;
  interface Appearance {
    theme: ThemeType;
  }
  const appearance: Appearance = {
    theme: "stripe",
  };
  const options = {
    layout: {
      type: "",
      defaultCollapsed: false,
      business: "Tu Tienda",
    },
    clientSecret,
    appearance,
  };

  const handleFormSubmit = (values: any) => {
    console.log(values);
    setOpen(false); 
  };

  return (
    <>
      {open && (
        <Card className="overflow-hidden w-9/12 mx-auto">
          <CardHeader className="flex flex-row items-start bg-muted/50">
            <CardTitle className="text-lg pt-2">Introduce tus datos</CardTitle>
          </CardHeader>
          <CardContent className="p-6 text-sm">
            <AddressForm onSubmitForm={handleFormSubmit} ></AddressForm>
          </CardContent>
          <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
            <div className="text-xs text-muted-foreground">1/2</div>
          </CardFooter>
        </Card>
      )}
      {!open && clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <Card className="overflow-hidden w-9/12 mx-auto">
            <CardHeader className="flex flex-row items-start bg-muted/50">
              <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-2 text-lg">
                  <Button
                    onClick={() => setOpen(true)}
                    size="icon"
                    variant="outline"
                    className="h-6 w-6 mr-3 my-3"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Volver</span>
                  </Button>
                  Resumen del Pedido
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 text-sm flex gap-10">
              <div className="w-full">
                <div className="grid gap-3">
                  <div className="font-semibold">Detalles del Pedido</div>
                  <ul className="grid gap-3">
                    {items?.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center justify-between"
                      >
                        <span className="text-muted-foreground">
                          {item.name} x <span>{item.quantity}</span>
                        </span>
                        <span>{item.unit_price * item.quantity} €</span>
                        <Input
                          className="w-16"
                          defaultValue={item.quantity}
                          onChange={(e)=>updateItemQuantity(item.id,Number(e.target.value))}
                          type="number"
                          min={1}
                          max={99}
                        />
                      </li>
                    ))}
                  </ul>
                  <Separator className="my-2" />
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>
                        {items.reduce((acumulador, item) => {
                          return acumulador + item.unit_price * item.quantity;
                        }, 0)}{" "}
                        €
                      </span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Envío</span>
                      <span>{shippingPrice} €</span>
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
                <Separator className="my-4" />
              </div>
              <div className="w-full">
                <div className="flex flex-col gap-4">
                  <div className="grid gap-3">
                    <div className="font-semibold">Información de envío</div>
                    <address className="grid gap-0.5 not-italic text-muted-foreground">
                      <div className="flex justify-between">
                        <strong>Nombre:</strong> {user?.name}
                      </div>
                      <div className="flex">
                        <strong>Dirección:</strong> {address?.name}
                        {address?.number}
                        {address?.letter && (
                          <span> letra: {address?.letter}</span>
                        )}
                        {address?.staircase && (
                          <span>, escalera: {address?.staircase}</span>
                        )}
                        {address?.block && (
                          <span>, bloque: {address?.block}</span>
                        )}
                      </div>
                      <div className="flex justify-between">
                        <strong>Código Postal:</strong>
                        {/* todo {address?.postcode} */}
                      </div>
                    </address>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">Información del cliente</div>
                  <dl className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Cliente</dt>
                      <dd>{user.name}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">
                        Correo electrónico
                      </dt>
                      <dd>
                        <a href="mailto:">{user.email}</a>
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Teléfono</dt>
                      <dd>
                        <a href="tel:">
                          +1
                          {/* todo {user?.phone} */}
                        </a>
                      </dd>
                    </div>
                  </dl>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">Información de pago</div>
                  <dl className="grid gap-3">
                    <CheckoutForm></CheckoutForm>
                  </dl>
                </div>
                <div className="flex justify-end mt-8">
                  {/*      <Button
                    type="submit"
                    onClick={async () => {
                      console.log(products);
                      console.log(user.id);
                      const order = await addOrder(products);
                      console.log(order);
                      // Añadir función Stripe
                    }}
                    size="sm"
                  >
                    Hacer Pedido
                  </Button> */}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
              <div className="text-xs text-muted-foreground">2/2</div>
            </CardFooter>
          </Card>
        </Elements>
      )}
    </>
  );
}
