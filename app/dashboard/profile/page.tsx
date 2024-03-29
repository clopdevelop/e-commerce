import { auth, getUser } from '@/auth';
import {UserSettingsForm} from '@/components/UserSettingsForm'
import { Button } from '@/components/ui/button';

export default async function Home() {
  const authentication = await auth()
  console.log(authentication)
  const user = String(authentication?.user?.email)
  const completeUser = await getUser(user);
  console.log(completeUser);
  
  return (
    <>
      {completeUser ? (
        <>
          {/* Si completeUser existe, muestra esto */}
          <h1>Hola {completeUser.first_name}</h1>
          <UserSettingsForm />
        </>
      ) : (
        <>
          {/* Si completeUser no existe, muestra el saludo de autenticación o "Invitado" */}
          <h1>Hola {authentication?.user?.name}</h1>
          <h2>Para configurar tus datos debes accerlo en tu cuenta de Google</h2>
        </>
      )}
    </>
  );
}
