import { auth } from "@/auth";
import { CityAndProvinceSelector } from "@/components/form/data-client/CityAndProvinceSelector";
import DirForm from "@/components/form/data-client/dirForm";
import { getAddresByUserLog } from '@/lib/data';

export default async function DirPage() {
  const address = await getAddresByUserLog();

  // const addresses = await getAddresByUserLog();
  // const address = addresses[0] ?? undefined
  return (
    <>
      <DirForm address={address} />
    </>
  );
}
