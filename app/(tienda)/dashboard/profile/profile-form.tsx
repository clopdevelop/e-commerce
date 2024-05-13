"use client";
import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import { Textarea } from "@/components/shadcn/textarea";
import { User } from "@/lib/definitions";
import { Label } from "@/components/shadcn";
import { updateProfile } from "@/lib/actionscommands";

interface Props {
  user: User;
}

export function ProfileForm({user}:Props) {

  return (
      <form action={updateProfile} className="space-y-8">
        
        {/* todo solo permitir cambiar el username cada 30 días */}
              <div className="flex flex-col gap-3">
              <Label>Nombre de Usuario</Label>
               <Input 
                name="username"
                placeholder={user.username} 
                />
                <div className="text-muted-foreground text-sm">
                Este es tu nombre público que aparecerá en los comentarios y valoraciones de los productos.
                Podrás cambiar tu nombre cada 30 días.
                </div>
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
  );
}
