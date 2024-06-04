"use client";
import { CarouselProducts } from "@/components/products/CarouselProducts";

import Image from "next/image";
import { Button } from "@/components/shadcn/button";
import { Badge } from "@/components/shadcn/badge";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/shadcn/card";
import { Input } from "@/components/shadcn/input";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/shadcn/dropdown-menu";
import { Label } from "@/components/shadcn/label";
import { RadioGroupItem, RadioGroup } from "@/components/shadcn/radio-group";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/shadcn/select";
import { JSX, SVGProps, useState } from "react";
import { Product } from "@/lib/definitions";
import AddCartButton from "../cart/AddCartButton";
import { Toaster } from "sonner";

const colors: any = {
    default: "bg-black-and-white-lines",
    blue: "bg-blue-500",
    green: "bg-green-500",
    red: "bg-red-500",
    yellow: "bg-yellow-500",
  };

export default function ProductInfo({ product }: { product: Product }) {
  const size = "";
  const color = "";

  return (
    // <div className="flex min-h-screen w-full">
    <>
        <div className="grid w-9/12 mx-auto">
          <main className="flex flex-col gap-4 pt-6 md:gap-8 md:pt-10">
            <div className="flex flex-row justify-around w-full border p-10 ">
              <Image
                alt="Product image"
                className="aspect-square rounded-md object-cover"
                src={product?.ProductImage?.[0]?.url || ""}
                width={300}
                height={300}
                priority={true}
              />
              <div className="grid gap-4">
                <h1 className="text-2xl font-semibold tracking-tight lg:text-4xl md:tracking-tighter">
                  {product?.name}
                </h1>
                <div className="flex items-center gap-4">
                  {/* todo añadir valoraciones */}
                  {/* <div className="flex items-center gap-0.5">
      <StarIcon className="w-5 h-5 fill-primary" />
      <StarIcon className="w-5 h-5 fill-primary" />
      <StarIcon className="w-5 h-5 fill-primary" />
      <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
      <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
      <span className="text-sm text-gray-500 dark:text-gray-400">
        (3.5)
      </span>
    </div> */}
                  <div className="text-3xl font-semibold md:text-4xl lg:text-5xl">
                    {product?.price}€
                  </div>
                </div>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label className="text-base" htmlFor="description">
                      Descripcion
                    </Label>
                    <p>Descripcion</p>
                  </div>
                </div>
                <AddCartButton
                  product={product}
                  color={color}
                  size={size}
                ></AddCartButton>
              </div>
            </div>
            <Toaster richColors></Toaster>
          </main>
        </div>
    </>
  );
}

function StarIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
