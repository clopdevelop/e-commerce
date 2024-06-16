"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/shadcn/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/shadcn/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover";
import { useEffect, useState } from "react";

const colores = [
  {
    value: 1,
    label: "Por defecto",
  },
  {
    value: 2,
    label: "Azul",
  },
  {
    value: 3,
    label: "Verde",
  },
  {
    value: 4,
    label: "Rojo",
  },
  {
    value: 5,
    label: "Amarillo",
  },
];

interface InputColorProps {
  value?: number;
  onChange?: (value: number) => void;
  isEditing: boolean;
}


export const InputColor: React.FC<InputColorProps> = ({ value: propValue, onChange,isEditing }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(propValue);

  useEffect(() => {
    setValue(propValue);
  }, [propValue]);

  const handleSelect = (currentValue: number) => {
    const newValue = currentValue === value ? 0 : currentValue;
    if (newValue === 0) return;  // Ajuste aquí
    setValue(newValue);
    setOpen(false);
    if (onChange) {
      onChange(newValue);  // Llamar onChange con el número
    }
  };


  return (
    <Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className="w-full justify-between"
        disabled={!isEditing} // Deshabilitar el botón si no está en modo edición
      >
        {value
          ? colores.find((color) => color.value === value)?.label
          : "Color"}
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-[200px] p-0">
      <Command>
        <CommandInput placeholder="Buscar color..." />
        <CommandEmpty>Color no encontrado.</CommandEmpty>
        <CommandList>
          <CommandGroup>
            {colores.map((color) => (
              <CommandItem
                key={color.value}
                value={color.label}
                onSelect={() => handleSelect(color.value)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === color.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {color.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
  );
}
