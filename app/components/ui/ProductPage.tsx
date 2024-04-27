/**
 * v0 by Vercel.
 * @see https://v0.dev/t/jnO31LGLBI6
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
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
import { JSX, SVGProps } from "react";
import { Product } from "@/lib/definitions";
import AddCartButton from "../utils/AddCartButton";
import { Toaster } from "sonner";
import PayBotton from "../utils/PayButton";

export default function Component({ product }: { product: Product }) {
  console.log(product);

  return (
    <div className="flex min-h-screen w-full">
      <div className="grid w-9/12 mx-auto">
        <main className="flex flex-col gap-4 p-4 md:gap-8 md:p-6 border">
          <div>
            <div className="flex flex-row mx-auto border p-10">
              <div className="w-96 h-96">Imagen</div>
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
                {/* <div className="grid gap-2 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label className="text-base" htmlFor="color">
                      Color
                    </Label>
                    <RadioGroup
                      className="flex items-center gap-2"
                      defaultValue="black"
                      id="color"
                    >
                      <Label
                        className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                        htmlFor="color-black"
                      >
                        <RadioGroupItem id="color-black" value="black" />
                        Black
                      </Label>
                      <Label
                        className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                        htmlFor="color-white"
                      >
                        <RadioGroupItem id="color-white" value="white" />
                        White
                      </Label>
                      <Label
                        className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                        htmlFor="color-blue"
                      >
                        <RadioGroupItem id="color-blue" value="blue" />
                        Blue
                      </Label>
                    </RadioGroup>
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-base" htmlFor="size">
                      Size
                    </Label>
                    <RadioGroup
                      className="flex items-center gap-2"
                      defaultValue="m"
                      id="size"
                    >
                      <Label
                        className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                        htmlFor="size-xs"
                      >
                        <RadioGroupItem id="size-xs" value="xs" />
                        XS
                      </Label>
                      <Label
                        className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                        htmlFor="size-s"
                      >
                        <RadioGroupItem id="size-s" value="s" />S
                        {"\n                                  "}
                      </Label>
                      <Label
                        className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                        htmlFor="size-m"
                      >
                        <RadioGroupItem id="size-m" value="m" />M
                        {"\n                                  "}
                      </Label>
                      <Label
                        className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                        htmlFor="size-l"
                      >
                        <RadioGroupItem id="size-l" value="l" />L
                        {"\n                                  "}
                      </Label>
                      <Label
                        className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                        htmlFor="size-xl"
                      >
                        <RadioGroupItem id="size-xl" value="xl" />
                        XL
                      </Label>
                    </RadioGroup>
                  </div>
                </div> */}
                <div className="grid gap-2">
                  <Label className="text-base" htmlFor="quantity">
                    Quantity
                    <Badge className="ml-4">Stock: {product?.stock}</Badge>
                  </Label>
                  <Input
                    type="number"
                    defaultValue={1}
                    min={1}
                    max={product?.stock}
                    className="w-24"
                  ></Input>
                </div>
                <AddCartButton product={product} quantity={1}></AddCartButton>
                {/* <Button size="lg">Comprar</Button> */}
                {/* <PayBotton id_user={id_user} product={product} /> */}
                <PayBotton />
              </div>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label className="text-base" htmlFor="description">
                  Description
                </Label>
                <p id="description">
                  The Acme Circles T-Shirt is a stylish and comfortable addition
                  to your wardrobe. Made from high-quality cotton, this t-shirt
                  features a modern design with an all-over circle pattern. The
                  slim fit and crew neck make it perfect for everyday wear,
                  while the soft and breathable fabric keeps you cool and
                  comfortable all day long. Whether you're heading to the gym or
                  meeting friends for coffee, the Acme Circles T-Shirt is sure
                  to make a statement.
                </p>
              </div>
            </div>
          </div>
          <Toaster></Toaster>
        </main>
      </div>
    </div>
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
