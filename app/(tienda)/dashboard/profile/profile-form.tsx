"use client";
import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import { Textarea } from "@/components/shadcn/textarea";
import { Label } from "@/components/shadcn";
import { updateProfile } from "@/lib/actionscommands";
import { User } from "@prisma/client";
import { Separator } from "@/components/shadcn/separator";

interface Props {
  user: User;
}

export function ProfileForm({ user }: Props) {
  return (
    <>
      <div>
        <h3 className="text-lg font-medium">Perfil</h3>
        <p className="text-sm text-muted-foreground">
          Este son los datos de tu perfil que podrán ver otros usuarios.
        </p>
      </div>
      <Separator />
      <form action={updateProfile} className="space-y-8">
        {/* todo solo permitir cambiar el username cada 30 días */}
        <div className="flex flex-col gap-3">
          <Label>Nombre de Usuario</Label>
          <Input name="username" placeholder={user?.username ?? ""} />
          <p className="text-muted-foreground text-sm">
            Este es tu nombre público que aparecerá en los comentarios y
            valoraciones de los productos. Podrás cambiar tu nombre cada 30
            días.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="bio">Biografía</Label>
          <Textarea
            name="bio"
            placeholder={user.bio ?? "Cuéntanos un poco sobre ti"}
            className="resize-none"
          />
        </div>
        <Button type="submit">Actualizar Perfil</Button>
      </form>
    </>
  );
}
