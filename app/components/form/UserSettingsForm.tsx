"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { City, Province } from "@/lib/definitions";
import { userSchema } from "@/lib/schemas";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/form"; 
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";

import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";
import { useState, useEffect } from "react";

export function UserSettingsForm() {
  // todo añadir la carga de provincias y ciudades desde el dashboard (servidor) o hacer una llamada a una api desde el cliente?
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  const [selectedProvince, setSelectedProvince] = useState<string>();

  // Cargar provincias al montar el componente
  useEffect(() => {
    // Cargar provincias desde una API o fuente de datos
    // setCountries(data);
  }, []);
  

  // Cargar ciudades cuando se selecciona una provincia
  useEffect(() => {
    if (selectedProvince) {
      // Cargar ciudades para la provincia seleccionada
      // setCities(data);
    }
  }, [selectedProvince]);

  const form = useForm({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = (data: any) => {
    // Aquí iría la lógica para actualizar los datos del usuario
  };

  // Función para manejar el cambio en el selector de provincia
  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value);
    form.setValue("id_city", ""); // Asegúrate de ajustar al nombre correcto de tu campo
    // Aquí se podría cargar las ciudades para la nueva provincia
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-8">
        {/* Nombre */}
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Tu nombre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="usuario@mail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Teléfono (opcional) */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="Tu teléfono" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Código Postal (opcional) */}
        <FormField
          control={form.control}
          name="postcode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código Postal</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Tu código postal" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Ejemplo adaptado para el selector de país */}
        <FormField
          control={form.control}
          name="id_province" 
          render={({ field }) => (
            <FormItem>
              <FormLabel>Provincia</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una provincia" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {/* Itera sobre tus países aquí */}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Ejemplo adaptado para el selector de país */}
        <FormField
          control={form.control}
          name="id_city" 
          render={({ field }) => (
            <FormItem>
              <FormLabel>País</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una ciudad" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {/* Itera sobre tus países aquí */}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Actualizar</Button>
      </form>
    </Form>
  );
}
