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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { signOut } from "@/auth";
import Link from "next/link";
import { Button } from "./ui/button";

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
        <Sheet>
          <SheetTrigger>Carrito</SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Opciones</SheetTitle>
              <SheetDescription>
                Este es tu carrito de compra
              </SheetDescription>
            </SheetHeader>
            <Cart products={products}></Cart>
            <SheetFooter className="pt-5">
              <SheetClose asChild>
                <Button className="p-5 text-lg font-bold" type="submit">Comprar</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </MenubarContent>
    </MenubarMenu>
  );
}

export default Profile;
