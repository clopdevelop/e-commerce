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

function Cart() {
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
            
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
}

export default Cart;
