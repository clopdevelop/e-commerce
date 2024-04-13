"use client"
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/shadcn/card";
import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";
import React, { useState } from "react";

export default function Component() {
    const [editingEmail, setEditingEmail] = useState(false); // Estado para controlar si se está editando el email

    const handleEmailChange = () => {
      editingEmail ? setEditingEmail(false) : setEditingEmail(true); // Al hacer clic en el botón "Cambiar Email", se establece editingEmail en true para mostrar el input
    };
  return (
    <Card x-chunk="dashboard-04-chunk-1">
      <CardHeader>
        <CardTitle>Correo electrónico</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        {editingEmail ? (
          <Input placeholder="Nuevo correo electrónico" />
        ) : (
          <h2 className="text-muted-foreground">usuario@gmail.com</h2>
        )}
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        {editingEmail ? (
          <>
            <Button
              variant={"secondary"}
              className="mr-4"
              onClick={handleEmailChange}
            >
              Guardar cambios
            </Button>
            <Button variant={"destructive"} onClick={handleEmailChange}>
              Cancelar
            </Button>
          </>
        ) : (
          <Button onClick={handleEmailChange}>Editar</Button>
        )}
      </CardFooter>
    </Card>
  );
}
