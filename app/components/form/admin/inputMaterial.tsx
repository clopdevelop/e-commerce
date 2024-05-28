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

const materiales = [
  {
    value: "tela",
    label: "Tela",
  },
  {
    value: "piel",
    label: "Piel",
  },
  {
    value: "plastico",
    label: "Plástico",
  },
  {
    value: "piel_piel",
    label: "Piel Piel",
  },
  {
    value: "joyeria",
    label: "Joyería",
  },
];

interface InputMaterialProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputMaterial: React.FC<InputMaterialProps> = ({ value: propValue, onChange }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(propValue || '');

  useEffect(() => {
    setValue(propValue || '');
  }, [propValue]);

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === value ? '' : currentValue;
    setValue(newValue);
    setOpen(false);
    if (onChange) {
      onChange({
        target: {
          value: newValue,
          name: 'material',
        },
      } as React.ChangeEvent<HTMLInputElement>); // Aquí creamos un nuevo evento de cambio
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[130px] justify-between"
        >
          {value
            ? materiales.find((material) => material.value === value)?.label
            : "Material"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar material..." />
          <CommandEmpty>Material no encontrado.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {materiales.map((material) => (
                <CommandItem
                  key={material.value}
                  value={material.value}
                  onSelect={handleSelect}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === material.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {material.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};