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
        <MenubarItem>
          <div>
            {products.map((item) => (
              <div key={item.id_product}>
                <h2>{item.product.name}</h2>
                <p>Cantidad: {item.quantity}</p>
                <p>Precio: {item.product.price}</p>
                {item.product.description && (
                  <p>Descripción: {item.product.description}</p>
                )}
              </div>
            ))}
          </div>
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
}

export default Cart;
