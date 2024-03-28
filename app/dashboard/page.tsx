import { auth, getUser } from '@/auth';

export default async function Home() {
  const authentication = await auth()
  console.log(authentication)
  const user = String(authentication?.user?.email)
  const completeUser = await getUser(user);
  console.log(completeUser);
  
  return (
    <>
      <h1>Has iniciado sesión</h1>
    </>
  );
}
