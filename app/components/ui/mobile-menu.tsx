"use client";
import {
    Separator,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  navigationMenuTriggerStyle,
} from "@/components/shadcn/";
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
import Cart from "../cart/Cart";
import { Button, buttonVariants } from "../shadcn/button";

export function MobileMenu() {
  return (
    <MenubarMenu>
      <div className="p-2 sm:hidden">
        <MenubarTrigger>Menu</MenubarTrigger>
        <MenubarContent>
          <Link href={"/dashboard"}>
            <MenubarItem>Principal</MenubarItem>
          </Link>
          <Link href={"/catalogo"}>
            <MenubarItem>Tienda</MenubarItem>
          </Link>
          <MenubarSeparator />
          <Sheet>
            <SheetTrigger className={navigationMenuTriggerStyle()}>
              Carrito
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Carrito</SheetTitle>
                <SheetDescription>
                  Este es tu carrito de compra
                </SheetDescription>
              </SheetHeader>
              <Separator className="my-5"></Separator>
              <Cart></Cart>
              <SheetFooter className="flex gap-5">
                <SheetClose asChild>
                  <Link
                    href={"/pago"}
                    className={buttonVariants({ variant: "default" })}
                  >
                    Ir a Pagar
                  </Link>
                </SheetClose>
                <Link
                  href="/catalogo"
                  className={buttonVariants({ variant: "outline" })}
                >
                  <SheetClose>Seguir comprando</SheetClose>
                </Link>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          <MenubarSeparator />
          <Link href={"/registro"}>
            <MenubarItem>Atención al Cliente</MenubarItem>
          </Link>
        </MenubarContent>
      </div>
    </MenubarMenu>
  );
}
