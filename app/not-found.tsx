import Link from 'next/link'
import { NavBar } from './components/ui'

export default function NotFound() {
  return (
    <>
      <NavBar></NavBar>
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