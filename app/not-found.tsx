import Link from 'next/link'
import { NavBar } from './components/ui'
import 'tailwindcss/tailwind.css';

export default function NotFound() {
  return (
    <>
        <NavBar />
        <main className="flex flex-col items-center justify-between px-24 py-10">
        <div>
          <h2>Not Foundd</h2>
          <p>Could not find requested resource</p>
          <Link href="/">Return Home</Link>
        </div>
        </main>
    </>
  )
}