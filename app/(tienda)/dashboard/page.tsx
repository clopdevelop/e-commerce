import { auth, getUser } from "@/auth";

export default async function Home() {

  const authentication = await auth();
  const user = String(authentication?.user?.email);
  const completeUser = await getUser(user);

  return (
    <>
      {completeUser ? (
        <>
          <h1 className="flex flex-col items-center justify-between p-24">Hola {completeUser.name}</h1>
        </>
      ) : (
        <>
          <h1 className="flex flex-col items-center justify-between p-24">Hola {authentication?.user?.name}</h1>
        </>
      )}
    </>
  );
}
