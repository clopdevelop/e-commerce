import { signIn } from "@/auth";
import { Button } from "../shadcn/button";
import {AtSign} from "lucide-react"

export function Google() {
  return (
    <>
      <form
        action={async () => {
          await signIn("google");
        }}
        className="text-center"
      >
        <Button className="mt-3 mb-3">
            <AtSign className="mr-2"></AtSign>
            Continuar con Google</Button>
      </form>
    </>
  );
}
