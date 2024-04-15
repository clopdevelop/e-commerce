import Favs from "@/components/products/Favs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Favoritos',
  description: "Los productos guardados en favoritos",
};

export default async function Home() {
  return (
    <>
      <Favs></Favs>
    </>
  );
}
