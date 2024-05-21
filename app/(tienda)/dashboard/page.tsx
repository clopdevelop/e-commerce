import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/data";
import Image from "next/image";

export default async function Home() {

  // const authentication = await auth();
  // //? Otra forma de manejar el acceso a rutas
  // // if (!authentication) {
  // //   redirect("/entrada");
  // // }

  const completeUser = await getUser();

  return (
    <>
      {completeUser ? (
        <>
          <Image src={''} alt='Foto de Perfil' width={100} height={100}></Image>
          <h1>Hola {completeUser.name}!</h1>
          <h2>Biografía: {completeUser.bio}</h2>
          <h2>en la plataforma desde hace: {completeUser.created_at?.toString()}</h2>
          <p className="text-xs">{JSON.stringify(completeUser)}</p>
        </>
      ) : (
        <>
          <h1 className="flex flex-col items-center justify-between">Hola usuario de Google</h1>
        </>
      )}
    </>
  );
}
