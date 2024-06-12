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
  HeartIcon,
  PackageIcon,
  SettingsIcon,
} from "lucide-react";
import AvatarUser from "./avatarUser";
export default async function Home() {
  // const authentication = await auth();
  // //? Otra forma de manejar el acceso a rutas
  // // if (!authentication) {
  // //   redirect("/entrada");
  // // }

  const session = await auth();

  console.log(session)

  const user = await getUserByEmail(session?.user?.email);

  //{"id":"clwly2gxm0000hteqnutne391","name":"Usuario","username":null,"bio":null,"email":"usuario@gmail.com","emailVerified":null,"image":null,"role":"admin","phone":"1234567890","password":"usuario","id_address":null,"postcode":"12345","created_at":"2024-05-25T10:04:52.666Z","updatedAt":"2024-05-25T10:04:52.666Z"}
  return (
    <>
      <div className="w-full">
        <div className="flex items-center gap-3">
          {session && <AvatarUser value={user?.name || ""}></AvatarUser>}
          <h1 className="text-2xl font-bold">{user?.username}</h1>
        </div>
        <Separator className="mt-4 mb-6"></Separator>
        <div className="flex flex-col md:flex-row gap-4 items-center w-full">
          <Link
            href="/dashboard/fav"
            className="bg-white dark:bg-gray-950 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 md:p-12 py-8 md:py-16 flex flex-col md:flex-row items-center justify-center gap-4 w-full md:w-auto"
            prefetch={false}
          >
            <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3">
              <HeartIcon className="h-12 w-12 text-blue-500 dark:text-blue-400" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">
                Favoritos
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Accede a tus productos favoritos
              </p>
            </div>
          </Link>
          <Link
            href="/dashboard/orders"
            className="bg-white dark:bg-gray-950 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 md:p-12 py-8 md:py-16 flex flex-col md:flex-row items-center gap-4 w-full md:w-auto"
            prefetch={false}
          >
            <div className="bg-green-100 dark:bg-green-900 rounded-full p-3">
              <PackageIcon className="h-12 w-12 text-green-500 dark:text-green-400" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">
                Pedidos
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Revisa y rastrea tus pedidos
              </p>
            </div>
          </Link>
          <Link
            href="/dashboard/profile"
            className="bg-white dark:bg-gray-950 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 md:p-12 py-8 md:py-16 flex flex-col md:flex-row items-center gap-4 w-full md:w-auto"
            prefetch={false}
          >
            <div className="bg-yellow-100 dark:bg-yellow-900 rounded-full p-3">
              <SettingsIcon className="h-12 w-12 text-yellow-500 dark:text-yellow-400" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">
                Configuración
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Personaliza tu cuenta y preferencias
              </p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
