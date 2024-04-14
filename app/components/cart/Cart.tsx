"use client";
import React, { useState } from "react";
import { Button } from "../shadcn/button";
import { Input } from "../shadcn/input";
import { Separator } from "../shadcn/separator";
import { useCart } from "@/context/CartProvider";

function Cart() {
  const cart = useCart();
  const { items: products , removeItem, updateItemQuantity } = cart || {};
  const [productQuantities, setProductQuantities] = useState<number[]>(
    products.map(() => 1)
  );

  const handleQuantityChange = (index: number, value: number) => {
    if (value < 1) {
      value = 1;
    }
    const newQuantities = [...productQuantities];
    newQuantities[index] = value;
    setProductQuantities(newQuantities);
    if (updateItemQuantity) {
      updateItemQuantity(products[index].id, value);
    }
  };

  return (
    <>
      {products.map((item, index) => (
        <div key={item.id}>
          <div className="flex items-center gap-4">
            <img
              alt="Thumbnail"
              className="aspect-square rounded-md overflow-hidden object-cover bg-white"
              height="100"
              src="/placeholder.svg"
              width="100"
            />
            <div className="grid gap-1.5">
              <h3 className="font-semibold text-sm leading-none">
                {item.name}
              </h3>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold">{item.unit_price}€</span>
                <span className="text-gray-500 dark:text-gray-400">
                  x {item.quantity}
                </span>
              </div>
              <div className="flex items-center gap-4">
                {removeItem && (
                  <Button
                    variant="destructive"
                    onClick={() => removeItem(item.id)}
                  >
                    Eliminar
                  </Button>
                )}
                <Input
                  className="w-16"
                  defaultValue={item.quantity}
                  type="number"
                  min={1}
                  max={99}
                  onChange={(e) =>
                    handleQuantityChange(index, parseInt(e.target.value))
                  }
                />
              </div>
            </div>
          </div>
          <Separator className="my-5"></Separator>
        </div>
      ))}
    </>
  );
}

export default Cart;
