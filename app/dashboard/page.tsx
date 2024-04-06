import { auth, getUser } from "@/auth";

// import {getServerSession} from 'next-auth' <-- obtener los datos de la sesion desde el servidor

export default async function Home() {
  // const session = await getServerSession()

  const authentication = await auth();
  console.log(authentication);
  const user = String(authentication?.user?.email);
  const completeUser = await getUser(user);
  console.log(completeUser);

  return (
    <>
      {completeUser ? (
        <>
          <h1>Hola {completeUser.first_name}</h1>
        </>
      ) : (
        <>
          <h1>Hola {authentication?.user?.name}</h1>
        </>
      )}
      <h1 className="flex flex-col items-center justify-between p-24">
            Esta es la página de tu perfil de usuario.
          </h1>
    </>
  );
}
