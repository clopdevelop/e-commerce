"use client";

import React, { useState, useEffect, useContext } from "react";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/shadcn/menubar";

import Link from "next/link";

import { Button } from "../shadcn/button";
import { CartContext } from "@/context";

function Cart() {
  const cart = useContext(CartContext);
  const { items: products, removeItem } = cart || {};

  return (
    <>
      <p className="text-sm pt-4">Productos:</p>
      <MenubarSeparator />
      <div>
        {products?.map((item) => (
          <>
            <MenubarItem className="flex justify-between gap-10">
              <div key={item.id}>
                <h2>{item.name}</h2>
                <p>Cantidad: {item.quantity}</p>
                <p>Precio: {item.unit_price}</p>
              </div>
              {removeItem && <Button onClick={() => removeItem(item.id)}>Eliminar</Button>}
            </MenubarItem>
            <MenubarSeparator />
          </>
        ))}
      </div>
    </>
  );
}

export default Cart;
