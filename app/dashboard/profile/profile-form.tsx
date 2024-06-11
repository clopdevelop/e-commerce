"use client";
import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import { Textarea } from "@/components/shadcn/textarea";
import { Label } from "@/components/shadcn";
import { updateProfile } from "@/lib/actionscommands";
import { User } from "@prisma/client";
import { getUserLogged } from "@/lib/data";
import { useFormState } from "react-dom";
import { CheckCircle2, CircleAlert } from "lucide-react";

interface Props {
  user: User;
}

export function ProfileForm({ user }: Props) {
  const [state, formAction] = useFormState(updateProfile, undefined);

  return (
    <form action={formAction} className="space-y-8">
      <div className="flex flex-col gap-3">
        <Label>Nombre de Usuario</Label>
        <Input name="username" placeholder={user?.username ?? ""} />
        <p className="text-muted-foreground text-sm"></p>
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="bio">Biografía</Label>
        <Textarea
          name="bio"
          placeholder={user?.bio ?? "Cuéntanos un poco sobre ti"}
          className="resize-none"
        />
      </div>
      <div className="flex gap-6 items-center">
        <Button type="submit">Actualizar Perfil</Button>
        {state?.error == true && (
          <div className="flex" aria-live="polite" aria-atomic="true">
            <>
              <CircleAlert size={20} className="text-red-500 mr-2" />
              <p className="text-sm text-red-500">{state?.message}</p>
            </>
          </div>
        )}
        {state?.error == false && (
          <div className="flex mt-4" aria-live="polite" aria-atomic="true">
            <>
              <CheckCircle2 size={20} className="text-green-500 mr-2" />
              <p className="text-sm text-green-500">{state?.message}</p>
            </>
          </div>
        )}
      </div>
    </form>
  );
}
