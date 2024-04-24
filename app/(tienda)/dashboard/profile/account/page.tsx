import { Separator } from "@/components/shadcn/separator";
import { AccountForm } from "./account-form";
import { auth } from "@/auth";
import { User } from "@/lib/definitions";

export default async function SettingsAccountPage() {
  const authentication = await auth()
  const user : User  = authentication?.user 

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Cuenta</h3>
        <p className="text-sm text-muted-foreground">
          Actualiza los datos de tu cuenta.
        </p>
      </div>
      <Separator />
      <AccountForm user={user}/>
    </div>
  );
}
