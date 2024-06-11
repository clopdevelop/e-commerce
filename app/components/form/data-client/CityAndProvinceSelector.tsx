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

const ciudadesPorProvincia: { [key: string]: string[] } = {
  Alava: ["Vitoria-Gasteiz", "Llodio", "Amurrio"],
  Albacete: ["Albacete", "Hellín", "Villarrobledo"],
  Alicante: ["Alicante", "Elche", "Torrevieja"],
  Almeria: ["Almería", "Roquetas de Mar", "El Ejido"],
  Asturias: ["Oviedo", "Gijón", "Avilés"],
  Avila: ["Ávila", "Arévalo", "El Tiemblo"],
  Barcelona: ["Barcelona", "Hospitalet de Llobregat", "Badalona"],
  Burgos: ["Burgos", "Miranda de Ebro", "Aranda de Duero"],
  Cadiz: ["Cádiz", "Jerez de la Frontera", "Algeciras"],
  Cantabria: ["Santander", "Torrelavega", "Camargo"],
  Castellon: ["Castellón de la Plana", "Villarreal", "Benicàssim"],
  Ciudad_real: ["Ciudad Real", "Puertollano", "Tomelloso"],
  Cordoba: ["Córdoba", "Lucena", "Puente Genil"],
  Cuenca: ["Cuenca", "Tarancón", "San Clemente"],
  Girona: ["Gerona", "Lloret de Mar", "Figueras"],
  Granada: ["Granada", "Motril", "Almuñécar"],
  Guadalajara: ["Guadalajara", "Azur", "Sigüenza"],
  Guipuzcoa: ["San Sebastián", "Irun", "Rentería"],
  Huelva: ["Huelva", "Isla Cristina", "Lepe"],
  Huesca: ["Huesca", "Monzón", "Fraga"],
  Islas_baleares: ["Palma de Mallorca", "Ibiza", "Manacor"],
  Jaen: ["Jaén", "Linares", "Úbeda"],
  La_coruna: ["La Coruña", "Santiago de Compostela", "Ferrol"],
  La_rioja: ["Logroño", "Calahorra", "Arnedo"],
  Las_palmas: ["Las Palmas de Gran Canaria", "Telde", "Santa Lucía de Tirajana"],
  Leon: ["León", "Ponferrada", "San Andrés del Rabanedo"],
  Lerida: ["Lérida", "Tárrega", "Balaguer"],
  Lugo: ["Lugo", "Villalba", "Monforte de Lemos"],
  Madrid: ["Madrid", "Móstoles", "Alcalá de Henares"],
  Malaga: ["Málaga", "Marbella", "Torremolinos"],
  Murcia: ["Murcia", "Cartagena", "Lorca"],
  Navarra: ["Pamplona", "Tudela", "Barañáin"],
  Ourense: ["Orense", "Pontevedra", "Vigo"],
  Palencia: ["Palencia", "Aguilar de Campoo", "Dueñas"],
  Pontevedra: ["Pontevedra", "Vigo", "Redondela"],
  Salamanca: ["Salamanca", "Béjar", "Ciudad Rodrigo"],
  Segovia: ["Segovia", "Cuéllar", "La Granja de San Ildefonso"],
  Sevilla: ["Sevilla", "Dos Hermanas", "Alcalá de Guadaíra"],
  Soria: ["Soria", "Almazán", "El Burgo de Osma"],
  Tarragona: ["Tarragona", "Reus", "El Vendrell"],
  Tenerife: ["Santa Cruz de Tenerife", "San Cristóbal de La Laguna", "Arona"],
  Teruel: ["Teruel", "Alcañiz", "Calamocha"],
  Toledo: ["Toledo", "Talavera de la Reina", "Illescas"],
  Valencia: ["Valencia", "Torrent", "Gandía"],
  Valladolid: ["Valladolid", "Medina del Campo", "Laguna de Duero"],
  Vizcaya: ["Bilbao", "Barakaldo", "Getxo"],
  Zamora: ["Zamora", "Benavente", "Toro"],
  Zaragoza: ["Zaragoza", "Calatayud", "Ejea de los Caballeros"]
};

export function CityAndProvinceSelector({
  onSelection,}: {
    onSelection: any;
  }) {
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [value1, setValue1] = React.useState("");
  const [value2, setValue2] = React.useState("");
  let disabled = value1 !== "" ? false : true;

  // Función para obtener ciudades según la provincia seleccionada
  const obtenerCiudadesPorProvincia = (provincia: string) => {
    return ciudadesPorProvincia[provincia] || [];
  };

  

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
                ? value1 // Mostrar el valor seleccionado directamente
                : "Provincia"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command label="Provincia Selector">
              <CommandInput placeholder="Busca tu provincia..." />
              <CommandEmpty>No provincia found.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  {Object.keys(ciudadesPorProvincia).map((provincia) => (
                    <CommandItem
                      key={provincia}
                      value={provincia}
                      onSelect={(currentValue) => {
                        setValue1(currentValue === value1 ? "" : currentValue);
                        setValue2(""); // Limpiar la ciudad seleccionada cuando cambia la provincia
                        setOpen1(false);
                        onSelection(currentValue === value1 ? "" : currentValue)
                      }}
                    >
                      {provincia}
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
                ? value2 // Mostrar el valor seleccionado directamente
                : "Ciudad"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command label="Ciudad Selector">
              <CommandInput placeholder="Busca tu ciudad..." />
              <CommandEmpty>No ciudad found.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  {obtenerCiudadesPorProvincia(value1).map((ciudad:string) => (
                    <CommandItem
                      key={ciudad}
                      value={ciudad}
                      onSelect={(currentValue) => {
                        setValue2(currentValue === value2 ? "" : currentValue);
                        setOpen2(false);
                        onSelection(value1,currentValue === value2 ? "" : currentValue)
                      }}
                    >
                      {ciudad}
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
