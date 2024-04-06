"use client"
import { CommandMenu } from "@/components/utils/ComandMenu";
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const pathname = usePathname();
  
  const isBaseRoute = pathname === "/dashboard";

  return (
    <>
      {isBaseRoute ? (
        <>
          {children}
          <CommandMenu></CommandMenu>
        </>
      ) : (
        <>
          <CommandMenu></CommandMenu>
          {children}
        </>
      )}
    </>
  );
}
