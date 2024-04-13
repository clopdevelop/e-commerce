"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/shadcn/navigation-menu";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/shadcn/sheet"
import { Button } from "../shadcn/button";
import { usePathname } from "next/navigation";
import Cart from "@/components/cart/Cart";
import { Separator } from "../shadcn/separator";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export function NavigationMenuDemo() {
  const pathname = usePathname();
  return (
    <NavigationMenu className="hidden sm:block ">
      <NavigationMenuList>
        <NavigationMenuItem>
            <NavigationMenuLink href="/dashboard" className={`${navigationMenuTriggerStyle()} ${pathname.startsWith('/dashboard') ? '!bg-pink-400' : ''} ${pathname.startsWith('/entrada') ? '!bg-pink-400' : ''}`}>
              Principal
            </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
            <NavigationMenuLink href="/catalogo" className={`${navigationMenuTriggerStyle()} ${pathname === '/catalogo' ? '!bg-pink-400' : ''}`}>
              Tienda
            </NavigationMenuLink>
        </NavigationMenuItem>
        <Sheet>
          <SheetTrigger className={navigationMenuTriggerStyle()}>Carrito</SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Carrito</SheetTitle>
              <SheetDescription>
                Este es tu carrito de compra
              </SheetDescription>
            </SheetHeader>
            <Separator className="my-5"></Separator>
              <Cart></Cart>
            <SheetFooter>
              <SheetClose asChild>
                <Button className="w-full" size="lg" type="submit">Ir a Pagar</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <NavigationMenuItem>
            <NavigationMenuLink href="/contacto" className={`${navigationMenuTriggerStyle()} ${pathname === '/contacto' ? '!bg-pink-400' : ''}`}>
              Contacto
            </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
