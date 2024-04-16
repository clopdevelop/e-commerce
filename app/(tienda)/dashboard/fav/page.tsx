import Favs from "@/components/products/Favs";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: 'Favoritos',
  description: "Los productos guardados en favoritos",
};

export default async function Home() {
  const cookie = cookies().get('favoritos');

  console.log(cookie);

  // Convertir la cookie en un array { name: 'favoritos', value: '2,null' }
  const cookieArray = cookie?.value.split(',');
  // Borrar los null del array
  const cookieWithoutNull = cookieArray?.filter(item => item !== 'null');
  // Convertir a number los items del array
  const cookieNumber = cookieWithoutNull?.map(item => Number(item)); 
  return (
    <>
      <Favs favoritos={cookieNumber}></Favs>
    </>
  );
}
