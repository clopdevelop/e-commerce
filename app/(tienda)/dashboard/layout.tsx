"use client"
import SideBar from "@/components/client/sideBar";
import { CommandMenu } from "@/components/utils/ComandMenu";
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const pathname = usePathname();
  
  const isBaseRoute = pathname === "/dashboard";

  return (
        <div className="flex">
              <SideBar></SideBar>
              <div className="flex flex-col items-center gap-10 p-5 border border-4">
              {children}
          </div>
          {/* <CommandMenu></CommandMenu> */}
        </div>
  );
}
