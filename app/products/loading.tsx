export default function ProductsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:py-32">
      <div className="h-10 w-64 animate-pulse rounded bg-ink-lighter" />
      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-[4/3] animate-pulse rounded-2xl bg-ink-lighter" />
        ))}
      </div>
    </div>
  )
}