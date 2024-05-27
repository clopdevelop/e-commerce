import Contact from '@/components/form/ContactForm';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Formulario de atención al cliente",
};

export default async function Home() {

  return (
    <>
      <div className="flex flex-col items-center justify-between p-24">
        <Contact />
      </div>
    </>
  );
}
