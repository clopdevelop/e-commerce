import SideBar from "@/components/client/sideBar";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  
  // const isBaseRoute = pathname === "/dashboard";

  return (
        <div className="flex">
          <SideBar></SideBar>
          <div className="flex flex-col items-center gap-10 p-5 w-full">
            {children}
          </div>
        </div>
  );
}
