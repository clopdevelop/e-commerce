import { Button, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn";
import { getAddresByUserLog, saveAddress } from "@/lib/actionscommands";
import { CityAndProvinceSelector } from "./CityAndProvinceSelector";

export default async function DirForm() {
  const address = await getAddresByUserLog();

  return (
    <form action={saveAddress} className="grid gap-4">
      <div className="grid gap-6">
        <Label>Dirección</Label>
        <Input
          name="address"
          placeholder={address?.name ?? "C/, Avda, ctra ...."}
          type="text"
        />
        <div className="flex gap-2">
          <div className="flex items-center gap-2">
            nº
            <Input
              name="number"
              defaultValue={Number(address?.number) ?? 0}
              className="w-16"
              type="number"
            />
          </div>
          <Input placeholder={address?.letter ?? "Letra"} type="text" />
          <Select>
            <SelectTrigger className="w-28">
              <SelectValue placeholder={address?.staircase ?? "Escalera"}/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Izquierda</SelectItem>
              <SelectItem value="right">Derecha</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder={address?.block ?? "Bloque"} type="text" />
          <Input placeholder={address?.block ?? "C. P"} type="text" />
        </div>
        <CityAndProvinceSelector></CityAndProvinceSelector>
      </div>
      <Button className="w-32" type="submit">
        Actualizar cuenta
      </Button>
    </form>
  );
}
