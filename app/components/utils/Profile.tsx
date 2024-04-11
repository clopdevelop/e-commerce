import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/shadcn/menubar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/shadcn/avatar";



import { signOut } from "@/auth";
import Link from "next/link";
import { Button } from "../shadcn/button";



async function Profile() {
  //todo no funciona con google auth a

  return (
    <MenubarMenu>
      <MenubarTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </MenubarTrigger>
      <MenubarContent>
      {/*No funciona con <MenubarItem> porque no se ejecuta la lógica del formulario*/}
          <form
            action={async () => {
              "use server";
              // console.log("signout");
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
