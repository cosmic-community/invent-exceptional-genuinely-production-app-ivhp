export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-ink px-6 py-16 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div>
          <p className="font-serif text-2xl text-mist">
            Invent<span className="text-amber">.</span>Studio
          </p>
          <p className="mt-3 max-w-sm font-sans text-sm text-mist-dim">
            An invented-product studio crafting premium, cinematic launch films from scratch.
          </p>
        </div>
        <p className="font-sans text-xs uppercase tracking-[0.25em] text-mist-dim">
          © {new Date().getFullYear()} Invent Studio
        </p>
      </div>
    </footer>
  )
}