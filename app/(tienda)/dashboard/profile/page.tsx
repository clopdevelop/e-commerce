import { auth, getUser } from '@/auth';
import SettingForm from '@/components/form/SettingForm';
import {UserSettingsForm} from '@/components/form/UserSettingsForm'

export default async function Home() {
  const authentication = await auth()
  const user = String(authentication?.user?.email)
  const completeUser = await getUser(user);
  
  return (
    <>
      {completeUser ? (
        <>
          {/* <UserSettingsForm /> */}
          <SettingForm></SettingForm>
        </>
      ) : (
        <>
          <h2>Para configurar tus datos debes accerlo en tu cuenta de Google</h2>
        </>
      )}
    </>
  );
}
