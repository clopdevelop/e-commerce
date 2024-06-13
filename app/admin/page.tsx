import {AdminPage} from "@/components/ui/AdminPage"
import { getUserLogged } from "@/lib/data"

export default async function admin() {
  const user = await getUserLogged()
  if(user?.role!=='admin')
    return null

    return (
        <AdminPage></AdminPage>
    )
}