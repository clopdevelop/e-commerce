import { auth, getUser } from "@/auth";
import {FavProducts} from "@/components/products";
// import {Product} from '@/lib/definitions'

export default async function Home() {

  const authentication = await auth();
  const user = String(authentication?.user?.email);
  const completeUser = await getUser(user);
  // const favproducts : Product[] = []; 

  return (
    <>
      {completeUser ? (
        <>
          <h1>Hola {completeUser.name}</h1>
        </>
      ) : (
        <>
          <h1>Hola {authentication?.user?.name}</h1>
        </>
      )}
      <h1 className="flex flex-col items-center justify-between p-24">
            Esta es la página de tu perfil de usuario.
      </h1>
      {/* <FavProducts products={favproducts}></FavProducts>    */}
    </>
  );
}
