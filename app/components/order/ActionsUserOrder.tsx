'use client';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/shadcn/dropdown-menu";
  import { ListFilter, Repeat2Icon, ScrollText } from "lucide-react";
  import { DotsHorizontalIcon } from "@radix-ui/react-icons";
  import Link from "next/link";
import { Button } from "../shadcn";

export function ActionUserOrder({order} : {order: string}) {
  return (
    <div className="flex justify-end mr-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="flex justify-between items-center">
                <a href={`/dashboard/orders/${order}`}>Detalles</a>
                <ScrollText className="h-4 w-4"></ScrollText>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
  );
}