"use client";
// todo Investigar como mover la logica de validacion al action
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { userSchema } from "@/lib/schemas";

import { Button } from "@/components/shadcn/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/form";
import { Input } from "@/components/shadcn/input";
import { addUser } from "@/lib/actionscommands";

export const UserRegisterFormSchema = userSchema.pick({
  first_name: true,
  email: true,
  password: true,
  confirmPassword: true,
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas deben coincidir",
  path: ["confirmPassword"],
});

export function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserRegisterFormSchema>>({
    resolver: zodResolver(UserRegisterFormSchema),
    defaultValues: {
      first_name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof UserRegisterFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const formData = new FormData();
  
    Object.keys(values).forEach(key => {
      const value = values[key as keyof typeof values];
      if (value) {
        formData.append(key, value);
      }
    });

    addUser(formData)
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-8">
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>Nombre de Usuario</FormLabel>
                <FormControl>
                  <Input placeholder="Usuario" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Usuario@mail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>Repite la Contraseña</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
