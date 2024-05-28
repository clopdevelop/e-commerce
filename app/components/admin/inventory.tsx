import Image from "next/image"
import { MoreHorizontal } from "lucide-react"

import { Badge } from "@/components/shadcn/badge"
import { Button } from "@/components/shadcn/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table"
import Link from "next/link"
import { Product } from "@/lib/definitions"
import DeleteProduct from "../product/DeleteProduct"
import MyPagination from "../utils/myPagination"



export default async function Inventory({ products }: { products: Product[] }) {

  return (
    <Card>
      <CardHeader >
        <div className="flex justify-between" >
          <div>
            <CardTitle>Inventario</CardTitle>
            <CardDescription>
            Administre sus productos.
            </CardDescription>
          </div>
          <div>
            <Link href={"/admin/products/new"}><Button>Añadir producto</Button></Link>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Estado</TableHead>
              {/* <TableHead>Precio</TableHead>
              <TableHead className="hidden md:table-cell">
                Stock
              </TableHead> */}
              <TableHead className="hidden md:table-cell">ID</TableHead>
              <TableHead>
                <span className="sr-only">Acciones</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="hidden sm:table-cell">
                  {product.ProductImage && product.ProductImage[0] && (
                    <Image
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="100"
                      src={product.ProductImage[0].url ?? ''}
                      width="100"
                    />
                  )}
                </TableCell>
                <TableCell className="font-medium">
                  {product.name}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{product.state}</Badge>
                </TableCell>
                <TableCell>{product.price} €</TableCell>
                {/* <TableCell className="hidden md:table-cell">X</TableCell> */}
                {/* <TableCell className="hidden md:table-cell">{product.stock}</TableCell> */}
                <TableCell className="hidden md:table-cell">
                  {product.id}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Alternar menú</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <Link href={`/admin/products/edit/${product.id}`}><DropdownMenuItem>Editar</DropdownMenuItem></Link>
                      <DeleteProduct id_product={product.id}></DeleteProduct>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between ">
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          // onClick={() => table.previousPage()}
          // disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          // onClick={() => table.nextPage()}
          // disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
      <div className="text-xs text-muted-foreground">
          {/* Showing <strong>1-10</strong> of <strong>32</strong> products */}
          Hay {products.length} productos en el Inventario.
        </div>
      </CardFooter>
    </Card>
  )
}
