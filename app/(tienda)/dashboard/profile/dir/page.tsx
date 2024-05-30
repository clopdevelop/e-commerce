import { auth } from "@/auth";
import { CityAndProvinceSelector } from "@/components/form/data-client/CityAndProvinceSelector";
import DirForm from "@/components/form/data-client/dirForm";
import { getAddresByUserLog } from "@/lib/actionscommands";

export default async function DirPage() {
  const address = await getAddresByUserLog();

  return (
    <>
      <DirForm address={address} />
    </>
  );
}
