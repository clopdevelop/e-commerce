"use client";
import { AddressForm } from "@/components/form/data-client/AddressForm";
import { CityAndProvinceSelector } from "@/components/form/data-client/CityAndProvinceSelector";
import { DeleteAddressForm } from "@/components/form/data-client/DeleteAddressForm";
import DirForm from "@/components/form/data-client/dirForm";
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
} from "@/components/shadcn";
import { useState } from "react";
import { DisplayAddress } from './DisplayAddress'
import { Address } from "@prisma/client";

const DirComponent = ({ addresses }:{addresses:(Address & { cityName: string; provinceName: string; })[]}) => {
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectValue, setSelectValue] = useState("");

  const handleAddressChange = (value) => {
    setSelectedAddressId(value);
    setSelectValue(value);
  };

  const handleReset = () => {
    setSelectedAddressId(null);
    setSelectValue("");
  };

  let placeholder = addresses
    ? "Direcciónes de envío"
    : "Aquí aparecerán tus direcciones de envío";
  if (addresses && addresses.length > 0) {
    placeholder = selectValue
      ? addresses.find((address) => address.id === Number(selectValue))?.name ||
        placeholder
      : placeholder;
  }

  return (
    <>
      <div>
        <h3 className="text-lg font-medium">Dirección</h3>
        <p className="text-sm text-muted-foreground">
          Aquí puedes agregar tus direcciones para recibir los productos.
        </p>
      </div>
      <Separator className="my-5" />
      <Select value={selectValue} onValueChange={handleAddressChange}>
        <SelectTrigger className="my-5 w-auto" aria-placeholder="">
          <SelectValue placeholder="Direcciones Guardadas" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="-1">
            <div className="max-w-200">Nueva Dirreción</div>
          </SelectItem>
          {addresses &&
            addresses.map((address, i) => (
              <div className="flex items-center" key={address?.id}>
                <SelectItem value={String(i + 1)}>
                  <div className="max-w-200">{address.name}</div>
                </SelectItem>
                <DeleteAddressForm id={address.id} />
              </div>
            ))}
        </SelectContent>
      </Select>
      {selectedAddressId && selectedAddressId !== "-1" ? (
        <>
          <DisplayAddress address={addresses[Number(selectedAddressId) - 1]}></DisplayAddress>
        </>
      ) : (
        <AddressForm
        type="config"
        // address={
        //   selectedAddressId
        //     ? addresses.find(
        //         (address) => address.id === Number(selectedAddressId)
        //       )
        //     : null
        // }
        ></AddressForm>
      )}
    </>
  );
};

export default DirComponent;

{
  /* <div className="flex items-center gap-4">
<Select value={selectValue} onValueChange={handleAddressChange}>
    <SelectTrigger className="my-5 w-auto" aria-placeholder="">
        <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
        {addresses &&
            addresses.map((address) => (
                <div className="flex items-center" key={address?.id}>
                    <SelectItem value={String(address?.id)}>
                        <div className="max-w-200">{address.name}</div>
                    </SelectItem>
                    <DeleteAddressForm id={address.id} />
                </div>
            ))}
    </SelectContent>
</Select>
<Button onClick={handleReset}>+</Button>
</div>
<AddressForm
type="config"
address={
    selectedAddressId
        ? addresses.find(address => address.id === Number(selectedAddressId))
        : null
}
/> */
}
