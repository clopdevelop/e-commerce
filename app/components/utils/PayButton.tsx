"use client"
import { buttonVariants } from "../shadcn/button";
import Link from "next/link";
  export default function PayButton() {

  return (
    <Link 
    href="/pago"
    className={buttonVariants({ variant: "default" })}
    >
        Comprar
    </Link>
  );
}
