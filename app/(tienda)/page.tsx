export default async function Home({
  searchParams,
}: {
  searchParams?: {
    success?: string;
  };
}) {
  // Obtiene el parámetro `success` de la URL
  const success = searchParams?.success
// redirect_status=succeeded
  return (
    <>
      {success ? (
        <>
          <h1>SUCCESS</h1>
        </>
      ): (
        <>
          <h1>WELCOME</h1>
        </>
      )}
    </>
  );
}
