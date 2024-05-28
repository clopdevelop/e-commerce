import { auth } from "@/auth";
import { CityAndProvinceSelector } from "@/components/form/data-client/CityAndProvinceSelector";
import DirForm from "@/components/form/data-client/dirForm";
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn";
import { getAddresByUserLog, saveAddress } from "@/lib/actionscommands";

export default async function DirPage() {
  const session = await auth()
  let address
  if(session?.user?.email!=="cristianlogo6@gmail.com")
   address = await getAddresByUserLog();

  return (
    <>
      {address && <DirForm address={address} />}
      {!address && <DirForm />}
    </>
  );
}
