import { Separator } from "@/components/shadcn/separator";
import { ProfileForm } from "./profile-form";
import { auth } from "@/auth";
import { User } from "@/lib/definitions";
import { User as NextAuthUser } from 'next-auth';
import { convertNextAuthUserToMyUser } from '@/lib/utils';
import { getUserLogged } from "@/lib/data";


export default async function SettingsProfilePage() {
  
  const completeUser = await getUserLogged();
  
  if(!completeUser)
    return 0;

  return (
    <div className="space-y-6">
      <ProfileForm user={completeUser} />
    </div>
  );
}
