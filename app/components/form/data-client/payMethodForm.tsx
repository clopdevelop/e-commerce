import { Button, Input, Label } from "@/components/shadcn";
import { savePayMethod } from "@/lib/actionscommands";
import { getPaymentMethodsByUser } from "@/lib/data";
import { CreditCard, EuroIcon, Apple } from "lucide-react";

export async function PayMethodForm() {
  const payment = await getPaymentMethodsByUser();
  return (
    <form action={savePayMethod} className="w-full">
      <div className="grid gap-4">
        <div className="grid grid-cols-3 gap-4 my-2">
          <div>
            <Input type="radio" id="card" name="paymentMethod" value="card" />
            <Label
              htmlFor="card"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground"
            >
              <CreditCard className="mb-3"></CreditCard>
              Card
            </Label>
          </div>
          <div>
            <Input
              type="radio"
              id="paypal"
              name="paymentMethod"
              value="paypal"
            />
            <Label
              htmlFor="paypal"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground"
            >
              <EuroIcon className="mb-3 h-6 w-6" />
              Paypal
            </Label>
          </div>
          <div>
            <Input type="radio" id="apple" name="paymentMethod" value="apple" />
            <Label
              htmlFor="apple"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground"
            >
              <Apple className="mb-3 h-6 w-6" />
              Apple
            </Label>
          </div>
        </div>
        <Label htmlFor="cardHolderName">
          Nombre del Titular de la Tarjeta:
        </Label>
        <Input
          type="text"
          id="cardHolderName"
          name="cardHolderName"
          placeholder={
            payment[0]?.name ?? "Ingrese el nombre del titular de la tarjeta"
          }
          className="Input"
          required
        />
        <Label htmlFor="cardNumber">Número de Tarjeta:</Label>
        <Input
          type="text"
          id="cardNumber"
          name="cardNumber"
          placeholder="Ingrese el número de la tarjeta"
          className="Input"
          required
          minLength={16}
          maxLength={16}
        />
        <div className="grid grid-cols-3 gap-4 mt-2">
          <select id="month" name="month" className="Input">
            <option value="" disabled selected hidden>
              {payment?.expirationMonth ? payment.expirationMonth : "Mes"}
            </option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
          <select id="year" name="year" className="Input">
            <option value="" disabled selected hidden>
              Año
            </option>
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i} value={`${new Date().getFullYear() + i}`}>
                {new Date().getFullYear() + i}
              </option>
            ))}
          </select>
          <Input id="cvc" name="cvc" placeholder="CVC" className="Input" />
        </div>
        <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 mt-1">
          <input type="checkbox" id="mobile" name="mobile" />
          <Label htmlFor="mobile">Guardar información de Facturación</Label>
        </div>
      </div>
      <Button className="mt-5" type="submit">
        Actualizar cuenta
      </Button>
    </form>
  );
}
