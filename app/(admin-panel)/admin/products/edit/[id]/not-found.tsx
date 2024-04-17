import Link from 'next/link'
import Header from "@/components/admin/Header";
import 'tailwindcss/tailwind.css';

export default function NotFound() {
  return (
    <>
        <Header></Header>
      <main className="flex flex-col items-center justify-between p-24">
        <div>
          <h2>Not Found</h2>
          <p>Could not find requested resource</p>
          <Link href="/">Return Home</Link>
        </div>
      </main>
    </>
  )
}