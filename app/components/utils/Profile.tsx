import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/shadcn/menubar";
import { signOut } from "@/auth";
import Link from "next/link";
import { Button } from "../shadcn/button";
import AvatarNameUser from "./AvatarNameUser";
import { getUserLogged  } from '@/lib/data'

async function Profile() {
  //todo no funciona con google auth a

  const user = await getUserLogged() 
  return (
    <MenubarMenu>
      <MenubarTrigger>
       <AvatarNameUser value={user?.name || ''}/>
      </MenubarTrigger>
      <MenubarContent>
      {/*No funciona con <MenubarItem> porque no se ejecuta la lógica del formulario*/}
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <input type="submit" value="Log out"></input>
          </form>
        <Link href={"/dashboard"}>
            <MenubarItem>Perfil</MenubarItem>
        </Link>
        
      </MenubarContent>
    </MenubarMenu>
  );
}

export default Profile;
