import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Link from "next/link";

import { CartProps } from "@/lib/definitions";
import { Button } from "./ui/button";

function Cart({ products }: CartProps) {
  return (
    <MenubarMenu>
      <MenubarTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </MenubarTrigger>
      <MenubarContent>
        <MenubarItem></MenubarItem>
        <MenubarSeparator />
        <MenubarItem>
          <Link href={"/catalogo"}>Card:</Link>
        </MenubarItem>
        <MenubarSeparator />
            {products.map((item) => ( <>
            <MenubarItem key={item.id_product} className="flex justify-between gap-10">
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
              <MenubarSeparator /></>
            ))}
      </MenubarContent>
    </MenubarMenu>
  );
}

export default Cart;
