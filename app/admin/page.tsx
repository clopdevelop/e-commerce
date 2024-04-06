"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/lib/schemas"; 
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/form";
import { z } from "zod";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/shadcn/select";
import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";
import { useRef } from 'react'; // Importa useRef para manejar referencias a elementos del DOM

export default function AddProductForm() {
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
  });
  
  const imageInputRef = useRef(null); // Crea una referencia para el input de imagen

  const onSubmit = (values: z.infer<typeof productSchema>) => {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      const value = values[key as keyof typeof values];
      if (value) {
        formData.append(key, value.toString()); // Asegúrate de convertir todo a string para FormData
      }
    });

        // Añade la imagen al formData si el usuario seleccionó una
    // if (imageInputRef.current && imageInputRef.current.files[0]) {
    //     formData.append('image', imageInputRef.current.files[0]);
    //   }

    // Aquí iría la lógica para enviar los datos del formulario a tu backend/API
    console.log(formData);
  };

  // const onSubmit = (values: any) => {
  //   // Aquí va tu lógica para enviar el formulario a tu backend/API
  //   console.log(values);
  // };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-8">
        {/* Nombre del Producto */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del Producto</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Nombre del producto"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Descripción del Producto */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Descripción del producto"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Precio del Producto */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Precio</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Precio"  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Categoría del Producto - Suponiendo que las categorías son fijas para este ejemplo */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoría</FormLabel>
              <FormControl>
                <Select {...field}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Asumiendo que tienes una lista predefinida de categorías */}
                    <SelectItem value="1">Electrónica</SelectItem>
                    <SelectItem value="2">Libros</SelectItem>
                    <SelectItem value="3">Ropa</SelectItem>
                    {/* Añade más opciones de categorías aquí */}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo para subir imagen */}
        {/* <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem>
              <FormLabel>Imagen del Producto</FormLabel>
              <FormControl>
                {/* <Input
                  type="file"
                  ref={imageInputRef} // Usa la referencia aquí
                  accept="image/*" 
                /> */}
                {/* <Input
                  type="file"
                  accept="image/*" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} */}
        {/* />  */}

        {/* Marca del Producto - Suponiendo que las Marcas son fijas para este ejemplo */}
        <FormField
          control={form.control}
          name="marca"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Marca</FormLabel>
              <FormControl>
                <Select {...field}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una Marca" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Asumiendo que tienes una lista predefinida de Marcas */}
                    <SelectItem value="1">Mercedes</SelectItem>
                    <SelectItem value="2">BIC</SelectItem>
                    <SelectItem value="3">AUDI</SelectItem>
                    {/* Añade más opciones de Marcas aquí */}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Proveedor del Producto - Suponiendo que los Proveedores son fijas para este ejemplo */}
        <FormField
          control={form.control}
          name="provider"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Proveedor</FormLabel>
              <FormControl>
                <Select {...field}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una Proveedor" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Asumiendo que tienes una lista predefinida de Proveedors */}
                    <SelectItem value="elchino">elchino</SelectItem>
                    <SelectItem value="elmoro">elmoro</SelectItem>
                    <SelectItem value="elandaluz">elandaluz</SelectItem>
                    {/* Añade más opciones de Proveedors aquí */}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Añadir Producto</Button>
      </form>
    </Form>
  );
}
