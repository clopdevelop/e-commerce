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
import { useEffect, useState, ChangeEvent } from "react";
import { useFormStatus } from "react-dom";
import { ProductVariant } from "@prisma/client";

interface VariantRowProps {
  variant: ProductVariant;
  onEdit: (variant: ProductVariant) => void;
  onDelete: (id: number) => void;
}
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
const size = [
  {
    value: 1,
    label: "35",
  },
  {
    value: 2,
    label: "36",
  },
  {
    value: 3,
    label: "37",
  },
  {
    value: 4,
    label: "38",
  },
  {
    value: 5,
    label: "39",
  },
  {
    value: 6,
    label: "40",
  },
  {
    value: 7,
    label: "41",
  },
  {
    value: 8,
    label: "42",
  },
  {
    value: 9,
    label: "43",
  },
  {
    value: 10,
    label: "44",
  },
  {
    value: 11,
    label: "45",
  },
  {
    value: 12,
    label: "46",
  },
];
export function VariantRow({ variant, onEdit, onDelete }: VariantRowProps) {
  console.log(variant);
  const [isEditing, setIsEditing] = useState(false);
  const [editedVariant, setEditedVariant] = useState(variant);

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

  //   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //     setEditedVariant({
  //       ...editedVariant,
  //       [event.target.name]: event.target.value,
  //     });
  //   };
  const handleChange = (event: string) => {
    setEditedVariant({
      ...editedVariant,
    });
  };
  return (
    <>
      <TableRow className="border-b-0">
        <TableCell className="font-semibold w-1/5">
          <Input
            id="code"
            name="code"
            type="text"
            className="w-20 border-0 shadow-none"
            min={0}
            defaultValue={isEditing ? editedVariant.code : variant.code}
            readOnly={true}
          />
        </TableCell>
        <TableCell className="w-1/5">
          <Input
            id="stock"
            name="stock"
            type="number"
            className="w-20"
            min={0}
            defaultValue={isEditing ? editedVariant.stock : variant.stock}
            onChange={() => {
              handleChange;
            }}
          />
        </TableCell>
        <Input
          id="color"
          name="color"
          type="hidden"
          value={
            isEditing
              ? colores[editedVariant.colorId].label
              : colores[variant.colorId].label
          }
        ></Input>
        <TableCell className="w-1/5">
          <InputColor
            value={isEditing ? editedVariant.colorId : variant.colorId}
            onChange={() => {
              handleChange;
            }}
          ></InputColor>
        </TableCell>
        <Input
          id="size"
          name="size"
          type="hidden"
          value={
            isEditing
              ? size[editedVariant.sizeId].label
              : size[variant.sizeId].label
          }
        ></Input>
        <TableCell className="w-1/5">
          <Select onValueChange={handleChange}>
            <SelectTrigger>
              <SelectValue
                placeholder={
                  isEditing
                    ? size[editedVariant.sizeId].label
                    : size[variant.sizeId].label
                }
              />
            </SelectTrigger>
            <SelectContent>
              {/* Aquí van tus opciones de tamaño */}
            </SelectContent>
          </Select>
        </TableCell>
        <TableCell className="w-1/5">
          {isEditing ? (
            <>
              <Button  onClick={handleSave}>Guardar</Button>
              <Button variant={"destructive"} onClick={handleDelete}>Borrar</Button>
            </>
          ) : (
            <Button onClick={handleEdit}>Editar</Button>
          )}
        </TableCell>
      </TableRow>
    </>
  );
}
