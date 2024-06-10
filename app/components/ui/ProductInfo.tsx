"use client";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/G5AhT52MY4a
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/shadcn/label";
import { RadioGroup, RadioGroupItem } from "@/components/shadcn/radio-group";
import { Button } from "@/components/shadcn/button";
import AddCartButton from "../cart/AddCartButton";
import { Toaster } from "sonner";
import Image from "next/image";
import { Product } from "@prisma/client";
import PopoverColor from "../product/PopoverColor";
import PopoverSize from "../product/PopoverSize";
import { useState, SetStateAction } from "react";

const colors: any = {
  default: "bg-black-and-white-lines",
  blue: "bg-blue-500",
  green: "bg-green-500",
  red: "bg-red-500",
  yellow: "bg-yellow-500",
};

const coloresANumeros = {
  default: 0,
  blue:1,
  green: 2,
  red: 3,
  yellow:4,
};

export default function ProductInfo({ product }: { product: Product }) {
  const [color, setColor] = useState("default");
  const [size, setSize] = useState("0");

  const handleColor = (newData: SetStateAction<string>) => {
    setColor(newData);
    console.log(newData);
    const num = coloresANumeros[newData];
    setColorImage(num);
  };
  const handleSize = (newData: SetStateAction<string>) => {
    setSize(newData);
  };

  const [colorImage, setColorImage] = useState(0);

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto py-12 px-4 md:px-0">
      <div>
        <Image
          alt="Product image"
          // className="aspect-square rounded-md object-cover"
          className="w-full sm:w-auto rounded-lg object-cover aspect-square"
          src={product.ProductImage[colorImage].url ?? ""}
          width={300}
          height={300}
          priority={true}
        />
      </div>
      <div className="grid gap-6">
        <div>
          <h1 className="text-3xl font-bold">{product?.name}</h1>
          <p className="text-gray-500 mt-2">
            A sleek and modern desk lamp that provides the perfect balance of
            form and function.
          </p>
        </div>
        <div className="grid gap-4">
          <PopoverColor
            product={product}
            onSelection={handleColor}
          ></PopoverColor>
          <PopoverSize product={product} onSelection={handleSize}></PopoverSize>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{product?.price}€</h2>
          <AddCartButton
            product={product}
            color={color}
            size={Number(size)}
          ></AddCartButton>
        </div>
        <Toaster richColors></Toaster>
      </div>
    </div>
  );
}
