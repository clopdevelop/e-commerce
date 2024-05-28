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
    label: "Rojo",
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
    <TableRow className="border-b-0">
      <TableCell className="font-semibold w-1/12">
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
      <Input
        id="color"
        name="color"
        type="hidden"
        defaultValue={
          isEditing
            ? colores[editedVariant.colorId - 1].label
            : colores[variant.colorId - 1].label
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
        defaultValue={
          isEditing
            ? size[editedVariant.sizeId - 1].label
            : size[variant.sizeId - 1].label
        }
      ></Input>
      <TableCell className="w-1/6">
        <Select onValueChange={handleChange}>
          <SelectTrigger>
            <SelectValue
              placeholder={
                isEditing
                  ? size[editedVariant.sizeId - 1].label
                  : size[variant.sizeId - 1].label
              }
            />
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
      <TableCell className="w-1/6">
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
      <TableCell className="w-1/4">
        {isEditing ? (
          <div className="flex gap-2">
            <Button onClick={handleSave}>Guardar</Button>
            <Button variant={"destructive"} onClick={handleDelete}>
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
