import Contact from '@/components/form/ContactForm';

export default async function Home() {

  return (
    <>
      <h1 className="flex flex-col items-center justify-between p-24">
        <Contact />
      </h1>

    </>
  );
}
