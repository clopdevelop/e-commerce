"use client";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
} from "@/components/shadcn";
import { useCart } from "@/context/CartProvider";
import { CartItem } from "@/lib/definitions";
import { Address, User } from "@prisma/client";
import { ChevronLeft, XCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AddressForm } from "@/components/form/data-client/AddressForm";
import { DisplayAddress } from "@/components/form/data-client/DisplayAddress";

interface Props {
  user: User;
  addresses?: any;
}

export function PayPage({ user, addresses }: Props) {
  const [shippingPrice, setShippingPrice] = useState(0);

  const { items, updateItemQuantity, removeItem } = useCart();

  const [isLinkActive, setIsLinkActive] = useState(addresses ? true : false);

  const handleFormSubmit = (values: any) => {
    console.log(values);
    setIsLinkActive(true);
  };

  const handleDeliveryType = (newData: string) => {
    if (newData == "STANDAR") setShippingPrice(1);

    if (newData == "EXPRESS") setShippingPrice(4);

    if (newData == "PREMIUM") setShippingPrice(10);
  };

  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [selectValue, setSelectValue] = useState("");

  const handleAddressChange = (value) => {
    setSelectedAddressId(value);
    setSelectValue(value);
    value === "-1" ? setIsLinkActive(false) : setIsLinkActive(true);
  };

  console.log(addresses);

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
          <Select value={selectValue} onValueChange={handleAddressChange}>
            <SelectTrigger className="my-5 w-auto" aria-placeholder="">
              <SelectValue placeholder="Direcciones Guardadas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="-1">
                <div className="max-w-200">Nueva Direción</div>
              </SelectItem>
              {addresses &&
                addresses.map((address, i) => (
                  <div className="flex items-center" key={address?.id}>
                    <SelectItem value={i + 1}>
                      <div className="max-w-200">{address.name}</div>
                    </SelectItem>
                  </div>
                ))}
            </SelectContent>
          </Select>
          {selectedAddressId && selectedAddressId !== "-1" ? (
            <DisplayAddress
              address={addresses[Number(selectedAddressId) - 1]}
            ></DisplayAddress>
          ) : (
            <AddressForm
            onSubmitForm={handleFormSubmit}
            // address={
            //   selectedAddressId
            //     ? addresses.find(
            //         (address) => address.id === Number(selectedAddressId)
            //       )
            //     : null
            // }
            ></AddressForm>
          )}
          <Separator className="my-5" />
          <div className="grid gap-5 my-10 ">
            <Label htmlFor="shippingMethod">
              Selecciona tu método de envío:
            </Label>
            {/* name="shippingMethod" */}
            <Select
              // value={field.value}
              // onValueChange={(value) => {
              //   field.onChange(value);
              // }}
              onValueChange={(value) => {
                handleDeliveryType(value);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Elige un método" />
              </SelectTrigger>
              <SelectContent className="bg-white rounded-md shadow-md">
                <SelectItem value="STANDAR">
                  Envío Estándar (3-5 días hábiles)
                </SelectItem>
                <SelectItem value="EXPRESS">
                  Envío Exprés (1-2 días hábiles)
                </SelectItem>
                <SelectItem value="PREMIUM">
                  Envío Premium (Entrega prioritaria)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
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
                  {(items
                    .reduce(
                      (
                        acumulador: number,
                        item: { unit_price: number; quantity: number }
                      ) => {
                        return acumulador + item.unit_price * item.quantity;
                      },
                      0) *0.71
                    )
                    .toFixed(2)} 
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
                  ).toFixed(2)}
                  €
                </span>
              </li>
              <li className="flex items-center justify-between font-semibold">
                <span className="text-muted-foreground">Total</span>
                <span>
                  {(
                    items.reduce((acumulador, item) => {
                      return acumulador + item.unit_price * item.quantity;
                    }, 0)
                  ).toFixed(2)}{" "}
                  €
                </span>
              </li>
            </ul>
          </div>
          <Separator className="my-6" />
          <div className="flex justify-end">
            <>
              {(!isLinkActive || !shippingPrice) && (
                <Button disabled>Ve a pagar</Button>
              )}
              {isLinkActive && shippingPrice ? (
                <Link href="/pago/stripePay">
                  <Button>Ve a pagar</Button>
                </Link>
              ) : null}
            </>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">1/2</div>
      </CardFooter>
    </Card>
  );
}
