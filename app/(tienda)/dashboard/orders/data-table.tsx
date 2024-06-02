"use client";
import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";

import { Button } from "@/components/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { Badge, Input, Separator } from "@/components/shadcn";
import { useState } from "react";
import { ListFilter } from "lucide-react";
import {
  FilterUserOrderStatus,
  FilterUserOrderType,
} from "@/components/order/FilterUserOrder";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const orders = [
    {
      id: "1",
      type: "Compra",
      date: "2023-06-01",
      items: [
        { name: "Camiseta", quantity: 2, price: 19.99 },
        { name: "Pantalones", quantity: 1, price: 39.99 },
      ],
      total: 79.97,
      status: "Entregado",
    },
    {
      id: "2",
      type: "Devolución",

      date: "2023-05-15",
      items: [
        { name: "Zapatos", quantity: 1, price: 59.99 },
        { name: "Chaqueta", quantity: 1, price: 79.99 },
      ],
      total: 139.98,
      status: "Devuelto",
    },
    {
      id: "3",
      type: "Subscripción",
      date: "2023-04-30",
      items: [{ name: "Vestido", quantity: 1, price: 49.99 }],
      total: 49.99,
      status: "Pendiente",
    },
  ];
  // ].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <>
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">Tu Historial de Pedidos</h1>
      </div>
      <Separator className="my-4"></Separator>
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Pedidos</CardTitle>
          <CardDescription>Estos son todos tus pedidos.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center py-4 gap-4">
            Tipo: <FilterUserOrderType table={table}></FilterUserOrderType>
            Estado:{" "}
            <FilterUserOrderStatus table={table}></FilterUserOrderStatus>
          </div>
         <div>
         <Table>
            <TableHeader className="bg-gray-100 dark:bg-gray-800">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className=" px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row
                      .getVisibleCells()
                      .map((cell) =>
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
         </div>
        </CardContent>
      </Card>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </>
  );
}
