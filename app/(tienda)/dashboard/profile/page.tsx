import { Separator } from "@/components/shadcn/separator";
import { ProfileForm } from "./profile-form";
import { auth } from "@/auth";
import { User } from "@/lib/definitions";
import { User as NextAuthUser } from 'next-auth';
import { convertNextAuthUserToMyUser } from '@/lib/utils';

export default async function SettingsProfilePage() {
  // todo averiguar si esto se guarda en caché
  const authentication = await auth()
  if(!authentication) 
    return null
  else{
    if(!authentication.user)
      return null
  }

  const nextAuthUser: NextAuthUser = authentication.user;
  const user : User  = convertNextAuthUserToMyUser(nextAuthUser);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Perfil</h3>
        <p className="text-sm text-muted-foreground">
          Este es tu perfil que podrán ver otros usuarios.
        </p>
      </div>
      <Separator />
      <ProfileForm user={user} />
    </div>
  );
}
