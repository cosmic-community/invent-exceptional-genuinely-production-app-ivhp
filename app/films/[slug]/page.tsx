// app/films/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getFilmBySlug, getShotsByFilm, getMetafieldValue } from '@/lib/cosmic'
import ShotTimeline from '@/components/ShotTimeline'
import Reveal from '@/components/Reveal'

export default async function FilmPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const film = await getFilmBySlug(slug)

  if (!film) {
    notFound()
  }

  const shots = await getShotsByFilm(film.id)

  const product = film.metadata?.product
  const productName = product ? getMetafieldValue(product.metadata?.name) || product.title : ''
  const heroImage = product?.metadata?.hero_image
  const runtime = getMetafieldValue(film.metadata?.runtime)
  const aspectRatio = getMetafieldValue(film.metadata?.aspect_ratio)
  const endTagline = getMetafieldValue(film.metadata?.end_tagline)
  const soundDirection = getMetafieldValue(film.metadata?.sound_direction)
  const visualSystem = getMetafieldValue(film.metadata?.visual_system)

  return (
    <div>
      <section className="relative overflow-hidden border-b border-white/5">
        {heroImage ? (
          <img
            src={`${heroImage.imgix_url}?w=2400&h=1400&fit=crop&auto=format,compress`}
            alt={film.title}
            className="absolute inset-0 h-full w-full object-cover opacity-45"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-teal-dark via-ink to-ink" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />

        <div className="relative z-10 mx-auto max-w-5xl px-6 py-32 md:px-10 lg:py-40">
          {productName && (
            <Reveal>
              <p className="section-label mb-4">{productName}</p>
            </Reveal>
          )}
          <Reveal delay={120}>
            <h1 className="font-serif text-5xl font-medium text-mist md:text-7xl">{film.title}</h1>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap items-center gap-4 font-sans text-xs uppercase tracking-[0.25em] text-mist-dim">
              {runtime && (
                <span className="rounded-full border border-white/10 px-4 py-2 text-amber">
                  {runtime}
                </span>
              )}
              {aspectRatio && (
                <span className="rounded-full border border-white/10 px-4 py-2">{aspectRatio}</span>
              )}
              {product && (
                <Link
                  href={`/products/${product.slug}`}
                  className="rounded-full border border-teal-light/40 px-4 py-2 text-teal-light transition-colors hover:border-teal-light"
                >
                  View product
                </Link>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {(soundDirection || visualSystem) && (
        <section className="border-b border-white/5 bg-ink-light/40">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-2 md:px-10">
            {visualSystem && (
              <Reveal>
                <p className="section-label mb-3">Visual System</p>
                <p className="font-sans text-sm leading-relaxed text-mist-dim">{visualSystem}</p>
              </Reveal>
            )}
            {soundDirection && (
              <Reveal delay={100}>
                <p className="section-label mb-3 text-teal-light">Sound Direction</p>
                <p className="font-sans text-sm leading-relaxed text-mist-dim">{soundDirection}</p>
              </Reveal>
            )}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-5xl px-6 py-24 md:px-10 lg:py-32">
        <Reveal>
          <p className="section-label mb-4">Storyboard</p>
          <h2 className="mb-14 font-serif text-3xl font-medium text-mist md:text-5xl">
            Shot by shot
          </h2>
        </Reveal>

        <ShotTimeline shots={shots} />

        {endTagline && (
          <Reveal delay={200}>
            <div className="mt-20 border-t border-white/5 pt-14 text-center">
              <p className="font-serif text-2xl italic text-mist md:text-4xl">“{endTagline}”</p>
            </div>
          </Reveal>
        )}

        <Reveal delay={300}>
          <Link
            href="/films"
            className="mt-16 inline-flex items-center gap-2 border-b border-mist/30 pb-1 font-sans text-sm uppercase tracking-[0.2em] text-mist-dim transition-colors hover:border-mist hover:text-mist"
          >
            ← Back to all films
          </Link>
        </Reveal>
      </section>
    </div>
  )
}