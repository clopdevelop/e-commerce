"use client";
import {
  Input,
  Select,
  Label,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  Form,
  FormMessage,
  Button,
  Checkbox,
} from "@/components/shadcn";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { addressFormschema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CityAndProvinceSelector } from "./CityAndProvinceSelector";

type AddressFormInputs = z.infer<typeof addressFormschema>;

interface AddressFormProps {
  onSubmitForm: (values: AddressFormInputs) => void;
}

export const AddressForm: React.FC<AddressFormProps> = ({ onSubmitForm }) => {
  const [deliveryType, setDeliveryType] = useState("");

  const form = useForm<AddressFormInputs>({
    resolver: zodResolver(addressFormschema),
  });
  const { control, handleSubmit } = form;

  function onSubmit(values: AddressFormInputs) {
    console.log(values);
    onSubmitForm(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-5">
          <div className="w-full">
            <div className="grid gap-4 mb-5">
              <div className="font-semibold">Información de Envío</div>

              <FormField
                control={control}
                name="address"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Dirección</FormLabel>
                    <FormControl>
                      <Input placeholder="C/, Avda, ctra ...." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-4">
                <FormField
                  control={control}
                  name="number"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>Número</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="letter"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>Letra</FormLabel>
                      <FormControl>
                        <Input placeholder="Letra" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="staircase"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>Escalera</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="block"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>Bloque</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-4 items-center">
                <CityAndProvinceSelector />
                <FormField
                  control={control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>C. P</FormLabel>
                      <FormControl>
                        <Input
                          className="w-2/12"
                          placeholder="C. P"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={control}
              name="save"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 mb-5">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Guardar la información de envío</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <div className="grid gap-5 mt-12">
              <Label htmlFor="shippingMethod">
                Selecciona tu método de envío:
              </Label>
              <FormField
                control={control}
                name="shippingMethod"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setDeliveryType(value);
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Elige un método" />
                    </SelectTrigger>
                    <SelectContent className="bg-white rounded-md shadow-md">
                      <SelectItem value="standard">
                        Envío Estándar (3-5 días hábiles)
                      </SelectItem>
                      <SelectItem value="express">
                        Envío Exprés (1-2 días hábiles)
                      </SelectItem>
                      <SelectItem value="premium">
                        Envío Premium (Entrega prioritaria)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-5">
          <Button type="submit" size="sm">
            Siguiente
          </Button>
        </div>
      </form>
    </Form>
  );
};
