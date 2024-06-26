import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import {
  Checkbox,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Label,
  RadioGroup,
  RadioGroupItem,
} from "@/components/shadcn";
import { ChangePassDialog } from "@/components/client/changePassDialog";
import { User } from "@/lib/definitions";
import {
  saveAddress,
  savePayMethod,
  updateUserEmail,
} from "@/lib/actionscommands";
import * as React from "react";
import { Separator } from "@/components/shadcn/separator";
import { getUserLogged } from "@/lib/data";

export async function AccountForm() {
  const user = await getUserLogged();

  return (
    <>
      {/* <form action={updateUserEmail}>
        <Label>Email</Label>
        <Input name="email" placeholder={user?.email} />
        <p className="text-sm text-muted-foreground py-2">
          Aquí puedes cambiar tu email
        </p>
        <Button type="submit">Cambiar email</Button>
      </form> */}
      <div className="flex gap-4 items-center">
        <ChangePassDialog />
      </div>
    </>
  );
}
