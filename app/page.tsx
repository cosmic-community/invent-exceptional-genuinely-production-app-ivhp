import Link from 'next/link'
import { getProducts, getFilms, getLatestFilm } from '@/lib/cosmic'
import Hero from '@/components/Hero'
import ProductCard from '@/components/ProductCard'
import FilmCard from '@/components/FilmCard'
import Reveal from '@/components/Reveal'

export default async function HomePage() {
  const [products, films, latestFilm] = await Promise.all([
    getProducts(),
    getFilms(),
    getLatestFilm(),
  ])

  const featuredProducts = products.slice(0, 3)
  const recentFilms = films.slice(0, 3)

  return (
    <div>
      <Hero film={latestFilm} />

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:py-32">
        <Reveal>
          <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-label mb-4">The Studio</p>
              <h2 className="font-serif text-3xl font-medium text-mist md:text-5xl">
                Invented products,
                <br className="hidden md:block" /> cinematic reveals.
              </h2>
            </div>
            <Link
              href="/products"
              className="group inline-flex w-fit items-center gap-2 border-b border-amber/40 pb-1 font-sans text-sm uppercase tracking-[0.2em] text-amber transition-colors hover:border-amber"
            >
              All products
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </Reveal>

        {featuredProducts.length === 0 ? (
          <p className="text-mist-dim">No products yet. Add some in Cosmic.</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {featuredProducts.map((product, index) => (
              <Reveal key={product.id} delay={index * 120}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        )}
      </section>

      <section className="border-t border-white/5 bg-ink-light/40">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:py-32">
          <Reveal>
            <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="section-label mb-4">Launch Films</p>
                <h2 className="font-serif text-3xl font-medium text-mist md:text-5xl">
                  Every launch,
                  <br className="hidden md:block" /> a short film.
                </h2>
              </div>
              <Link
                href="/films"
                className="group inline-flex w-fit items-center gap-2 border-b border-teal-light/60 pb-1 font-sans text-sm uppercase tracking-[0.2em] text-teal-light transition-colors hover:border-teal-light"
              >
                All films
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </Reveal>

          {recentFilms.length === 0 ? (
            <p className="text-mist-dim">No films yet. Add some in Cosmic.</p>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {recentFilms.map((film, index) => (
                <Reveal key={film.id} delay={index * 120}>
                  <FilmCard film={film} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}