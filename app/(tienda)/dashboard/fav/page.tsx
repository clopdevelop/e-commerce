import { FavProducts } from "@/components/products";
import Favs from "@/components/products/Favs";

export default async function Home() {
  
  return (
    <>
      {/* {favproducts ? (
        <>
      <FavProducts products={favproducts}></FavProducts>   
      </>
      ) : (
        <>
          <h2>No has añadido productos a tus Favoritos</h2>
        </>
      )} */}
      <Favs></Favs>
    </>
  );
}
