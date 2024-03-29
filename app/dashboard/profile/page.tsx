import { auth, getUser } from '@/auth';
import {UserSettingsForm} from '@/components/UserSettingsForm'

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
          <UserSettingsForm />
        </>
      ) : (
        <>
          <h2>Para configurar tus datos debes accerlo en tu cuenta de Google</h2>
        </>
      )}
    </>
  );
}
