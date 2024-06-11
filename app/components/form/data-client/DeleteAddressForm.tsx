'use client';

import { deleteAddress } from "@/lib/actionscommands";
import { useFormState, useFormStatus } from "react-dom";
import { XCircleIcon } from 'lucide-react'
import { Button } from "@/components/shadcn";

export function DeleteAddressForm({id}:{id:number}) {
  return (
     <form action={deleteAddress} className="cursor-pointer m-1">
      <input type="hidden" name="id" value={String(id)}></input>
      <SubmitButton></SubmitButton>
    </form>
  );
}


function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button variant='destructive' type="submit" disabled={pending}>
    <XCircleIcon/>
     </Button>
  );
}