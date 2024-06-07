import { auth } from "@/auth";
import { CityAndProvinceSelector } from "@/components/form/data-client/CityAndProvinceSelector";
import DirForm from "@/components/form/data-client/dirForm";
import { Separator } from "@/components/shadcn";
import { getAddresByUserLog } from '@/lib/data';

export default async function DirPage() {
  const address = await getAddresByUserLog();

  // const addresses = await getAddresByUserLog();
  // const address = addresses[0] ?? undefined
  return (
    <>
    <div>
      <h3 className="text-lg font-medium">Dirección</h3>
      <p className="text-sm text-muted-foreground">
        Aquí puedes agregar una direción para recibir los productos.
      </p>
    </div>
    <Separator className="my-5" />
    <DirForm address={address} />
    </>
  );
}
