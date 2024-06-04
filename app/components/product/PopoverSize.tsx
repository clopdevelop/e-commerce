/**
 * v0 by Vercel.
 * @see https://v0.dev/t/iFSdTFwQtCA
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/shadcn/button";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/shadcn/popover";
import { Label } from "@/components/shadcn/label";
import { Input } from "@/components/shadcn/input";
import { RadioGroupItem, RadioGroup } from "@/components/shadcn/radio-group";
import { JSX, SVGProps, useState } from "react";
import { SettingsIcon } from "lucide-react";
import AddCartButton from "../cart/AddCartButton";
import { Product } from "@prisma/client";
import { PopoverClose } from "@radix-ui/react-popover";

export default function PopoverSize({
  product,
  onSelection,
}: {
  product: Product;
  onSelection: any;
}) {
  const [size, setSize] = useState('XX');

  const handleChangeSize = (value: string) => {
    setSize(value);
    onSelection(value);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="flex items-center gap-3" variant="outline">
          <span className="bg-gray-200 dark:bg-gray-800 px-1  rounded-md text-gray-700 dark:text-gray-300 text-sm font-medium">
            {size}
          </span>
          Talla
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-6 space-y-4">
        <PopoverClose>
          <div className="grid gap-2">
            <RadioGroup
              className="flex items-center gap-2 overflow-x-auto"
              onValueChange={(value) => {
                handleChangeSize(value);
              }}
              defaultValue={size}
              id="size"
            >
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="size-35"
              >
                <RadioGroupItem id="size-35" value="35" />
                35
              </Label>
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="size-36"
              >
                <RadioGroupItem id="size-36" value="36" />
                36
              </Label>
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="size-37"
              >
                <RadioGroupItem id="size-37" value="37" />
                37
              </Label>
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="size-38"
              >
                <RadioGroupItem id="size-38" value="38" />
                38
              </Label>
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="size-39"
              >
                <RadioGroupItem id="size-39" value="39" />
                39
              </Label>
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="size-40"
              >
                <RadioGroupItem id="size-40" value="40" />
                40
              </Label>
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="size-41"
              >
                <RadioGroupItem id="size-41" value="41" />
                41
              </Label>
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="size-42"
              >
                <RadioGroupItem id="size-42" value="42" />
                42
              </Label>
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="size-43"
              >
                <RadioGroupItem id="size-43" value="43" />
                43
              </Label>
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="size-44"
              >
                <RadioGroupItem id="size-44" value="44" />
                44
              </Label>
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="size-45"
              >
                <RadioGroupItem id="size-45" value="45" />
                45
              </Label>
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="size-46"
              >
                <RadioGroupItem id="size-46" value="46" />
                46
              </Label>
            </RadioGroup>
          </div>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}
