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
import { useEffect, useState } from "react";
import { CartItem, Order, ShippingPrices, User } from "@/lib/definitions";
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
import { Address, PaymentMethod } from "@prisma/client";
import { BuyProduct } from "@/lib/payFunctions";
import { loadFromLocalStorage } from "@/lib/localStorage";
import {
  CardElement,
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

interface Props {
  user: User;
  address: Address | null;
  payment: PaymentMethod[] | null;
  // user: any;
  // address: any;
  // payment: any;
}

export default function ClientPay({ user, address, payment }: Props) {
  //Recu
  const order: Order = {
    id: 0,
    total: 0,
    status: "",
    paid: false,
    discount: 0,
    created_at: new Date(),
    id_user: 0,
  };
  // console.log(user)
  // console.log(address)
  // console.log(payment)

  const [open, setOpen] = useState(true);

  const productInCart = loadFromLocalStorage();

  const [products, setProducts] = useState<CartItem[]>(productInCart);

  const { items } = useCart();
  useEffect(() => {
    setProducts(products);
  }, [products]);

  const product = products ? products[0] : "";

  const [deliveryType, setDeliveryType] = useState("");
  const [shippingPrice, setShippingPrice] = useState(0);

  useEffect(() => {
    const shippingPrices: ShippingPrices = {
      standard: 5, // Precio del envío estándar
      express: 10, // Precio del envío exprés
      premium: 15, // Precio del envío premium
      international: 20, // Precio del envío internacional
      subscribe: 0, // Envío gratuito para la suscripción de envío
    };

    // Actualizar el precio del envío cuando cambie el método de envío seleccionado
    if (deliveryType && deliveryType in shippingPrices) {
      setShippingPrice(shippingPrices[deliveryType as keyof ShippingPrices]);
    } else {
      setShippingPrice(0); // Reiniciar el precio del envío si no se selecciona un método válido
    }
  }, [deliveryType]);

  const form = useForm();

  const stripe = useStripe();
  const elements = useElements();

  return (
    <div className="mt-5">
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
                    <AddressElement
                      options={{
                        mode:"shipping",
                      }}
                    ></AddressElement>
                    <PaymentElement></PaymentElement>
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
                <div className="w-full">
                  <div className="grid gap-4">
                    <Label htmlFor="invoicingMethod">Método de Pago:</Label>
                    <RadioGroup
                      defaultValue="card"
                      className="grid grid-cols-3 gap-4 my-2"
                    >
                      <div>
                        <RadioGroupItem
                          value="card"
                          id="card"
                          className="peer sr-only"
                          checked={
                            payment && payment[0].name == "Tarjeta de crédito"
                              ? true
                              : false
                          }
                        />
                        <Label
                          htmlFor="card"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <CreditCard className="mb-3"></CreditCard>
                          Card
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem
                          value="paypal"
                          id="paypal"
                          className="peer sr-only"
                          checked={
                            payment && payment[0].name == "PayPal"
                              ? true
                              : false
                          }
                        />
                        <Label
                          htmlFor="paypal"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <EuroIcon className="mb-3 h-6 w-6" />
                          Paypal
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem
                          value="apple"
                          id="apple"
                          className="peer sr-only"
                          checked={
                            payment && payment[0].name == "Apple" ? true : false
                          }
                        />
                        <Label
                          htmlFor="apple"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <Apple className="mb-3 h-6 w-6" />
                          Apple
                        </Label>
                      </div>
                    </RadioGroup>
                    <Label htmlFor="cardHolderName">
                      Nombre del Titular de la Tarjeta:
                    </Label>
                    <Input
                      type="text"
                      id="cardHolderName"
                      name="cardHolderName"
                      placeholder={
                        payment
                          ? payment[0]?.cardHolderName
                          : "Ingrese el nombre del titular de la tarjeta"
                      }
                      className="input"
                      required
                    />
                    <Label htmlFor="cardNumber">Número de Tarjeta:</Label>
                    <CardElement></CardElement>
                    {/* <Input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      placeholder={
                        payment
                          ? payment[0]?.cardNumber
                          : "Ingrese el número de la tarjetaIngrese el número de la tarjeta"
                      }
                      className="input"
                      required
                      min="16"
                      max="16"
                    />
                    <div className="grid grid-cols-3 gap-4 mt-2">
                      <Select>
                        <SelectTrigger id="month">
                          <SelectValue
                            placeholder={
                              payment ? payment[0]?.expirationMonth : "Mes"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">January</SelectItem>
                          <SelectItem value="2">February</SelectItem>
                          <SelectItem value="3">March</SelectItem>
                          <SelectItem value="4">April</SelectItem>
                          <SelectItem value="5">May</SelectItem>
                          <SelectItem value="6">June</SelectItem>
                          <SelectItem value="7">July</SelectItem>
                          <SelectItem value="8">August</SelectItem>
                          <SelectItem value="9">September</SelectItem>
                          <SelectItem value="10">October</SelectItem>
                          <SelectItem value="11">November</SelectItem>
                          <SelectItem value="12">December</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger id="year">
                          <SelectValue
                            placeholder={
                              payment ? payment[0]?.expirationMonth : "Año"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 10 }, (_, i) => (
                            <SelectItem
                              key={i}
                              value={`${new Date().getFullYear() + i}`}
                            >
                              {new Date().getFullYear() + i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input id="cvc" placeholder="CVC" />
                    </div> */}
                    <FormField
                      control={form.control}
                      name="mobile"
                      render={({ field }) => (
                        <>
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                Guardar información de Facturación
                              </FormLabel>
                            </div>
                          </FormItem>
                        </>
                      )}
                    />
                  </div>
                  <div className="flex justify-end mt-5">
                    <Button
                      onClick={() => setOpen(false)}
                      type="button"
                      size="sm"
                    >
                      Siguiente
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
            <div className="text-xs text-muted-foreground">1/2</div>
          </CardFooter>
        </Card>
      )}
      {!open && (
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
                    <span>
                      <strong>Nombre:</strong> {user?.name}
                    </span>
                    <span>
                      <strong>Dirección:</strong> {address?.name}{" "}
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
                    </span>
                    <span>
                      <strong>Código Postal:</strong>
                      {/* todo {address?.postcode} */}
                    </span>
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
                  {payment && (
                    <>
                      {payment[0].name === "Tarjeta de crédito" && (
                        <div className="flex items-center justify-between">
                          <dt className="flex items-center gap-2 text-muted-foreground">
                            <CreditCard className="h-4 w-4" />
                            Visa
                          </dt>
                          <dd>
                            {`**** **** **** ${payment[0].cardNumber.substring(
                              payment[0].cardNumber.length - 4
                            )}`}
                          </dd>
                        </div>
                      )}

                      {payment[0].name === "PayPal" && (
                        <div className="flex items-center justify-between">
                          <dt className="flex items-center gap-2 text-muted-foreground">
                            <EuroIcon className="h-4 w-4" />
                            PayPal
                          </dt>
                          <dd>**** **** **** {payment[0].cardNumber}</dd>
                        </div>
                      )}

                      {payment[0].name === "Apple" && (
                        <div className="flex items-center justify-between">
                          <dt className="flex items-center gap-2 text-muted-foreground">
                            <Apple className="h-4 w-4" />
                            Apple
                          </dt>
                          <dd>**** **** **** {payment[0].cardNumber}</dd>
                        </div>
                      )}
                    </>
                  )}
                </dl>
              </div>
              <div className="flex justify-end mt-8">
                {/* todo Integrar stripe para pagar directamente desde la página */}
                <Button
                  type="submit"
                  onClick={async () => {
                    console.log(products);
                    console.log(user.id);
                    if (stripe && elements) {
                      const cardElement = elements.getElement(CardElement);
                      if (cardElement) {
                        const { error, paymentMethod } =
                          await stripe.createPaymentMethod({
                            type: "card",
                            card: cardElement,
                          });
                        console.log(paymentMethod);
                        if (error) {
                          console.log("[error]", error);
                        } else {
                          console.log("[PaymentMethod]", paymentMethod);
                        }
                      } else {
                        console.log("CardElement no está disponible");
                      }
                    } else {
                      console.log("Stripe o Elements es null");
                    }
                  }}
                  size="sm"
                >
                  Hacer Pedido
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
            <div className="text-xs text-muted-foreground">2/2</div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
// const { id } = paymentMethod;
// const response = await fetch("/api/charge", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({ id, amount: 1000 }),})
// })
//   if(products && user.id)
//   BuyProduct(Number(user.id),products[0])

{
  /* <div className="ml-auto flex items-center gap-1">
              <Button size="sm" variant="outline" className="h-8 gap-1">
                <Truck className="h-3.5 w-3.5" />
                <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                  Track Order
                </span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="outline" className="h-8 w-8">
                    <MoreVertical className="h-3.5 w-3.5" />
                    <span className="sr-only">More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Export</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Trash</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div> */
}
