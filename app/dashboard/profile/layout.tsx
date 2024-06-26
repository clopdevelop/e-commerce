import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/shadcn/separator";
import { SidebarNav } from "./components/sidebar-nav";

export const metadata: Metadata = {
  title: "Perfil",
  description: "Configuración del perfil del usuario",
};

const sidebarNavItems = [
  {
    title: "Perfil",
    href: "/dashboard/profile",
  },
  {
    title: "Cuenta",
    href: "/dashboard/profile/account",
  },
  {
    title: "Dirección",
    href: "/dashboard/profile/dir",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="container mx-auto">
       <h1 className="text-2xl font-bold">Configuración</h1>
       <Separator className="my-4"></Separator>
      <div className="flex flex-col lg:flex-row lg:space-x-12">
        <aside className="w-full lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
