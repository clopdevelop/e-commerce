"use client";
import {
  addVariantProduct,
  deleteProductVariant,
  editVariantProduct,
  updateProductVariant,
} from "@/lib/actionscommands";
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
import { redirect } from "next/navigation";
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

  const handleCreate = async (newVariant: any) => {
    console.log(newVariant);
    const createdVariant = await addVariantProduct(newVariant);
  
    if (!createdVariant) {
      console.error("Error: createdVariant es undefined");
      return;
    }
  
    setProduct_Variants((prevVariants) => {
      const exists = prevVariants.some((variant) => variant.id === createdVariant.id);
      if (exists) {
        return prevVariants.map((variant) =>
          variant.id === createdVariant.id ? createdVariant : variant
        );
      } else {
        return [...prevVariants, createdVariant];
      }
    });
  };
  
  const handleEdit = async (editedVariant: any) => {
    console.log(editedVariant)
    const updatedVariant = await updateProductVariant(editedVariant);

    setProduct_Variants((prevVariants) =>
      prevVariants.map((variant) =>
        variant.id === updatedVariant.id ? updatedVariant : variant
      )
    );
  };

  const handleDelete = async (id: any) => {
    await deleteProductVariant(id);

    console.log(id)
    setProduct_Variants((prevVariants) =>
      prevVariants.filter((variant) => variant.id !== id)
    );
  };

  const [color, setColor] = useState(0);
  const [size, setSize] = useState(0);

  const handleColorChange = (color: number) => {
    setColor(color);
  };
  

  const handleSizeChange = (value: string) => {
    setSize(Number(value));
  };

  const [rows, setRows] = useState([
    { code: "001", stock: "", price: "", size: "s" },
  ]);

  const addRow = () => {
    setRows([...rows, { code: "", stock: "", price: "", size: "s" }]);
  };

  const sizes = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46];

  return (
    <Card x-chunk="dashboard-07-chunk-1">
      <CardHeader>
        <CardTitle>Variante</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={editVariantProduct}>
          <Input
            type="hidden"
            name="id_product"
            value={String(product_id)}
          ></Input>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-2/12">Código</TableHead>
                <TableHead className="w-3/12">Color</TableHead>
                <TableHead className="w-1/12">Talla</TableHead>
                <TableHead className="w-1/12">Cantidad</TableHead>
                <TableHead className="w-2/6"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {product_variants.map((variant, i) => (
                <VariantRow
                  key={i}
                  code={i + 1}
                  variant={variant}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </TableBody>
          </Table>
        </form>
        <form action={handleCreate}>
          <Input
            type="hidden"
            name="id_product"
            value={String(product_id)}
          ></Input>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold w-1/12">
                  <Input
                    id="code"
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
                    isEditing={true}/>
                </TableCell>
                <Input id="size" name="size" type="hidden" value={size}></Input>
                <TableCell className="w-1/6">
                  <Select onValueChange={handleSizeChange}>
                    <SelectTrigger>
                      <SelectValue placeholder={size} />
                    </SelectTrigger>
                    <SelectContent>
                      {sizes.map((size, index) => (
                        <SelectItem key={index} value={String(index + 1)}>
                          {size}
                        </SelectItem>
                      ))}
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
