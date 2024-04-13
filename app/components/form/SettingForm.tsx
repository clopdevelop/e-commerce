"use client"
import Link from "next/link";
import { CircleUser, Menu, Package2, Search } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { Checkbox } from "@/components/shadcn/checkbox";
import { Input } from "@/components/shadcn/input";
import { DialogDemo } from "./changePassDialog";

export default function SettingForm() {
  const [editingEmail, setEditingEmail] = useState(false); // Estado para controlar si se está editando el email

  const handleEmailChange = () => {
    editingEmail ? setEditingEmail(false) : setEditingEmail(true); // Al hacer clic en el botón "Cambiar Email", se establece editingEmail en true para mostrar el input
  };
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4  p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav
            className="grid gap-4 text-sm text-muted-foreground"
            x-chunk="dashboard-04-chunk-0"
          >
            <Link href="#" className="font-semibold text-primary">
              General
            </Link>
            <Link href="#">Dirección</Link>
            <Link href="#">Ayuda</Link>
            <Link href="#">Avanzado</Link>
          </nav>
          <div className="grid gap-6">
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>Correo electrónico</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent>
                {editingEmail ? ( // Si está editando el email, muestra el input
                  <Input placeholder="Nuevo correo electrónico" />
                ) : (
                  // Si no está editando el email, muestra el h2 con el correo electrónico actual
                  <h2 className="text-muted-foreground">usuario@gmail.com</h2>
                )}
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
              <Button onClick={handleEmailChange}>Cambiar Email</Button>
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>Cambia tu contraseña</CardTitle>
              </CardHeader>
              <CardContent>
                <DialogDemo></DialogDemo>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
