import Link from 'next/link'
import { Product } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function ProductCard({ product }: { product: Product }) {
  const name = getMetafieldValue(product.metadata?.name) || product.title
  const tagline = getMetafieldValue(product.metadata?.tagline)
  const status = getMetafieldValue(product.metadata?.concept_status)
  const brandColor = getMetafieldValue(product.metadata?.brand_color)
  const image = product.metadata?.hero_image

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block overflow-hidden rounded-2xl border border-white/5 bg-ink-light/60 transition-transform duration-500 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-lighter">
        {image ? (
          <img
            src={`${image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center p-6 text-center font-serif text-2xl text-mist/30"
            style={{ backgroundColor: brandColor || '#1d1a17' }}
          >
            {name}
          </div>
        )}
        {status && (
          <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1 font-sans text-[10px] uppercase tracking-[0.2em] text-amber backdrop-blur">
            {status}
          </span>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-serif text-xl text-mist">{name}</h3>
        {tagline && (
          <p className="mt-2 line-clamp-2 font-sans text-sm text-mist-dim">{tagline}</p>
        )}
      </div>
    </Link>
  )
}