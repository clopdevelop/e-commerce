"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/shadcn/alert-dialog"
import { Button } from "../shadcn/button";
import { deleteProduct } from "@/lib/actionscommands";
import { useState } from "react";

export default function DeleteProduct(id_product: { id_product: number }) {

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div className={"relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground"}>Eliminar</div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Pulsa el botón rojo para eliminar el producto</AlertDialogTitle>
                    <AlertDialogDescription>
                        Eliminarás el producto permanentemente de la base de datos.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <form action={deleteProduct}>
                        <input type="hidden" name="id_product" value={id_product.id_product} />
                        <AlertDialogAction className="!bg-destructive">
                        <Button className="!bg-destructive" type="submit">Eliminar</Button>
                        </AlertDialogAction>
                    </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}