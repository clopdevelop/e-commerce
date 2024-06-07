"use client";
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
import { saveAddress } from "@/lib/actionscommands";
import { CityAndProvinceSelector } from "./CityAndProvinceSelector";
import { Address } from "@prisma/client";
import { useFormStatus } from "react-dom";
import { useState } from "react";

export default function DirForm(addr: { address: any }) {
  const { address } = addr;
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");

  return (
    <form action={saveAddress} className="grid gap-4">
      <div className="grid gap-2">
        <Label>Dirección</Label>
        <Input
          name="address"
          placeholder={"C/, Avda, ctra ...."}
          defaultValue={address?.name}
          type="text"
        />
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center mt-2">
          <div className="flex items-center gap-2 ">
            <span>nº</span>
            <Input
              name="number"
              placeholder={"0"}
              defaultValue={address?.number}
              className="w-16"
              type="number"
            />
          </div>
          <Input
            name="letter"
            placeholder={"Letra"}
            defaultValue={address?.letter!}
            type="text"
          />
          <Select onValueChange={setSelectedValue}>
            <SelectTrigger className="w-full lg:w-auto">
              <SelectValue
                placeholder={"Escalera"}
                defaultValue={address?.staircase!}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Izquierda</SelectItem>
              <SelectItem value="right">Derecha</SelectItem>
            </SelectContent>
          </Select>
          <Input
            name="block"
            placeholder={"Bloque"}
            defaultValue={address?.block!}
            type="text"
          />
          <Input
            placeholder={"C. P"}
            defaultValue={address?.id_city!}
            type="text"
          />
        </div>
        <div className="lg:flex lg:gap-2 mt-1">
          <Input name="city" type="hidden" value={selectedCity}></Input>
          <Input name="province" type="hidden" value={selectedProvince}></Input>
          <CityAndProvinceSelector></CityAndProvinceSelector>
        </div>
      </div>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full lg:w-auto" disabled={pending} type="submit">
      Actualizar cuenta
    </Button>
  );
}
