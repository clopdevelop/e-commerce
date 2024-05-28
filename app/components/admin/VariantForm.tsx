"use client";
import { addVariantProduct, editVariantProduct } from "@/lib/actionscommands";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../shadcn";
import { PlusCircle } from "lucide-react";
import { Input } from "../shadcn";
import { Button } from "../shadcn";
import { InputColor } from "../form/admin/inputColor";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  CardFooter,
} from "../shadcn";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { ProductVariant } from "@prisma/client";
import { VariantRow } from "./VariantRow";
const colores = [
  {
    value: 1,
    label: "Blanco y Negro",
  },
  {
    value: 2,
    label: "Blanco",
  },
  {
    value: 3,
    label: "Negro",
  },
  {
    value: 4,
    label: "Roja",
  },
  {
    value: 5,
    label: "Azul",
  },
];
export default function VariantForm({
  product_id,
  variants,
}: {
  product_id: Number;
  variants: ProductVariant[] | [];
}) {
  const [product_variants, setProduct_Variants] = useState(variants);

  const handleEdit = (editedVariant: any) => {
    // Aquí puedes manejar la lógica para editar una variante
    // Por ejemplo, podrías buscar la variante en tu estado y reemplazarla con la editada
  };

  const handleDelete = (id: any) => {
    // Aquí puedes manejar la lógica para eliminar una variante
    // Por ejemplo, podrías filtrar las variantes de tu estado para quitar la que tiene el id dado
  };
  
  const [color, setColor] = useState(0);
  const [size, setSize] = useState(0);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setColor(Number(e.target.value));
  };

  const handleSizeChange = (value: string) => {
    console.log(value)
    setSize(Number(value));
  };

  const [rows, setRows] = useState([
    { code: "001", stock: "", price: "", size: "s" },
    // ... tus otras filas aquí
  ]);

  const addRow = () => {
    setRows([...rows, { code: "", stock: "", price: "", size: "s" }]);
  };

  // on submit hay que limpiar los valores del input

  return (
    <Card x-chunk="dashboard-07-chunk-1">
      <CardHeader>
        <CardTitle>Variante</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={editVariantProduct}>
      <Input type="hidden" name="id_product" value={String(product_id)}></Input>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/12">Código</TableHead>
                <TableHead className="w-1/5">Color</TableHead>
                <TableHead className="w-1/6">Talla</TableHead>
                <TableHead className="w-1/6">Cantidad</TableHead>
                <TableHead className="w-1/4">Accion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {product_variants.map((variant) => (
                <VariantRow
                  key={variant.id}
                  variant={variant}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </TableBody>
          </Table>
        </form>
        <form action={addVariantProduct}>
      <Input type="hidden" name="id_product" value={String(product_id)}></Input>
          <Table>
            <TableBody>
            <TableRow>
                <TableCell className="font-semibold w-1/12">
                  <Input
                    id="code"
                    name="code"
                    type="text"
                    className="w-20 border-0 shadow-none"
                    min={0}
                    defaultValue={(variants.length + 1)
                      .toString()
                      .padStart(2, "0")}
                    readOnly
                  />
                </TableCell>
                <Input
                  id="color"
                  name="color"
                  type="hidden"
                  value={color}
                ></Input>
                <TableCell className="w-1/5">
                  <InputColor
                    value={color}
                    onChange={handleColorChange}
                  ></InputColor>
                </TableCell>
                <Input id="size" name="size" type="hidden" value={size}></Input>
                <TableCell className="w-1/6">
                  <Select onValueChange={handleSizeChange}>
                    <SelectTrigger>
                      <SelectValue placeholder={size} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">35</SelectItem>
                      <SelectItem value="2">36</SelectItem>
                      <SelectItem value="3">37</SelectItem>
                      <SelectItem value="4">38</SelectItem>
                      <SelectItem value="5">39</SelectItem>
                      <SelectItem value="6">40</SelectItem>
                      <SelectItem value="7">41</SelectItem>
                      <SelectItem value="8">42</SelectItem>
                      <SelectItem value="9">43</SelectItem>
                      <SelectItem value="10">44</SelectItem>
                      <SelectItem value="11">45</SelectItem>
                      <SelectItem value="12">46</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="w-1/5 md:w-1/6 ">
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    className="w-20"
                    min={0}
                    defaultValue={"0"}
                  />
                </TableCell>
                <TableCell className="w-1/4">
                <LoginButton></LoginButton>                
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </form>
      </CardContent>
    </Card>
  );

  function LoginButton() {
    const { pending } = useFormStatus();

    return (
      <Button
        type="submit"
        size="sm"
        variant="outline"
        className="gap-1 flex justify-center items-center"
        disabled={pending}
      >
        <PlusCircle className="h-3.5 w-3.5" />
        Añadir Variante
      </Button>
    );
  }
}
