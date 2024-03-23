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

import { getCartDetailsByEmail } from "@/lib/data";

import Cart from "@/components/Cart";

import { signOut } from "@/auth";

interface ProfileProps {
  email: string;
}

async function Profile({ email }: ProfileProps) {
  //todo no funciona con el id y no funciona con google auth a
  const products = await getCartDetailsByEmail(email);

  return (
    <MenubarMenu>
      <MenubarTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </MenubarTrigger>
      <MenubarContent>
        <form
          action={async () => {
            "use server";
            console.log("signout");
            await signOut();
          }}
        >
          <input type="submit" value="Log out"></input>
        </form>
        <Cart products={products}></Cart>
      </MenubarContent>
    </MenubarMenu>
  );
}

export default Profile;
