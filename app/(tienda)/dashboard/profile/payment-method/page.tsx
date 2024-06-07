import { PayMethodForm } from "@/components/form/data-client/payMethodForm";
import { Separator } from "@/components/shadcn";

export default function PaymentMethodPage() {
  return (
    <>
      <div>
        <h3 className="text-lg font-medium">Método de Pago</h3>
        <p className="text-sm text-muted-foreground">
          Aquí puedes guardar tus métodos de pago.
        </p>
      </div>
      <Separator className="my-5" />
      <PayMethodForm></PayMethodForm>
    </>
  );
}
