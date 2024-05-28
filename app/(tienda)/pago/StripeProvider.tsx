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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/shadcn/pagination";
import { Separator } from "@/components/shadcn/separator";
import { useCart } from "@/context/CartProvider";
import { CartItem, Order, ShippingPrices } from "@/lib/definitions";
import { Apple, EuroIcon, Link } from "lucide-react";
import {
  Input,
  Select,
  Label,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  Form,
  RadioGroup,
  RadioGroupItem,
} from "@/components/shadcn";
import UserAddress from "@/components/client/AddressConfig";
import { Checkbox } from "@/components/shadcn/checkbox";
import { useForm } from "react-hook-form";
import { CityAndProvinceSelector } from "@/components/form/data-client/CityAndProvinceSelector";
import { BuyProduct } from "@/lib/payFunctions";
import { loadFromLocalStorage } from "@/lib/localStorage";
import {
  CardElement,
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { addOrder } from "@/lib/actionscommands";


//----------------------------------




import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ClientPay from "@/components/form/data-client/ClientPay";
import CheckoutForm from "@/components/form/pay/checkoutForm";
import { Address, PaymentMethod, User } from "@prisma/client";

interface Props {
  user: User;
  address: Address | null;
  payment: PaymentMethod[] | null;
}
// This is your test publishable API key.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
  { apiVersion: "2024-04-10" }
);

export default function StripeProvider({ user, address, payment }: Props) {
  const [open, setOpen] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [shippingPrice, setShippingPrice] = useState(0);
  const [deliveryType, setDeliveryType] = useState("");
  const form = useForm();

  const productInCart = loadFromLocalStorage();
  const [products, setProducts] = useState<CartItem[]>(productInCart);
  const { items } = useCart();

  useEffect(() => {
    setProducts(products);
  }, [products]);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        {

        items: [{ id: "xl-tshirt", price: 1000 }],
        customer: {
          id: 'clwly2gxm0000hteqnutne391',
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

  console.log(clientSecret);

  return (
    <>
      {open && (
        <Card className="overflow-hidden w-9/12 mx-auto">
          <CardHeader className="flex flex-row items-start bg-muted/50">
            <CardTitle className="text-lg pt-2">Introduce tus datos</CardTitle>
          </CardHeader>
          <CardContent className="p-6 text-sm">
            <Form {...form}>
              <form className="flex gap-5">
                <div className="w-full">
                  <div className="grid gap-4 mb-5">
                    <div className="font-semibold">Información de Envío</div>

                    <Input
                      placeholder={address?.name ?? "C/, Avda, ctra ...."}
                      type="text"
                    />
                    <div className="grid gap-4 md:grid-cols-4">
                      <Input
                        defaultValue={
                          Number(address?.number) ? Number(address?.number) : 2
                        }
                        type="number"
                      />
                      <Input
                        placeholder={address?.letter ?? "Letra"}
                        type="text"
                      />
                      <Input
                        placeholder={address?.staircase ?? "Escalera"}
                        type="number"
                      />
                      <Input
                        placeholder={address?.block ?? "Bloque"}
                        type="number"
                      />
                    </div>
                    <div className="flex gap-4 items-center">
                      <CityAndProvinceSelector />
                      <Input
                        className="w-2/12"
                        placeholder="C. P"
                        type="text"
                      />
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                      <>
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 mb-5">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Guardar la información de envío
                            </FormLabel>
                          </div>
                        </FormItem>
                      </>
                    )}
                  />
                  <div className="grid gap-5 mt-12">
                    <Label htmlFor="shippingMethod">
                      Selecciona tu método de envío:
                    </Label>
                    <Select
                      name="shippingMethod"
                      onValueChange={(value) => {
                        setDeliveryType(value);
                      }}
                      value={deliveryType}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Elige un método" />
                      </SelectTrigger>
                      <SelectContent className="bg-white rounded-md shadow-md">
                        <SelectItem value="standard">
                          Envío Estándar (3-5 días hábiles)
                        </SelectItem>
                        <SelectItem value="express">
                          Envío Exprés (1-2 días hábiles)
                        </SelectItem>
                        <SelectItem value="premium">
                          Envío Premium (Entrega prioritaria)
                        </SelectItem>
                        <SelectItem value="international">
                          Envío Internacional (Tiempo variable)
                        </SelectItem>
                        <SelectItem value="subscribe">
                          Suscripción de Envío (Descuentos exclusivos)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </form>
            </Form>
            <div className="flex justify-end mt-5">
                      <Button
                        onClick={() => setOpen(false)}
                        type="button"
                        size="sm"
                      >
                        Siguiente
                      </Button>
                    </div>
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
