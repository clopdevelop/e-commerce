import { CommandMenu } from "@/components/ComandMenu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <h1 className="flex flex-col items-center justify-between p-24">
        Esta es la página de tu perfil de usuario.
      </h1>
      <CommandMenu></CommandMenu>
      {children}
    </>
  );
}
