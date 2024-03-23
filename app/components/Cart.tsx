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

function Cart({ products }: CartProps) {
  return (
    <>
      <MenubarSeparator />
      <Link href={"/carrito"}>
        <MenubarItem>Card:</MenubarItem>
      </Link>
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
            <Button>Eliminar</Button>
          </MenubarItem>
          <MenubarSeparator />
        </>
      ))}
    </>
  );
}

export default Cart;
