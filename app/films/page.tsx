import { getFilms } from '@/lib/cosmic'
import FilmCard from '@/components/FilmCard'
import Reveal from '@/components/Reveal'

export const metadata = {
  title: 'Films — Invent Studio',
}

export default async function FilmsPage() {
  const films = await getFilms()

  return (
    <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:py-32">
      <Reveal>
        <p className="section-label mb-4">Launch Films</p>
        <h1 className="max-w-3xl font-serif text-4xl font-medium text-mist md:text-6xl">
          Every product deserves a world-class reveal.
        </h1>
      </Reveal>

      {films.length === 0 ? (
        <p className="mt-16 text-mist-dim">No films yet. Add some in Cosmic.</p>
      ) : (
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {films.map((film, index) => (
            <Reveal key={film.id} delay={index * 100}>
              <FilmCard film={film} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}