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
  getAddresByUserLog,
  login,
  saveAddress,
  savePayMethod,
  updateUserEmail,
} from "@/lib/actionscommands";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";
import { CityAndProvinceSelector } from "@/components/form/data-client/CityAndProvinceSelector";
import { CreditCard, EuroIcon, Apple } from "lucide-react";

interface Props {
  user: User;
}

// export async function AccountForm({ user }: Props) {
export async function AccountForm() {

  const user = await login();

  return (
    <div className="space-y-8">
      <form action={updateUserEmail}>
        <Label>Email</Label>
        <Input name="email" placeholder={user?.email} />
        <div>Puedes modificar tu email</div>
        <Button type="submit">Cambiar</Button>
      </form>
      <div>
        <Label>Cambiar la contraseña</Label>
        <ChangePassDialog />
      </div>
      {/* todo no funciona el server action saveAddress */}
      
      
    </div>
  );
}
