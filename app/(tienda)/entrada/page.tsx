import { LoginForm } from "@/components/form/LoginForm";
import Link from "next/link";
import { Button } from "@/components/shadcn";

export default function Home() {
  return (
    <>
      <div className="flex justify-center my-5">
        <div className="w-full max-w-sm rounded-xl border shadow">
          <header className="flex flex-col space-y-1.5 p-6">
            <h1 className="text-2xl font-semibold leading-none tracking-tight p-5 text-center">
              Iniciar Sesión
            </h1>
          </header>
          <LoginForm />
          <div className="text-center text-sm pb-5">
            ¿No tienes cuenta? {"     "}
            <Link href="/registro" className="underline">
              Regístrate
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
