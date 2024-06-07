import { Separator } from "@/components/shadcn/separator";
import { ProfileForm } from "./profile-form";
import { auth } from "@/auth";
import { User } from "@/lib/definitions";
import { User as NextAuthUser } from "next-auth";
import { convertNextAuthUserToMyUser } from "@/lib/utils";
import { getUserLogged } from "@/lib/data";

export default async function SettingsProfilePage() {
  const completeUser = await getUserLogged();

  if (!completeUser) return 0;

  return (
    <>
      <div>
        <h3 className="text-lg font-medium">Perfil</h3>
        <p className="text-sm text-muted-foreground">
          Este son los datos de tu perfil que podrán ver otros usuarios.
        </p>
      </div>
      <Separator className="my-5" />
      <ProfileForm user={completeUser} />
    </>
  );
}
