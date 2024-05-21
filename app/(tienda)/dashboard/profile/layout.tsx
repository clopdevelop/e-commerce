import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/shadcn/separator";
import { SidebarNav } from "./components/sidebar-nav";

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
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
  {
    title: "Cartera",
    href: "/dashboard/profile/paymethod",
  }
  // {
  //   title: "Notificaciones",
  //   href: "/dashboard/profile/notifications",
  // },
  // {
  //   title: "Display",
  //   href: "/examples/forms/display",
  // },
  // {
  //   title: "Appearance",
  //   href: "/examples/forms/appearance",
  // },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="space-y-6 p-10 pb-16 md:block md:w-7/12">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Configuración</h2>
          <p className="text-muted-foreground">
            Personaliza tu perfil
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="w-24 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 w-96 m-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}
