import { fetchAllCategories } from "@/lib/data";
import Link from "next/link";

export default async function NamePage() {
  const Categories = await fetchAllCategories();

  return (
    <div className="flex flex-col flex-grow">
            {Categories.map((category) => (
              <Link
                href={`/catalogo/${category}`}
                key={category}
                className={`py-2 px-4 hover:bg-secondary`}
              >
                {category}
              </Link>
            ))}
    </div>
  );
}