import Cart from "@/components/cart/Cart";
import {Sheet, SheetTrigger, navigationMenuTriggerStyle, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose, buttonVariants } from "@/components/shadcn";
import { Separator } from "@radix-ui/react-dropdown-menu";
import Link from "next/link"
export default async function Home({
  searchParams,
}: {
  searchParams?: {
    success?: string;
  };
}) {
  // Obtiene el parámetro `success` de la URL
  const success = searchParams?.success
// redirect_status=succeeded
  return (
    <>
      {success ? (
        <>
          <h1>SUCCESS</h1>
        </>
      ): (
        <>
          <h1>WELCOME</h1>
        </>
      )}

    </>
  );
}
