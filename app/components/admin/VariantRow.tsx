"use client";
import { addVariantProduct } from "@/lib/actionscommands";
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
import { Color, ProductVariant, Size } from "@prisma/client";

interface VariantRowProps {
  variant: ProductVariant;
  code: number;
  onEdit: (variant: ProductVariant) => void;
  onDelete: (id: number) => void;
}

const colores = [
  { value: 1, label: "Blanco y Negro" },
  { value: 2, label: "Blanco" },
  { value: 3, label: "Negro" },
  { value: 4, label: "Rojo" },
  { value: 5, label: "Azul" },
];

const sizes = [
  { value: 1, label: "35" },
  { value: 2, label: "36" },
  { value: 3, label: "37" },
  { value: 4, label: "38" },
  { value: 5, label: "39" },
  { value: 6, label: "40" },
  { value: 7, label: "41" },
  { value: 8, label: "42" },
  { value: 9, label: "43" },
  { value: 10, label: "44" },
  { value: 11, label: "45" },
  { value: 12, label: "46" },
];

export function VariantRow({ variant, code, onEdit, onDelete }: VariantRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedVariant, setEditedVariant] = useState(variant);
  console.log(variant)

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(editedVariant);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(variant.id);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedVariant({
      ...editedVariant,
      [event.target.name]: event.target.value,
    });
  };

  const handleColorChange = (color: number) => {
    setEditedVariant({
      ...editedVariant,
      color:colorMap[color],
    });
  };

  const handleSizeChange = (value: string) => {
    const size = Number(value);
    setEditedVariant({
      ...editedVariant,
      size: sizeMap[size],
    });
  };

  const reverseColorMap: { [key in Color]: number } = {
    DEFAULT: 1,
    BLUE: 2,
    GREEN: 3,
    RED: 4,
    YELLOW: 5,
  };

  const reverseSizeMap: { [key in Size]: number } = {
    SIZE_35: 1,
    SIZE_36: 2,
    SIZE_37: 3,
    SIZE_38: 4,
    SIZE_39: 5,
    SIZE_40: 6,
    SIZE_41: 7,
    SIZE_42: 8,
    SIZE_43: 9,
    SIZE_44: 10,
    SIZE_45: 11,
    SIZE_46: 12,
  };

  const sizeLabels: { [key in Size]: number } = {
    SIZE_35: 35,
    SIZE_36: 36,
    SIZE_37: 37,
    SIZE_38: 38,
    SIZE_39: 39,
    SIZE_40: 40,
    SIZE_41: 41,
    SIZE_42: 42,
    SIZE_43: 43,
    SIZE_44: 44,
    SIZE_45: 45,
    SIZE_46: 46,
  };
  const sizeMap: { [key: number]: Size } = {
    1: Size.SIZE_35,
    2: Size.SIZE_36,
    3: Size.SIZE_37,
    4: Size.SIZE_38,
    5: Size.SIZE_39,
    6: Size.SIZE_40,
    7: Size.SIZE_41,
    8: Size.SIZE_42,
    9: Size.SIZE_43,
    10: Size.SIZE_44,
    11: Size.SIZE_45,
    12: Size.SIZE_46
  };

  const colorMap: { [key: number]: Color } = {
    1: Color.DEFAULT,
    2: Color.BLUE,
    3: Color.GREEN,
    4: Color.RED,
    5: Color.YELLOW
  };
  return (
    <TableRow className="border-b-0">
      <TableCell className="font-semibold w-1/12">
        <Input
          id="code"
          type="text"
          className="w-20 border-0 shadow-none"
          min={0}
          defaultValue={code.toString().padStart(2, "0")}
          readOnly
        />
      </TableCell>
      <Input
        id="color"
        name="color"
        type="hidden"
        value={editedVariant.color}
      />
      <TableCell className="w-1/5">
        <InputColor
          value={reverseColorMap[variant.color]}
          onChange={handleColorChange}
          isEditing={isEditing}
        />
      </TableCell>
      <Input
        id="size"
        name="size"
        type="hidden"
        value={reverseSizeMap[variant.size]}
      />
      <TableCell className="w-1/6">
        <Select value={String(reverseSizeMap[editedVariant.size])} onValueChange={handleSizeChange} disabled={!isEditing}>
          <SelectTrigger>
            <SelectValue placeholder={String(sizeLabels[variant.size])}/>
          </SelectTrigger>
          <SelectContent>
            {sizes.map((size) => (
              <SelectItem key={size.value} value={String(size.value)}>
                {size.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="w-1/6">
        <Input
          id="stock"
          name="stock"
          type="number"
          className="w-20"
          min={0}
          defaultValue={isEditing ? editedVariant.stock : variant.stock}
          onChange={handleChange}
          readOnly={!isEditing}
        />
      </TableCell>
      <TableCell className="w-1/4">
        {isEditing ? (
          <div className="flex gap-2">
            <Button onClick={handleSave}>Guardar</Button>
            <Button variant="destructive" onClick={handleDelete}>
              Borrar
            </Button>
          </div>
        ) : (
          <Button onClick={handleEdit}>Editar</Button>
        )}
      </TableCell>
    </TableRow>
  );
}