import DirComponent from "@/components/form/data-client/AddressComponent";
import { getAddresByUserLog } from "@/lib/data";

export default async function DirPage() {
  const addresses = await getAddresByUserLog();

  return (
      <DirComponent addresses={addresses} />
  );
}
