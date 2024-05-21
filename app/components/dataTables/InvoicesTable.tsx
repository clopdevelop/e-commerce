import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";

export default function InvoicesTable() {
  return (
    <div className="my-4 mx-auto w-96">
      <Table>
        <TableCaption>Una lista de tus facturas recientes.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Factura</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Método</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium"><a href="#">INV001</a></TableCell>
            <TableCell>Pagada</TableCell>
            <TableCell>Tarjeta de crédito</TableCell>
            <TableCell className="text-right">250.00€</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
