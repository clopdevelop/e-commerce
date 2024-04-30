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
import { CartItem, User } from "@/lib/definitions";
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

interface Props {
  user: any;
}
export default function ClientPay({ user }: Props) {
  const [open, setOpen] = useState(true);

  const [products, setProducts] = useState<CartItem[]>();
  // todo Recuperar los productos en el servidor , quizás almacenando el carrito en las cookies
  const { items } = useCart();
  useEffect(() => {
    setProducts(products);
  }, [products]);

  const form = useForm();

  return (
    <div className="mt-5">
      {open && (
        <Card className="overflow-hidden w-9/12 mx-auto">
          <CardHeader className="flex flex-row items-start bg-muted/50">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center gap-2 text-lg">
                Order Oe31b70H
                <Button
                  size="icon"
                  variant="outline"
                  className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Copy className="h-3 w-3" />
                  <span className="sr-only">Copy Order ID</span>
                </Button>
              </CardTitle>
              <CardDescription>Date: November 23, 2023</CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-1">
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
            </div>
          </CardHeader>
          <CardContent className="p-6 text-sm">
            <Form {...form}>
              <form className="flex gap-5">
                <div className="w-full">
                  <div className="grid gap-4 mb-5">
                    <div className="font-semibold">Información de Envío</div>
                    <Input placeholder="Calle" type="text" />
                    <div className="grid gap-4 md:grid-cols-4">
                      <Input placeholder="Número" type="number" />
                      <Input placeholder="Bloque" type="number" />
                      <Input placeholder="Escalera" type="number" />
                      <Input placeholder="Letra" type="text" />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input placeholder="Provincia" type="text" />
                      <Input placeholder="Ciudad" type="text" />
                    </div>
                    <Input placeholder="Postal code" type="text" />
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
                    <Label htmlFor="shippingMethod">Método de Envío:</Label>
                    <Select name="shippingMethod">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Vacío" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Envío Estándar</SelectItem>
                        <SelectItem value="dark">Envío Exprés</SelectItem>
                        <SelectItem value="system">Otro Método</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {/* <Separator className="my-4" /> */}
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
                      placeholder="Ingrese el nombre del titular de la tarjeta"
                      className="input"
                      required
                    />
                    <Label htmlFor="cardNumber">Número de Tarjeta:</Label>
                    <Input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="Ingrese el número de la tarjeta"
                      className="input"
                      required
                      min="16"
                      max="16"
                    />
                    <div className="grid grid-cols-3 gap-4 mt-2">
                      <Select>
                        <SelectTrigger id="month">
                          <SelectValue placeholder="Month" />
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
                          <SelectValue placeholder="Year" />
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
                    </div>
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
                  <span className="sr-only">Previous Order</span>
                </Button>
                {/* // todo añadir id o código del pedido */}
                CÓDIGO: Oe31b70H
                <Button
                  size="icon"
                  variant="outline"
                  className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Copy className="h-3 w-3" />
                  <span className="sr-only">Copy Order ID</span>
                </Button>
              </CardTitle>
              {/* //todo agregar fecha */}
              <CardDescription>Date: </CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-1">
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
            </div>
          </CardHeader>
          <CardContent className="p-6 text-sm flex gap-10">
            <div className="w-full">
              <div className="grid gap-3">
                <div className="font-semibold">Detalles del Pedido</div>
                <ul className="grid gap-3">
                  {items?.map((item) => (
                    <li key={item.id} className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        {item.name} x <span>{item.quantity}</span>
                      </span>
                      <span>${item.unit_price * item.quantity}</span>
                    </li>
                  ))}
                </ul>
                <Separator className="my-2" />
                <ul className="grid gap-3">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>
                      $
                      {items.reduce((acumulador, item) => {
                        return acumulador + item.unit_price * item.quantity;
                      }, 0)}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Envío</span>
                    {/* //todo añadir precio segun el tipo de envio */}
                    <span>$5.00</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Impuestos</span>
                    <span>
                      $
                      {items.reduce((acumulador, item) => {
                        return acumulador + item.unit_price * item.quantity;
                      }, 0) * 0.21}
                    </span>
                  </li>
                  <li className="flex items-center justify-between font-semibold">
                    <span className="text-muted-foreground">Total</span>
                    <span>
                      $
                      {items.reduce((acumulador, item) => {
                        return acumulador + item.unit_price * item.quantity;
                      }, 0) * 1.21}
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
                  {/* todo Recuperar y mostra informacion de envío */}
                  <address className="grid gap-0.5 not-italic text-muted-foreground">
                    <span>Liam Johnson</span>
                    <span>{user?.address}a</span>
                    <span>1234 Main St.</span>
                    <span>Anytown, CA 12345</span>
                  </address>
                </div>
              </div>
                <Separator className="my-4"/>
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
                      <a href="tel:">+1 {user?.phone}</a>
                    </dd>
                  </div>
                </dl>
              </div>
              <Separator className="my-4" />
              <div className="grid gap-3">
                <div className="font-semibold">Información de pago</div>
                <dl className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-1 text-muted-foreground">
                      <CreditCard className="h-4 w-4" />
                      {/* todo Añadir información de pago */}
                      Visa
                    </dt>
                    <dd>**** **** **** 4532</dd>
                  </div>
                </dl>
              </div>
              <div className="flex justify-end mt-8">
                {/* Integrar stripe para pagar directamente desde la página */}
                <Button type="submit" size="sm">
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
