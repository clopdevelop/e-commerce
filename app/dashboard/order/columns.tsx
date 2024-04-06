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

import { UserOrder } from "@/lib/definitions";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import { Input } from "@/components/shadcn/input";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";

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

export const columns: ColumnDef<UserOrder>[] = [
  // {
  //   id: "orderDetail", // Identificador único para la columna
  //   header: "Detalle del Pedido",
  //   cell: ({ row }) => {
  //     // Asegurarse de que row.original.orderDetails es un arreglo y tiene al menos un elemento
  //     const detail =
  //       row.original.orderDetails && row.original.orderDetails.length > 0
  //         ? row.original.orderDetails[0]
  //         : "N/A";

  //     // Si detail es un objeto OrderDetail, necesitamos convertirlo a un string o ReactNode de alguna manera.
  //     // Supongamos que OrderDetail tiene una propiedad llamada 'description' que queremos mostrar.
  //     const content = typeof detail === "object" ? detail.id_product : detail;

  //     return <span>{content}</span>;
  //   },
  // },
  {
    accessorKey: "created_at",
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      let amount = parseFloat(row.getValue("amount")) / 100;
      const formatted = new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "eur",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const order = String(row.original.id_order);

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
              // onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Reordenar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <a href={`/dashboard/order/details?order=${order}`}>Detalles</a>
              </DropdownMenuItem>
              <DropdownMenuItem>Descargar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
