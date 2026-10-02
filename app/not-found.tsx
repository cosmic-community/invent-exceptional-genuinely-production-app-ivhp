import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="section-label mb-6">404</p>
      <h1 className="font-serif text-4xl font-medium text-mist md:text-6xl">
        This scene doesn’t exist.
      </h1>
      <p className="mt-6 max-w-md font-sans text-mist-dim">
        The page you’re looking for has been cut from the final edit.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-amber px-8 py-4 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-amber-light"
      >
        Return home
      </Link>
    </div>
  )
}