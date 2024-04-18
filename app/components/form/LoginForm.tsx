"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UserLogInFormSchema, userSchema } from "@/lib/schemas";

import { Button } from "@/components/shadcn/button";
import { useEffect } from "react";

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
import { Separator } from "../shadcn/separator";
import { CircleAlert, ArrowRight } from 'lucide-react'
import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import { authenticate } from "@/lib/actionscommands";
import clsx from "clsx";
import { Label } from "../shadcn/label";

export function LoginForm() {
  const [state, dispatch] = useFormState(authenticate, undefined);

  useEffect(() => {
    if (state === 'Success') {
      // redireccionar
      // router.replace('/');
      window.location.replace('/');
    }

  }, [state]);

  // const form = useForm<z.infer<typeof UserLogInFormSchema>>({
  //   resolver: zodResolver(UserLogInFormSchema),
  // });

  return (
    <>
      <div className="w-full max-w-sm rounded-xl border shadow">
        <header className="flex flex-col space-y-1.5 p-6">
          <h1 className="text-2xl font-semibold leading-none tracking-tight p-5 text-center">
            Iniciar Sesión
          </h1>
        </header>
        <Google></Google>
        <form action={dispatch} className="grid gap-6 p-6 pt-0">
          <Separator className="my-5"></Separator>
          <div className="grid gap-3">
            <div>
              <Label htmlFor="email">Correo electrónico</Label>
            </div>
            <div>
              <Input
                type="email"
                name="email"
                placeholder="Usuario@mail.com"
              />
            </div>
          </div>
          <div className="grid gap-3">
            <div className="flex justify-between">
              <Label htmlFor="email">Contraseña</Label>
              <Link
                href="#"
                className="ml-auto inline-block text-sm underline"
              >
                ¿Has olvidado tu contraseña?
              </Link>
            </div>
            <div>
              <Input
                type="password"
                name="password"
              />
            </div>
          </div>
          {state === "CredentialsSignin" && (
            <div
              className="flex items-end"
              aria-live="polite"
              aria-atomic="true"
            >
              <>
                <CircleAlert size={20} className="text-red-500 mr-2" />
                <p className="text-sm text-red-500">Credenciales no son correctas</p>
              </>
            </div>

          )}
          <LoginButton />
          <div className="text-center text-sm">
            ¿No tienes cuenta? {"     "}
            <Link href="/registro" className="underline">
              Regístrate
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="w-full bg-primary"
      disabled={pending}
    >
      Ingresar
    </Button>
  );
}
// // className={clsx({
//   "bg-primary": !pending,
//   "bg-muted": pending
// }) + 'w-full'}