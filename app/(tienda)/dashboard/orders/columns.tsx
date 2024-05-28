"use client";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";

import { Repeat2Icon, ScrollText } from "lucide-react"
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import { Input } from "@/components/shadcn/input";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Order } from "@/lib/definitions";

function HandleSearch(term: string) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams);
  if (term) {
    params.set("order", term);
  } else {
    params.delete("order");
  }
  replace(`${pathname}?${params.toString()}`);
}

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "code",
    header: "Codigo de Pedido"
  },
  {
    accessorKey: "type",
    header: "Tipo"
  },
  {
    accessorKey: "status",
    header: "Estado"
  },
  {
    accessorKey: "created_at",
    header: "Fecha"
  },
  // {
  //   accessorKey: "total",
  //   header: () => <div className="text-right">Total</div>,
  //   cell: ({ row }) => {
  //     let total = parseFloat(row.getValue("total"));
  //     const formatted = new Intl.NumberFormat("es-ES", {
  //       style: "currency",
  //       currency: "eur",
  //     }).format(total);

  //     return <div className="text-right font-medium">{formatted}</div>;
  //   },
  // },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const order = String(row.original.id);

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
              <DropdownMenuItem className="flex justify-between items-center"
              // onClick={() => navigator.clipboard.writeText(payment.id)}
              >
               Pedir   <Repeat2Icon className="h-4 w-4"></Repeat2Icon>
              </DropdownMenuItem>
              {/* <DropdownMenuItem>Compartir</DropdownMenuItem> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem  className="flex justify-between items-center">
                <a href={`/dashboard/orders/${order}`}>Detalles</a><ScrollText className="h-4 w-4"></ScrollText>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
