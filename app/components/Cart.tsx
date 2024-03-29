import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

import Link from "next/link";

import { CartProps } from "@/lib/definitions";
import { Button } from "./ui/button";
//todo hacer que el carrito se rerenderice al hacer una operacion en el
function Cart({ products }: CartProps) {
  return (
    <>
      <p className="text-sm pt-4">Productos:</p>
      <MenubarSeparator />
      {products.map((item) => (
        <>
          <MenubarItem
            key={item.id_product}
            className="flex justify-between gap-10"
          >
            <div>
              <h2>{item.product.name}</h2>
              <p>Cantidad: {item.quantity}</p>
              <p>Precio: {item.product.price}</p>
              {item.product.description && (
                <p>Descripción: {item.product.description}</p>
              )}
            </div>
            {/* todo añadir funcionalidad para eliminar productos del carrito */}
            <Button className="text-sm font- bg-destructive hover:bg-destructive">Eliminar</Button>
          </MenubarItem>
          <MenubarSeparator />
        </>
      ))}
    </>
  );
}

export default Cart;
