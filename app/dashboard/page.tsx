import { auth } from "@/auth";
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
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
    <div className="w-full">
        <div className="flex items-center gap-3">
        {session && <AvatarUser value={user?.name || ""}></AvatarUser>}
        <h1 className="text-2xl font-bold">{user?.username}</h1>
        </div>
      <Separator className="my-4"></Separator>
    </div>
  );
}
