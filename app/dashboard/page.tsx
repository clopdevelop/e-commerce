import { auth } from '@/auth';


export default async function Home() {
  const user = await auth()
  console.log(user)
  

  return (
    <>
      <h1>Has iniciado sesión</h1>
    </>
  );
}
