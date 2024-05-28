/**
 * v0 by Vercel.
 * @see https://v0.dev/t/xkO8NyK5j5y
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Button } from "@/components/shadcn/button";
import {
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
  Accordion,
} from "@/components/shadcn/accordion";
import { Checkbox } from "@/components/shadcn/checkbox";
import { Label } from "@/components/shadcn/label";
import { JSX, SVGProps } from "react";
import Categories from "./Categories";

export function Filters() {
  return (
    <div className="flex flex-col flex-grow border rounded-lg p-6">
      <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm p-4 md:p-6">
        <h1 className="text-lg font-semibold mb-4 hidden md:block">Filtros</h1>
        <Accordion collapsible type="single">
          <AccordionItem value="category">
            <AccordionTrigger className="text-base">Categorias</AccordionTrigger>
            <AccordionContent>
              <Categories></Categories>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="price">
            <AccordionTrigger className="text-base">Price</AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-2">
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="price-under50" />
                  Under $50{"\n                                    "}
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="price-50to100" />
                  $50 - $100{"\n                                    "}
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="price-over100" />
                  Over $100{"\n                                    "}
                </Label>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="brand">
            <AccordionTrigger className="text-base">Brand</AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-2">
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="brand-acme" />
                  Acme{"\n                                    "}
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="brand-globex" />
                  Globex{"\n                                    "}
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="brand-stark" />
                  Stark{"\n                                    "}
                </Label>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function ShoppingBagIcon(
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
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function ShoppingCartIcon(
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
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}
