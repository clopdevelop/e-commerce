"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/shadcn/button";
import { ArrowUpDown } from "lucide-react";
import { ActionUserOrder } from "@/components/order/ActionsUserOrder";
import { Badge,  TableCell } from "@/components/shadcn";
import { Order } from "@prisma/client";

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "code",
    header: "Codigo de Pedido",
    cell: ({ row }) => <TableCell>{row.original.code}</TableCell>,
  },
  {
    accessorKey: "order_type",
    header: ({ column }) => {
      return <p className="text-sm text-gray-500 dark:text-gray-400">Tipo</p>;
    },
    cell: ({ row }) => (
      <TableCell>
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            row.original.order_type === "Pedido"
              ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
              : row.original.order_type === "Subscripcion"
              ? "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
          }`}
        >
          {row.original.order_type}
        </span>
      </TableCell>
    ),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">Fecha</p>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <TableCell>{formatDate(new Date(row.original.created_at))}</TableCell>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <p className="text-sm text-gray-500 dark:text-gray-400">Estado</p>;
    },
    cell: ({ row }) => (
      <TableCell>
        <Badge
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}
          variant={`${
            row.original.status === "Procesando"
              ? "secondary"
              : row.original.status === "Cancelado"
              ? "outline"
              : "destructive"
          }`}
        >
          {row.original.status}
        </Badge>
      </TableCell>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const order = String(row.original.id);
      return <ActionUserOrder order={order}></ActionUserOrder>;
    },
  },
];
