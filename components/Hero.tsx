import Link from 'next/link'
import { Film } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import Reveal from '@/components/Reveal'

export default function Hero({ film }: { film: Film | null }) {
  if (!film) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center border-b border-white/5 bg-ink px-6 text-center">
        <div>
          <p className="section-label mb-6">Invent Studio</p>
          <h1 className="font-serif text-4xl font-medium text-mist md:text-6xl">
            No films published yet.
          </h1>
        </div>
      </section>
    )
  }

  const product = film.metadata?.product
  const heroImage = product?.metadata?.hero_image
  const tagline = getMetafieldValue(product?.metadata?.tagline)
  const name = getMetafieldValue(product?.metadata?.name) || product?.title || film.title
  const runtime = getMetafieldValue(film.metadata?.runtime)
  const aspectRatio = getMetafieldValue(film.metadata?.aspect_ratio)

  return (
    <section className="relative flex min-h-[90vh] items-end overflow-hidden border-b border-white/5">
      {heroImage ? (
        <img
          src={`${heroImage.imgix_url}?w=2400&h=1600&fit=crop&auto=format,compress`}
          alt={name}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-teal-dark via-ink to-ink" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/10" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-40 md:px-10 md:pb-28">
        <Reveal>
          <p className="section-label mb-6">Latest Launch Film</p>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="max-w-4xl font-serif text-5xl font-medium leading-[1.05] text-mist md:text-7xl">
            {name}
          </h1>
        </Reveal>
        {tagline && (
          <Reveal delay={240}>
            <p className="mt-6 max-w-2xl font-sans text-lg text-mist-dim md:text-xl">
              {tagline}
            </p>
          </Reveal>
        )}
        <Reveal delay={360}>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              href={`/films/${film.slug}`}
              className="inline-flex items-center gap-3 rounded-full bg-amber px-8 py-4 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-amber-light"
            >
              Watch the film
            </Link>
            {product && (
              <Link
                href={`/products/${product.slug}`}
                className="inline-flex items-center gap-2 border-b border-mist/30 pb-1 font-sans text-sm uppercase tracking-[0.2em] text-mist-dim transition-colors hover:border-mist hover:text-mist"
              >
                View product
              </Link>
            )}
            <div className="flex items-center gap-4 font-sans text-xs uppercase tracking-[0.25em] text-mist-dim">
              {runtime && <span>{runtime}</span>}
              {runtime && aspectRatio && (
                <span className="h-1 w-1 rounded-full bg-mist-dim" />
              )}
              {aspectRatio && <span>{aspectRatio}</span>}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}