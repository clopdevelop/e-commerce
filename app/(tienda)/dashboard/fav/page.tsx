import Favs from "@/components/products/Favs";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: 'Favoritos',
  description: "Los productos guardados en favoritos",
};

export default async function Home() {
  const cookie  = cookies().get('favoritos')?.value ?? "0";
  //Convertir cookie en array de numeros
  const favorites : number[] = cookie.split(",").map(Number);

  console.log(favorites);

  return (
    <>
      <Favs favorites={favorites}></Favs>
    </>
  );
}
