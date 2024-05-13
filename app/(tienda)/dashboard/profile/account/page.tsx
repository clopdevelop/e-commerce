import { Separator } from "@/components/shadcn/separator";
import { AccountForm } from "./account-form";
import { auth } from "@/auth";
import { User } from "@/lib/definitions";
import { User as NextAuthUser } from 'next-auth';
import { convertNextAuthUserToMyUser } from '../../../../lib/utils';

export default async function SettingsAccountPage() {

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
        <h3 className="text-lg font-medium">Cuenta</h3>
        <p className="text-sm text-muted-foreground">
          Actualiza los datos de tu cuenta.
        </p>
      </div>
      <Separator />
      <AccountForm />
    </div>
  );
}
