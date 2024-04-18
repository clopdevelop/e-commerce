import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/data";

export default async function Home() {

  const authentication = await auth();
  // ! Otra forma de manejar el acceso a rutas
  // if (!authentication) {
  //   redirect("/entrada");
  // }


  const user = String(authentication?.user?.email);
  const completeUser = await getUser(user);

  return (
    <>
      {completeUser ? (
        <>
          <h1 className="flex flex-col items-center justify-between p-24">Hola {completeUser.name}</h1>
          <p>{JSON.stringify(authentication?.user)}</p>
        </>
      ) : (
        <>
          <h1 className="flex flex-col items-center justify-between p-24">Hola {authentication?.user?.name}</h1>
        </>
      )}
    </>
  );
}
