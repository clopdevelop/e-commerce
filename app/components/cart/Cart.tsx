"use client";
import React, { useState } from "react";
import { Button } from "../shadcn/button";
import { Input } from "../shadcn/input";
import { Separator } from "../shadcn/separator";
import { useCart } from "@/context/CartProvider";
import Image from "next/image";
import { SettingsIcon } from "lucide-react";
import PopoverColor from "../product/PopoverColor";
import PopoverSize from "../product/PopoverSize";
import { XCircleIcon } from "lucide-react";

function Cart() {
  const cart = useCart();
  const { items: products, removeItem } = cart || {};

  const colors: any = {
    default: "bg-black-and-white-lines",
    blue: "bg-blue-500",
    green: "bg-green-500",
    red: "bg-red-500",
    yellow: "bg-yellow-500",
  };

  return (
    <>
      {products.map((product, index) => (
        <div key={product.id}>
          <div className="flex items-center gap-4">
            <Image
              alt="Product image"
              className="aspect-square rounded-md object-cover"
              src={product.thumbnail?.url ?? ""}
              width={100}
              height={100}
            />
            <div className="grid gap-2 w-48">
              <div className="flex justify-between">
                <h3 className="font-semibold text-sm leading-none">
                  {product.name}
                </h3>
                {removeItem && (
                  <XCircleIcon
                    className="cursor-pointer"
                    onClick={() => removeItem(product.id)}
                  ></XCircleIcon>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold">{product.unit_price}€</span>
                <span className="text-gray-500 dark:text-gray-400">
                  x {product.quantity}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <style jsx>{`
                  .bg-black-and-white-lines {
                    background: repeating-linear-gradient(
                      45deg,
                      white,
                      white 2px,
                      black 2px,
                      black 4px
                    );
                  }
                `}</style>
                <div
                  className={`w-4 h-4 rounded-full ${colors[product.color||'default']}`}
                />
                <span className="bg-gray-200 dark:bg-gray-800 p-1  rounded-md text-gray-700 dark:text-gray-300 text-sm font-medium">
                Talla:{' '}
                  {product.size}
                </span>
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
