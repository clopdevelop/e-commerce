import { signIn } from "@/auth";
import { Separator } from "../shadcn/separator";
import { Button } from "../shadcn/button";

export function Google() {
  return (
    <>
      <form
        action={async () => {
          await signIn("google");
        }}
        className="text-center"
      >
        <Button className="mt-3 mb-3">Sign in with Google</Button>
      </form>
      <Separator className="mb-10 mt-10"></Separator>
    </>
  );
}
