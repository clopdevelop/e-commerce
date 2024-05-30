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
import PayButton from "../utils/PayButton";
import AddCartButton from "../cart/AddCartButton";
import { Product } from "@prisma/client";
import { PopoverClose } from "@radix-ui/react-popover";

export default function PopoverColor({
  product,
  onSelection,
}: {
  product: Product;
  onSelection: any;
}) {
  const [color, setColor] = useState('0');

  const handleChangeColor = (value:string) => {
    const newValue = value;
    console.log(newValue);
    setColor(newValue);
    // onSelection(newValue);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="flex items-center gap-2" variant="outline">
          <SettingsIcon className="w-4 h-4" />
          Color
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-6 space-y-4">
       <PopoverClose>
       <div className="grid gap-2">
          <Label htmlFor="color">Color</Label>
          <RadioGroup className="flex items-center gap-2" onValueChange={(value)=>{handleChangeColor(value)}}
            defaultValue={color} id="color">
            <Label
              className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
              htmlFor="color-blue"
            >
              <RadioGroupItem id="color-blue" value="blue" />
              <div className="w-6 h-6 rounded-full bg-blue-500" />
            </Label>
            <Label
              className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
              htmlFor="color-green"
            >
              <RadioGroupItem id="color-green" value="green" />
              <div className="w-6 h-6 rounded-full bg-green-500" />
            </Label>
            <Label
              className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
              htmlFor="color-red"
            >
              <RadioGroupItem id="color-red" value="red" />
              <div className="w-6 h-6 rounded-full bg-red-500" />
            </Label>
            <Label
              className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
              htmlFor="color-yellow"
            >
              <RadioGroupItem id="color-yellow" value="yellow" />
              <div className="w-6 h-6 rounded-full bg-yellow-500" />
            </Label>
          </RadioGroup>
        </div>
       </PopoverClose>
        {/* <div className="flex justify-end gap-2">
          <AddCartButton product={product} color={""} size={0}></AddCartButton>
          <PayButton />
        </div> */}
      </PopoverContent>
    </Popover>
  );
}
