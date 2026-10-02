import { createBucketClient } from '@cosmicjs/sdk'
import { Product, Film, Shot } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Type guard for Cosmic SDK errors
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Safely extract a plain string from a metadata value that may be
// returned as a raw string/number/boolean or as a { key, value } object
export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

// Safe date sort helper - works for any content object, no required field
export function getDateValue(item: {
  published_at?: string | null
  modified_at?: string | null
  created_at?: string | null
}): number {
  const raw = item.published_at || item.modified_at || item.created_at
  const time = raw ? Date.parse(raw) : NaN
  return Number.isNaN(time) ? 0 : time
}

// ---------- Products ----------

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'products' })
      .props(['id', 'slug', 'title', 'metadata', 'created_at', 'modified_at'])
      .depth(1)

    const products = response.objects as Product[]
    return products.sort((a, b) => getDateValue(b) - getDateValue(a))
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch products')
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'products', slug })
      .props(['id', 'slug', 'title', 'metadata', 'created_at', 'modified_at'])
      .depth(1)

    return (response.object as Product) || null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch product')
  }
}

export async function getLatestProduct(): Promise<Product | null> {
  const products = await getProducts()
  return products[0] || null
}

// ---------- Films ----------

export async function getFilms(): Promise<Film[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'films' })
      .props(['id', 'slug', 'title', 'metadata', 'created_at', 'modified_at'])
      .depth(1)

    const films = response.objects as Film[]
    return films.sort((a, b) => getDateValue(b) - getDateValue(a))
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch films')
  }
}

export async function getFilmBySlug(slug: string): Promise<Film | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'films', slug })
      .props(['id', 'slug', 'title', 'metadata', 'created_at', 'modified_at'])
      .depth(1)

    return (response.object as Film) || null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch film')
  }
}

export async function getFilmsByProduct(productId: string): Promise<Film[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'films', 'metadata.product': productId })
      .props(['id', 'slug', 'title', 'metadata', 'created_at', 'modified_at'])
      .depth(1)

    const films = response.objects as Film[]
    return films.sort((a, b) => getDateValue(b) - getDateValue(a))
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch films for product')
  }
}

export async function getLatestFilm(): Promise<Film | null> {
  const films = await getFilms()
  return films[0] || null
}

// ---------- Shots ----------

export async function getShotsByFilm(filmId: string): Promise<Shot[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'shots', 'metadata.film': filmId })
      .props(['id', 'slug', 'title', 'metadata', 'created_at', 'modified_at'])
      .depth(1)

    const shots = response.objects as Shot[]
    return shots.sort((a, b) => {
      const aNum = Number(getMetafieldValue(a.metadata?.shot_number)) || 0
      const bNum = Number(getMetafieldValue(b.metadata?.shot_number)) || 0
      return aNum - bNum
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch shots for film')
  }
}