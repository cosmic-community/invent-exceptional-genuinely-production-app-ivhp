// app/products/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProductBySlug, getFilmsByProduct, getMetafieldValue } from '@/lib/cosmic'
import FilmCard from '@/components/FilmCard'
import Reveal from '@/components/Reveal'

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const films = await getFilmsByProduct(product.id)

  const name = getMetafieldValue(product.metadata?.name) || product.title
  const tagline = getMetafieldValue(product.metadata?.tagline)
  const description = getMetafieldValue(product.metadata?.description)
  const status = getMetafieldValue(product.metadata?.concept_status)
  const brandColor = getMetafieldValue(product.metadata?.brand_color)
  const keyFeaturesRaw = getMetafieldValue(product.metadata?.key_features)
  const keyFeatures = keyFeaturesRaw
    .split(/\r?\n|•|-\s/)
    .map((feature) => feature.trim())
    .filter(Boolean)
  const heroImage = product.metadata?.hero_image

  return (
    <div>
      <section className="relative overflow-hidden border-b border-white/5">
        {heroImage ? (
          <img
            src={`${heroImage.imgix_url}?w=2400&h=1400&fit=crop&auto=format,compress`}
            alt={name}
            className="absolute inset-0 h-full w-full object-cover opacity-50"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ backgroundColor: brandColor || '#0e3d3c' }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />

        <div className="relative z-10 mx-auto max-w-5xl px-6 py-32 md:px-10 lg:py-40">
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              {brandColor && (
                <span
                  className="h-3 w-3 rounded-full border border-white/20"
                  style={{ backgroundColor: brandColor }}
                />
              )}
              {status && (
                <span className="font-sans text-xs uppercase tracking-[0.25em] text-amber">
                  {status}
                </span>
              )}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="font-serif text-5xl font-medium text-mist md:text-7xl">{name}</h1>
          </Reveal>
          {tagline && (
            <Reveal delay={240}>
              <p className="mt-6 max-w-2xl font-sans text-lg text-mist-dim md:text-xl">
                {tagline}
              </p>
            </Reveal>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24 md:px-10 lg:py-32">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div>
              <p className="section-label mb-4">About the concept</p>
              {description && (
                <p className="font-sans text-lg leading-relaxed text-mist">{description}</p>
              )}
            </div>
          </Reveal>

          {keyFeatures.length > 0 && (
            <Reveal delay={120}>
              <div>
                <p className="section-label mb-4">Key features</p>
                <ul className="space-y-3">
                  {keyFeatures.map((feature, i) => (
                    <li key={i} className="flex gap-3 font-sans text-sm text-mist-dim">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <section className="border-t border-white/5 bg-ink-light/40">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:py-32">
          <Reveal>
            <p className="section-label mb-4">Launch Films</p>
            <h2 className="font-serif text-3xl font-medium text-mist md:text-5xl">
              The story of {name}
            </h2>
          </Reveal>

          {films.length === 0 ? (
            <p className="mt-10 text-mist-dim">No films linked to this product yet.</p>
          ) : (
            <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {films.map((film, index) => (
                <Reveal key={film.id} delay={index * 100}>
                  <FilmCard film={film} />
                </Reveal>
              ))}
            </div>
          )}

          <Reveal delay={200}>
            <Link
              href="/products"
              className="mt-14 inline-flex items-center gap-2 border-b border-mist/30 pb-1 font-sans text-sm uppercase tracking-[0.2em] text-mist-dim transition-colors hover:border-mist hover:text-mist"
            >
              ← Back to all products
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  )
}