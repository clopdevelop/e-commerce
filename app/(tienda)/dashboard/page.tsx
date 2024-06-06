import { auth } from "../../auth";
import { redirect } from "next/navigation";
import { getUserByEmail } from "@/lib/data";
import Image from "next/image";
import { Separator } from "@/components/shadcn";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/shadcn/avatar";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/card";
import {
  GithubIcon,
  TwitterIcon,
  MapPinIcon,
  LinkedinIcon,
} from "lucide-react";
import AvatarUser from "./avatarUser";
export default async function Home() {
  // const authentication = await auth();
  // //? Otra forma de manejar el acceso a rutas
  // // if (!authentication) {
  // //   redirect("/entrada");
  // // }

  const session = await auth();

  const user = await getUserByEmail(session?.user?.email);

  //{"id":"clwly2gxm0000hteqnutne391","name":"Usuario","username":null,"bio":null,"email":"usuario@gmail.com","emailVerified":null,"image":null,"role":"admin","phone":"1234567890","password":"usuario","id_address":null,"postcode":"12345","created_at":"2024-05-25T10:04:52.666Z","updatedAt":"2024-05-25T10:04:52.666Z"}
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold">Tu Perfil</h1>
      <Separator className="my-4"></Separator>
      {/* {user ? (
        <>
          <Image src={""} alt="Foto de Perfil" width={100} height={100}></Image>
          <h1>Hola {user.name}!</h1>
          <h2>Biografía: {user.bio}</h2>
          <h2>en la plataforma desde hace: {user.created_at?.toString()}</h2>
          <p className="text-xs">{JSON.stringify(user)}</p>
        </>
      ) : (
        <>
          <h1 className="flex flex-col items-center justify-between">
            Hola usuario de Google {user}
          </h1>
        </>
      )} */}
      <div className="grid gap-12 grid-cols-2">
        <div className="grid md:grid-cols-[150px_1fr] gap-6">
          <div className="flex items-center justify-center">
         <AvatarUser value={user?.name || ''}></AvatarUser>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-1">
              <h1 className="text-2xl font-bold">{user?.username}</h1>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <MapPinIcon className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
            <div className="flex items-center gap-4">

            </div>
          </div>
        </div>
        <div className="grid gap-4">
          
          <div className="text-gray-500 dark:text-gray-400 leading-relaxed">
          {/* BEST SELLER */}
          </div>
        </div>
      </div>
    </div>
  );
}
