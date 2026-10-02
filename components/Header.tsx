import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <Link href="/" className="font-serif text-xl tracking-wide text-mist">
          Invent<span className="text-amber">.</span>Studio
        </Link>
        <nav className="flex items-center gap-8 font-sans text-xs uppercase tracking-[0.25em] text-mist-dim">
          <Link href="/products" className="transition-colors hover:text-amber">
            Products
          </Link>
          <Link href="/films" className="transition-colors hover:text-teal-light">
            Films
          </Link>
        </nav>
      </div>
    </header>
  )
}