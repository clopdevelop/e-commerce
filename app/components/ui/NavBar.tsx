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

import { auth } from "@/auth";

import Profile from "@/components/utils/Profile";

import { NavigationMenuDemo } from "@/components/ui/nav-links";

import { ModeToggle } from "../utils/ModeToggle";
import { Separator } from "@radix-ui/react-dropdown-menu";
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
} from "@/components/shadcn/sheet";
import { Button, buttonVariants } from "../shadcn/button";
import Cart from "@/components/cart/Cart";
import { MobileMenu } from "./mobile-menu";
import Image from 'next/image'

export async function NavBar() {
  const session = await auth();
  //todo si lo hago  con el id no funciona google auth
  const email = session ? session.user?.email ?? "" : "";

  return (
      <Menubar className="py-12 flex w-full items-center justify-between px-4 sm:px-6 lg:px-8">
<Image src='/3.jpg' width={100} height={150} alt="logo"></Image>
        <NavigationMenuDemo></NavigationMenuDemo>
       <MobileMenu></MobileMenu>
        <div className="flex gap-4">
          <div className="flex justify-center items-center">
            <ModeToggle></ModeToggle>
          </div>
          <Profile></Profile>
        </div>
        
      </Menubar>
  );
}
