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

const provincias = [
  {
    value: "alava",
    label: "Álava",
  },
  {
    value: "albacete",
    label: "Albacete",
  },
  {
    value: "alicante",
    label: "Alicante",
  },
  {
    value: "almeria",
    label: "Almería",
  },
  {
    value: "asturias",
    label: "Asturias",
  },
  {
    value: "avila",
    label: "Ávila",
  },
  {
    value: "badajoz",
    label: "Badajoz",
  },
  {
    value: "barcelona",
    label: "Barcelona",
  },
  {
    value: "burgos",
    label: "Burgos",
  },
  {
    value: "caceres",
    label: "Cáceres",
  },
  {
    value: "cadiz",
    label: "Cádiz",
  },
  {
    value: "cantabria",
    label: "Cantabria",
  },
  {
    value: "castellon",
    label: "Castellón",
  },
  {
    value: "ceuta",
    label: "Ceuta",
  },
  {
    value: "ciudad_real",
    label: "Ciudad Real",
  },
  {
    value: "cordoba",
    label: "Córdoba",
  },
  {
    value: "cuenca",
    label: "Cuenca",
  },
  {
    value: "girona",
    label: "Girona",
  },
  {
    value: "granada",
    label: "Granada",
  },
  {
    value: "guadalajara",
    label: "Guadalajara",
  },
  {
    value: "guipuzcoa",
    label: "Guipúzcoa",
  },
  {
    value: "huelva",
    label: "Huelva",
  },
  {
    value: "huesca",
    label: "Huesca",
  },
  {
    value: "illes_balears",
    label: "Illes Balears",
  },
  {
    value: "jaen",
    label: "Jaén",
  },
  {
    value: "la_coruna",
    label: "La Coruña",
  },
  {
    value: "la_rioja",
    label: "La Rioja",
  },
  {
    value: "las_palmas",
    label: "Las Palmas",
  },
  {
    value: "leon",
    label: "León",
  },
  {
    value: "lleida",
    label: "Lleida",
  },
  {
    value: "lugo",
    label: "Lugo",
  },
  {
    value: "madrid",
    label: "Madrid",
  },
  {
    value: "malaga",
    label: "Málaga",
  },
  {
    value: "melilla",
    label: "Melilla",
  },
  {
    value: "murcia",
    label: "Murcia",
  },
  {
    value: "navarra",
    label: "Navarra",
  },
  {
    value: "ourense",
    label: "Ourense",
  },
  {
    value: "palencia",
    label: "Palencia",
  },
  {
    value: "pontevedra",
    label: "Pontevedra",
  },
  {
    value: "salamanca",
    label: "Salamanca",
  },
  {
    value: "segovia",
    label: "Segovia",
  },
  {
    value: "sevilla",
    label: "Sevilla",
  },
  {
    value: "soria",
    label: "Soria",
  },
  {
    value: "tarragona",
    label: "Tarragona",
  },
  {
    value: "tenerife",
    label: "Tenerife",
  },
  {
    value: "teruel",
    label: "Teruel",
  },
  {
    value: "toledo",
    label: "Toledo",
  },
  {
    value: "valencia",
    label: "Valencia",
  },
  {
    value: "valladolid",
    label: "Valladolid",
  },
  {
    value: "vizcaya",
    label: "Vizcaya",
  },
  {
    value: "zamora",
    label: "Zamora",
  },
  {
    value: "zaragoza",
    label: "Zaragoza",
  },
];

const ciudades = [
    {
      value: "madrid",
      label: "Madrid",
    },
    {
      value: "barcelona",
      label: "Barcelona",
    },
    {
      value: "valencia",
      label: "Valencia",
    },
    {
      value: "sevilla",
      label: "Sevilla",
    },
    {
      value: "zaragoza",
      label: "Zaragoza",
    },
    // ... y así sucesivamente para todas las ciudades
  ];

export function CityAndProvinceSelector() {
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [value1, setValue1] = React.useState("");
  const [value2, setValue2] = React.useState("");
  let disabled = (value1!=='') ? false : true;

  return (
    <div className="grid md:grid-cols-2 my-1 gap-4">
      <div>
        <Popover open={open1} onOpenChange={setOpen1}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open1}
              className="w-[200px] justify-between"
            >
              {value1
                ? provincias.find((provincia) => provincia.value === value1)
                    ?.label
                : "Provincia"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command label="City Selector">
              <CommandInput placeholder="Busca tu provincia..." />
              <CommandEmpty>No provincia found.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  {provincias.map((provincia) => (
                    <CommandItem
                      key={provincia.value}
                      value={provincia.value}
                      onSelect={(
                        currentValue: React.SetStateAction<string>
                      ) => {
                        setValue1(currentValue === value1 ? "" : currentValue);
                        setOpen1(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value1 === provincia.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {provincia.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div>
      <Popover open={open2} onOpenChange={setOpen2}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open2}
          className="w-[200px] justify-between"
          disabled={disabled}
        >
          {value2
            ? ciudades.find((ciudad) => ciudad.value === value2)?.label
            : "Ciudad"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command label="City Selector">
          <CommandInput placeholder="Busca tu ciudad..." />
          <CommandEmpty>No ciudad found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {ciudades.map((ciudad) => (
                <CommandItem
                  key={ciudad.value}
                  value={ciudad.value}
                  onSelect={(currentValue: React.SetStateAction<string>) => {
                    setValue2(currentValue === value2 ? "" : currentValue);
                    setOpen2(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value2 === ciudad.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {ciudad.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
      </div>
    </div>
  );
}
