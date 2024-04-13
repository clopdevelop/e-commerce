'use client'

import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/shadcn/command";
import React from "react";
import { Button } from "@/components/shadcn/button";
import { AtSign, Heart, Package, Settings} from "lucide-react";
  

export function CommandMenu() {
    const [open, setOpen] = React.useState(false)
  
    return (
      <>
      <Button className="mb-10" onClick={() => setOpen(true)}>Abrir Menú de Comandos</Button> {/* Botón para abrir el diálogo */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        {/* <CommandInput placeholder="Type a command or search..." /> */}
        <CommandList>
          {/* <CommandEmpty>No results found.</CommandEmpty> */}
          <CommandGroup heading="Opciones">
            <a href="/dashboard">
            <CommandItem><AtSign className="mr-2"></AtSign>Principal</CommandItem>
            </a>
            
            <a href="/dashboard/fav"><CommandItem><Heart className="mr-2"></Heart>Favoritos</CommandItem></a>
            <a href="/dashboard/profile"><CommandItem><Settings className="mr-2"></Settings>Configuración</CommandItem></a>
            <a href="/dashboard/order"><CommandItem><Package className="mr-2"></Package>Ver Pedidos</CommandItem></a>

          </CommandGroup>
        </CommandList>
      </CommandDialog>
      </>
    )
  }
  