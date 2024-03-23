"use client";
// todo Investigar como mover la logica de validacion al action
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { userSchema } from "@/lib/definitions";

import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/lib/actionscommands";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const UserLogInFormSchema = userSchema.pick({
  email: true,
  password: true,
});

export function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  const form = useForm<z.infer<typeof UserLogInFormSchema>>({
    resolver: zodResolver(UserLogInFormSchema), // Asegúrate de habilitar esto
  });

  function onSubmit(values: z.infer<typeof UserLogInFormSchema>) {
    console.log(values); // Mostrar datos del formulario en la consola para depuración

    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      const value = values[key as keyof typeof values];
      if (value) {
        formData.append(key, value);
      }
    });

    dispatch(formData);
  };


  // Ajustar el componente de botón para manejar el envío
  function LoginButton() {
    const { isSubmitting } = form.formState;
    return (
      <Button type="submit" aria-disabled={isSubmitting}>
        Log in
      </Button>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Usuario@mail.com"
                    {...field}
                  />
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
        <Button type="submit">Submit</Button>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </form>
    </Form>
  );
}