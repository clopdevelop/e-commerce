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

// import { useSession } from "next-auth/react";


function Cart() {
  const cart = useContext(CartContext);
  const { items: products, removeItem } = cart || {};
  // const { data: session, status } = useSession();


  return (
    <>
      {/* {session && <p>Bienvenido, {session?.user?.name}!</p>} */}
      <p className="text-sm pt-4">Productos:</p>
      <MenubarSeparator />
      <div>
        {products?.map((item) => (
          <>
            <div className="flex justify-between gap-10">
              <div key={item.id}>
                <h2>{item.name}</h2>
                <p>Cantidad: {item.quantity}</p>
                <p>Precio: {item.unit_price}</p>
              </div>
              {removeItem && <Button onClick={() => removeItem(item.id)}>Eliminar</Button>}
            </div>
            <MenubarSeparator />
          </>
        ))}
      </div>
    </>
  );
}

export default Cart;
