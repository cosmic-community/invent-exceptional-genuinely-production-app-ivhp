import Link from 'next/link'
import { Film } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function FilmCard({ film }: { film: Film }) {
  const product = film.metadata?.product
  const name = product ? getMetafieldValue(product.metadata?.name) || product.title : film.title
  const image = product?.metadata?.hero_image
  const runtime = getMetafieldValue(film.metadata?.runtime)
  const aspectRatio = getMetafieldValue(film.metadata?.aspect_ratio)
  const endTagline = getMetafieldValue(film.metadata?.end_tagline)

  return (
    <Link
      href={`/films/${film.slug}`}
      className="group block overflow-hidden rounded-2xl border border-white/5 bg-ink-light/60 transition-transform duration-500 hover:-translate-y-1"
    >
      <div className="relative aspect-video overflow-hidden bg-ink-lighter">
        {image ? (
          <img
            src={`${image.imgix_url}?w=900&h=500&fit=crop&auto=format,compress`}
            alt={film.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-6 text-center font-serif text-2xl text-mist/30">
            {film.title}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 flex items-center gap-3 font-sans text-[10px] uppercase tracking-[0.25em] text-mist-dim">
          {runtime && <span>{runtime}</span>}
          {aspectRatio && <span>{aspectRatio}</span>}
        </div>
      </div>
      <div className="p-6">
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-teal-light">{name}</p>
        <h3 className="mt-2 font-serif text-xl text-mist">{film.title}</h3>
        {endTagline && (
          <p className="mt-2 line-clamp-2 font-sans text-sm italic text-mist-dim">
            “{endTagline}”
          </p>
        )}
      </div>
    </Link>
  )
}