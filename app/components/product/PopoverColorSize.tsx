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
import { JSX, SVGProps } from "react";

export default function Component() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="flex items-center gap-2" variant="outline">
          <SettingsIcon className="w-4 h-4" />
          Personaliza
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-6 space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="color">Color</Label>
          <RadioGroup
            className="flex items-center gap-2"
            defaultValue="blue"
            id="color"
          >
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
        <div className="grid gap-2">
          <Label htmlFor="size">Size</Label>
          <RadioGroup
            className="flex items-center gap-2 overflow-x-auto"
            defaultValue="9"
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
        <div className="flex justify-end">
          <Button>Save</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function SettingsIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
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
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
