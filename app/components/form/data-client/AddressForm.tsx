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
import { SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addressFormschema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { boolean, z } from "zod";
import { CityAndProvinceSelector } from "./CityAndProvinceSelector";
import { useRouter } from "next/navigation";
import { Address } from "@prisma/client";
import { createAddress } from "@/lib/actionscommands";
import { saveAddressLocalStorage } from "@/lib/localStorage";
import { saveAddressSessionStorage } from "@/lib/sessionStorage";
type AddressFormInputs = z.infer<typeof addressFormschema>;
interface AddressFormProps {
  address?: Address | null;
  onSubmitForm?: (values: AddressFormInputs) => void;
  type?: string;
}

export const AddressForm: React.FC<AddressFormProps> = ({
  onSubmitForm,
  address,
  type,
}) => {
  const form = useForm<AddressFormInputs>({
    defaultValues: {
      save: false // Valor por defecto para el campo 'save'
    },
    resolver: zodResolver(addressFormschema),
  });

  const { control, handleSubmit, setValue, reset } = form;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (address) {
      reset({
        id: String(address.id),
        address: address.name,
        number: String(address.number),
        letter: address.letter ? String(address.letter) : "",
        staircase: address.staircase as "izquierda" | "derecha" | undefined,
        block: address.block ? String(address.block) : "",
        postalCode: String(address.postalcode),
      });
    } else {
      reset({
        id: "",
        address: "",
        number: "",
        // letter:'',
        // staircase: '' as "izquierda" | "derecha" | undefined,
        // block: '',
        postalCode: "",
      });
    }

    // Luego, resetea el formulario con los nuevos valores predeterminados
  }, [address, setValue, reset]);

  async function onSubmit(values: AddressFormInputs) {
    setError(false)
    setCompleted(false)
    setIsSubmitting(true);
    try {
      console.log(values.save)
      console.log(typeof(values.save))
      if (typeof(values.save) === "boolean")
        if (values.save === true) {
          await createAddress(values);
        } else {
          console.log('a')
          saveAddressSessionStorage(values);
        }
      console.log(values);
      if (onSubmitForm) onSubmitForm(values);
      else await createAddress(values);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setIsSubmitting(false);
      setCompleted(true);
    }
  }

  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");

  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    setValue("province", province);
  }, [province, setValue]);

  useEffect(() => {
    setValue("city", city);
  }, [city, setValue]);

  useEffect(() => {
    console.log(address?.id);
    setValue("id", address?.id ? "" : "0");
      setValue('save', false);
  }, [address?.id , setValue]);

  const handleCity = (province: string, city: string) => {
    setProvince(province);
    setCity(city);
    console.log(province, city);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="hidden" value={address?.id ?? 0}></Input>
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex gap-5">
          <div className="w-full">
            <div className="grid gap-4 mb-5">
              {!type && (
                <div className="font-semibold">Información de Envío</div>
              )}
              <FormField
                control={control}
                name="address"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Dirección</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="C/, Avda, ctra ...."
                        {...field}
                        defaultValue={address?.name}
                        readOnly={!!address?.name}
                      />
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
                        <Input
                          type="number"
                          {...field}
                          min={1}
                          defaultValue={address?.number}
                          readOnly={!!address?.number}
                        />
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
                        <Input
                          {...field}
                          placeholder="Letra"
                          defaultValue={address ? address?.letter : ""}
                          readOnly={!!address?.name}
                        />
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
                        <Input
                          {...field}
                          type="text"
                          defaultValue={
                            address ? (address?.staircase ? "esca" : "") : ""
                          }
                          readOnly={!!address?.name}
                        />
                        {/* <Select onValueChange={setSelectedValue}>
                          <SelectTrigger className="w-full lg:w-auto">
                            <SelectValue
                              placeholder={"Escalera"}
                              // value={address?.staircase!}
                              defaultValue=''
                                                    readOnly={!!address?.name}

                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="izquierda">Izquierda</SelectItem>
                            defaultValue=''
                                                  readOnly={!!address?.name}

                            <SelectItem value="derecha">Derecha</SelectItem>
                            defaultValue=''
                                                  readOnly={!!address?.name}

                          </SelectContent>
                        </Select> */}
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
                        <Input
                          {...field}
                          type="number"
                          min={1}
                          defaultValue={address?.block ? address?.block : ""}
                          readOnly={!!address?.name}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-4 items-center">
                <div>
                  <CityAndProvinceSelector onSelection={handleCity} />
                  <FormField
                    control={control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormControl>
                          <Input type="hidden" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="province"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormControl>
                          <Input type="hidden" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem className="grid gap-1 pt-2 pb-8">
                      <FormLabel>Código Postal</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-6/12"
                          placeholder="C. P "
                          defaultValue={address?.postalcode}
                          readOnly={!!address?.name}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {!type && !address && (
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
            )}

            <div className="flex justify-end gap-4 items-center">
              {error && <div className="text-red-500">Se produjo un Error</div>}
              {completed && (
                <div className="text-green-500">
                  Completado satisfactoriamente
                </div>
              )}
              <div>
                {isSubmitting ? (
                  <Button
                    type="button"
                    className="inline-flex items-center  transition ease-in-out duration-150 cursor-not-allowed"
                    disabled
                  >
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </Button>
                ) : (
                  !address && (
                    <Button type="submit" className="mb-6 sm:mb-0">
                      {!type && "Guardar"}
                      {type === "config" && "Añadir"}
                    </Button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
