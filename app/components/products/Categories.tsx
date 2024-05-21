import { fetchAllCategories } from "@/lib/data";
import Link from "next/link";

export default async function NamePage() {
  const Categories = await fetchAllCategories();

  return (
    <div className="flex flex-col flex-grow border rounded-lg p-6">
    <h1 className="text-lg font-semibold mb-4 hidden md:block">
              CATEGORIAS
            </h1>
            {Categories.map((category) => (
              <Link
                href={`/catalogo/${category}`}
                key={category}
                className={`py-2 px-4 border-b hidden md:block hover:bg-secondary`}
              >
                {category}
              </Link>
            ))}
    </div>
  );
}