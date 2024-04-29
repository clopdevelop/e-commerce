// @/app/examples/multi-select-form/page.tsx
"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FancyMultiSelect } from "@/components/admin/fancy-multi-select";
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
import { addProductTEST } from "@/lib/actionscommands";


export default function ExampleForm() {
  const form = useForm();

  async function onSubmit(values: any) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <main className="container mx-auto flex min-h-screen items-center justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="frameworks"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frameworks</FormLabel>
                <FormControl>
                  <FancyMultiSelect
                    onChange={(values) => {
                      field.onChange(values.map(({ value }) => value));
                    }}
                  />
                </FormControl>
                <FormDescription>All the frameworks you like.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </main>
  );
}