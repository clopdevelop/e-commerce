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
  } from "@/components/ui/command";
import React from "react";
import { Button } from "@/components/ui/button";
  

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
            <CommandItem>Principal</CommandItem>
            </a>
            <a href="/dashboard/profile"><CommandItem>Configuración</CommandItem></a>
            <a href="/dashboard/order"><CommandItem>Ver Pedidos</CommandItem></a>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
      </>
    )
  }
  