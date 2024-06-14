import {AdminPage} from "@/components/ui/AdminPage"
import { getUserLogged } from "@/lib/data"
import { redirect } from "next/navigation"

export default async function admin() {
  const user = await getUserLogged()
  if(user?.role!=='admin')
    redirect('/entrada')

    return (
        <AdminPage></AdminPage>
    )
}