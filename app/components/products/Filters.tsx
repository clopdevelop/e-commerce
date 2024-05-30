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
import PriceInput from "./Price";

export function Filters() {
  return (
    <div className="flex flex-col flex-grow border rounded-lg p-6 py-3 overflow-hidden">
      <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm p-4 md:p-6  overflow-hidden">
        <h1 className="text-lg font-semibold mb-4 hidden md:block overflow-hidden">Filtros</h1>
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
             <PriceInput/>
            </AccordionContent>
          </AccordionItem>
          {/* <AccordionItem value="brand">
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
          </AccordionItem> */}
        </Accordion>
      </div>
    </div>
  );
}