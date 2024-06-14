import Contact from "@/components/form/ContactForm";
import { Metadata } from "next";
import { Card } from "@/components/shadcn";
import { getUserLogged } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Formulario de atención al cliente",
};

export default async function Home() {
  const user = await getUserLogged();
  console.log(user);
  return (
    <>
      <div className="flex flex-col items-center justify-between p-24">
        <Card>
          <section className="py-12">
            <div className="max-w-4xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Información de Contacto
                  </h3>
                  <p className="mb-2">Correo Electrónico: info@tutienda.com</p>
                  <p className="mb-2">Teléfono: +1234567890</p>
                  <p className="mb-2">
                    Dirección: 123 Calle Principal, Ciudad, País
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Formulario de Contacto
                  </h3>
                  {!user?.ticket_send && <Contact />}
                </div>
              </div>
            </div>
          </section>
        </Card>
      </div>
    </>
  );
}
