import Link from "next/link";

export default function Component() {
  return (
    <nav
      className="grid gap-4 text-sm text-muted-foreground"
      x-chunk="dashboard-04-chunk-0"
    >
      <Link href="/dashboard/profile" className="font-semibold text-primary">
        General
      </Link>
      <Link href="/dashboard/profile/addr">Dirección</Link>
      <Link href="#">Ayuda</Link>
      <Link href="#">Avanzado</Link>
    </nav>
  );
}
