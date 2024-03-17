"use client";

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

const UserLogInFormSchema = userSchema.pick({
  first_name: true,
  email: true,
  password: true,
});


export default function LoginForm() {
  const form = useForm<z.infer<typeof UserLogInFormSchema>>({
    resolver: zodResolver(UserLogInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  function onSubmit(values: z.infer<typeof UserLogInFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    const formData = new FormData();
  
    Object.keys(values).forEach(key => {
      const value = values[key as keyof typeof values];
      if (value) {
        formData.append(key, value);
      }
    });

    dispatch(formData)
  }

  const [errorMessage, dispatch] = useFormState(authenticate, undefined);  

  function LoginButton() {
    const { pending } = useFormStatus();
  
    return (
      <Button aria-disabled={pending}>
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
        <LoginButton></LoginButton>
      </form>
    </Form>
  );
}
