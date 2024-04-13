"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UserLogInFormSchema, userSchema } from "@/lib/schemas";

import { Button } from "@/components/shadcn/button";
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
} from "@/components/shadcn/form";
import { Input } from "@/components/shadcn/input";
import { Google } from "./SignInGoogle";
import Link from "next/link";
import { Separator } from "../shadcn/separator";

export function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  const form = useForm<z.infer<typeof UserLogInFormSchema>>({
    resolver: zodResolver(UserLogInFormSchema),
  });

  function onSubmit(values: z.infer<typeof UserLogInFormSchema>) {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      const value = values[key as keyof typeof values];
      if (value) {
        formData.append(key, value);
      }
    });

    dispatch(formData);
  }

  return (
    <>
      <div className="w-full max-w-sm rounded-xl border shadow">
        <header className="flex flex-col space-y-1.5 p-6">
          <h1 className="text-2xl font-semibold leading-none tracking-tight p-5 text-center">
            Iniciar Sesión
          </h1>
        </header>
        <Google></Google>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-6 p-6 pt-0"
          >
            <Separator className="my-5"></Separator>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <>
                  <FormItem className="grid gap-2">
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
                  <FormItem className="grid gap-2">
                    <FormLabel className="flex justify-between">
                      Contraseña{" "}
                      <Link
                        href="#"
                        className="ml-auto inline-block text-sm underline"
                      >
                        ¿Has olvidado tu contraseña?
                      </Link>
                    </FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
            <Button className="w-full" type="submit">
              Entrar
            </Button>
            <div className="text-center text-sm">
              ¿No tienes cuenta? {"     "}
              <Link href="/registro" className="underline">
                Regístrate
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
