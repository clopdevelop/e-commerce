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
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  const form = useForm<z.infer<typeof UserLogInFormSchema>>({
    resolver: zodResolver(UserLogInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form action={dispatch} className="space-y-8 py-8">
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
  // return (
  //   <form action={dispatch} className="space-y-3">
  //     <h1 className={`mb-3 text-2xl`}>
  //       Please log in to continue.
  //     </h1>
  //     <div className="w-full">
  //       <div>
  //         <label
  //           className="mb-3 mt-5 block text-xs font-medium text-gray-900"
  //           htmlFor="email"
  //         >
  //           Email
  //         </label>
  //         <div className="relative">
  //           <input
  //             className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
  //             id="email"
  //             type="email"
  //             name="email"
  //             placeholder="Enter your email address"
  //             required
  //           />
  //         </div>
  //       </div>
  //       <div className="mt-4">
  //         <label
  //           className="mb-3 mt-5 block text-xs font-medium text-gray-900"
  //           htmlFor="password"
  //         >
  //           Password
  //         </label>
  //         <div className="relative">
  //           <input
  //             className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
  //             id="password"
  //             type="password"
  //             name="password"
  //             placeholder="Enter password"
  //             required
  //             minLength={6}
  //           />
  //         </div>
  //       </div>
  //       <LoginButton />
  //       <div
  //         className="flex h-8 items-end space-x-1"
  //         aria-live="polite"
  //         aria-atomic="true"
  //       >
  //         {errorMessage && (
  //           <>
  //             <p className="text-sm text-red-500">{errorMessage}</p>
  //           </>
  //         )}
  //       </div>
  //     </div>
  //   </form>
  // );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Log in 
    </Button>
  );
}