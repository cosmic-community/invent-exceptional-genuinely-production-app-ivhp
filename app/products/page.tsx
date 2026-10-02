import { getProducts } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'
import Reveal from '@/components/Reveal'

export const metadata = {
  title: 'Products — Invent Studio',
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:py-32">
      <Reveal>
        <p className="section-label mb-4">Invented Products</p>
        <h1 className="max-w-3xl font-serif text-4xl font-medium text-mist md:text-6xl">
          Concepts built from scratch, designed to feel inevitable.
        </h1>
      </Reveal>

      {products.length === 0 ? (
        <p className="mt-16 text-mist-dim">No products yet. Add some in Cosmic.</p>
      ) : (
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <Reveal key={product.id} delay={index * 100}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}