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

import { getCartDetailsByEmail } from "@/lib/data";

import Cart from "@/components/Cart";

import { signOut } from "@/auth";
import Link from "next/link";

interface ProfileProps {
  email: string;
}

async function Profile({ email }: ProfileProps) {
  //todo no funciona con google auth a
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
      {/*No funciona con <MenubarItem> porque no se ejecuta la lógica del formulario*/}
          <form
            action={async () => {
              "use server";
              console.log("signout");
              await signOut();
            }}
          >
            <input type="submit" value="Log out"></input>
          </form>
        <Link href={"/dashboard"}>
            <MenubarItem>Perfil</MenubarItem>
        </Link>
        <Cart products={products}></Cart>
      </MenubarContent>
    </MenubarMenu>
  );
}

export default Profile;
