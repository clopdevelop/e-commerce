'use client'
import { enviarEmail } from "@/lib/actionscommands";
import { Button, Input, Textarea } from "../shadcn";
import { useFormState, useFormStatus } from "react-dom";
import { CircleAlert, CheckCircle2 } from "lucide-react";


function ContactForm() {
  const [state, formAction] = useFormState(enviarEmail, undefined);
  return (
    <>
    <form className="grid grid-cols-1 gap-4" action={formAction}>
      <Textarea
        name="text"
        placeholder="Mensaje"
        rows={4}
        required
        className="block w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"
      ></Textarea>
      <SubmitButton></SubmitButton>
      
    </form>
    {state?.error == true && (
      <div
        className="flex"
        aria-live="polite"
        aria-atomic="true"
      >
        <>
          <CircleAlert size={20} className="text-red-500 mr-2" />
          <p className="text-sm text-red-500">{state?.message}</p>
        </>
      </div>
    )}
    {state?.error == false && (
      <div
        className="flex mt-4"
        aria-live="polite"
        aria-atomic="true"
      >
        <>
          <CheckCircle2 size={20} className="text-green-500 mr-2" />
          <p className="text-sm text-green-500">{state?.message}</p>
        </>
      </div>
    )}
    </>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
    type="submit"
    disabled={pending}
    className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-colors"
  >
    Enviar
  </Button>
  );
}

export default ContactForm;


