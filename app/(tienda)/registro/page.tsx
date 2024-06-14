import { auth } from "@/auth";
import { RegisterForm } from "@/components/form/RegisterForm";
import { redirect } from "next/navigation";
export default async function Home() {
  const user = await auth()
  if (user){
    redirect('/catalogo')
  }
  return (
      <RegisterForm></RegisterForm>
  );
}
