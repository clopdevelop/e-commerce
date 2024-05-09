"use client";
import React, { useState } from "react";
import { Button } from "../shadcn/button";
import { Input } from "../shadcn/input";
import { Separator } from "../shadcn/separator";
import { useCart } from "@/context/CartProvider";
import Image from "next/image";

function Cart() {
  const cart = useCart();
  const { items: products, removeItem, updateItemQuantity } = cart || {};
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
  console.log(products);

  return (
    <>
      {products.map((product, index) => (
        <div key={product.id}>
          <div className="flex items-center gap-4">
            <Image
              alt="Product image"
              className="aspect-square rounded-md object-cover"
              src={product.thumbnail?.url ?? ''}
              width={100}
              height={100}
            />
            <div className="grid gap-2">
              <h3 className="font-semibold text-sm leading-none">
                {product.name}
              </h3>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold">{product.unit_price}€</span>
                <span className="text-gray-500 dark:text-gray-400">
                  x {product.quantity}
                </span>
              </div>
              <div className="flex items-center gap-4">
                {removeItem && (
                  <Button
                    variant="destructive"
                    onClick={() => removeItem(product.id)}
                  >
                    Eliminar
                  </Button>
                )}
                <Input
                  className="w-16"
                  defaultValue={product.quantity}
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
