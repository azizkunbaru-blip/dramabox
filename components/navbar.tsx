import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/terbaru', label: 'Terbaru' },
  { href: '/terpopuler', label: 'Terpopuler' },
  { href: '/sulih-suara', label: 'Sulih Suara' }
];

export function Navbar() {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold">
          NgilengBox
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-foreground">
              {link.label}
            </Link>
          ))}
          <Link href="/cari" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Cari
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/cari"
            className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:text-foreground md:hidden"
          >
            Cari
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
