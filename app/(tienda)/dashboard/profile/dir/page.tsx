import { CityAndProvinceSelector } from "@/components/form/data-client/CityAndProvinceSelector";
import DirForm from "@/components/form/data-client/dirForm";
import { Button, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn";
import { getAddresByUserLog, saveAddress } from "@/lib/actionscommands";

export default async function DirPage() {

  
  return (
    <div>
      <DirForm></DirForm>
    </div>
  );
}