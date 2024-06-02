"use client";
import { Button } from "@/components/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/dialog";
import { Input } from "@/components/shadcn/input";
import { Label } from "@/components/shadcn/label";
import { updatePass } from "@/lib/actionscommands";
import { CircleAlert } from "lucide-react";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";

export function ChangePassDialog() {
  const [state, formAction] = useFormState(updatePass, undefined);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="my-3">Cambiar contraseña</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle>Cambiar Contraseña</DialogTitle>
            <DialogDescription>
              Realiza el cambio en tu contraseña. Haz clic en Guardar cuando
              hayas terminado.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="actual" className="text-right">
                Contraseña actual
              </Label>
              <Input
                id="actual"
                name="actual-pass"
                type="password"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new_pass" className="text-right">
                Nueva Contraseña
              </Label>
              <Input
                id="new_pass"
                name="new-pass"
                type="password"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new_pass" className="text-right">
                Confirmar Contraseña
              </Label>
              <Input
                id="new_pass-repeat"
                name="new-pass-repeat"
                type="password"
                className="col-span-3"
              />
            </div>
            <div className="text-right text-sm">
              <Link href="/entrada" className="underline">
                {/* ¿Has olvidado la contraseña? */}
              </Link>
            </div>
          </div>
          {state?.error && (
            <div
              className="flex items-end"
              aria-live="polite"
              aria-atomic="true"
            >
              <>
                <CircleAlert size={20} className="text-red-500 mr-2" />
                <p className="text-sm text-red-500">{state?.message}</p>
              </>
            </div>

          )}
          <DialogFooter>
            <SubmitButton></SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="!bg-destructive" disabled={pending} type="submit">
      Aceptar
    </Button>
  );
}
