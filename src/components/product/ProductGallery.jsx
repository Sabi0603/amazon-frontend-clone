import { useState } from 'react'

const categoryVisuals = {
  Appliances: 'bg-[linear-gradient(145deg,#cffafe,#67e8f9)]',
  Books: 'bg-[linear-gradient(145deg,#e2e8f0,#94a3b8)]',
  Electronics: 'bg-[linear-gradient(145deg,#dbeafe,#60a5fa)]',
  Fashion: 'bg-[linear-gradient(145deg,#fce7f3,#f472b6)]',
  Beauty: 'bg-[linear-gradient(145deg,#fce7f3,#fda4af)]',
  Grocery: 'bg-[linear-gradient(145deg,#dcfce7,#4ade80)]',
  Laptops: 'bg-[linear-gradient(145deg,#1e293b,#64748b)]',
  Mobiles: 'bg-[linear-gradient(145deg,#e0e7ff,#818cf8)]',
  'Home & Kitchen': 'bg-[linear-gradient(145deg,#fef3c7,#fbbf24)]',
}

function ProductPlaceholder({ product, compact = false, variant = 0 }) {
  const visualClass = categoryVisuals[product.category] ?? 'bg-[#eef0f0]'
  const frameClass = [
    'border-white/50 bg-black/15',
    'border-white/60 bg-white/15',
    'border-white/40 bg-black/25',
  ][variant % 3]

  return (
    <div
      aria-label={`${product.title} image placeholder`}
      className={`flex items-center justify-center overflow-hidden ${compact ? `h-16 w-16 p-2 ${visualClass}` : `min-h-[330px] w-full p-10 sm:min-h-[420px] ${visualClass}`}`}
      role="img"
    >
      <div className={`${compact ? 'h-10 w-8' : 'h-48 w-36'} flex items-center justify-center rounded-xl border-4 shadow-lg ${frameClass}`}>
        <span className={`font-bold uppercase tracking-widest text-white/80 ${compact ? 'text-[8px]' : 'text-sm'}`}>
          {compact ? `V${variant + 1}` : product.category.slice(0, 3)}
        </span>
      </div>
    </div>
  )
}

function ProductGallery({ product }) {
  const availableImages = [...new Set([product.image, ...product.images].filter(Boolean))]
  const [activeImage, setActiveImage] = useState(0)

  return (
    <section aria-label="Product images" className="min-w-0">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="order-2 flex gap-2 overflow-x-auto sm:order-1 sm:w-16 sm:flex-col">
          {availableImages.length > 0 ? (
            availableImages.map((image, index) => (
              <button
                aria-label={`View product image ${index + 1}`}
                className={`shrink-0 overflow-hidden rounded border p-1 ${
                  activeImage === index
                    ? 'border-amazon-orange ring-1 ring-amazon-orange'
                    : 'border-amazon-border hover:border-amazon-orange'
                }`}
                key={image}
                type="button"
                onClick={() => setActiveImage(index)}
              >
                <img alt="" className="h-14 w-14 object-contain" src={image} />
              </button>
            ))
          ) : (
            [0, 1, 2].map((variant) => (
              <button
                aria-label={`View product image placeholder ${variant + 1}`}
                className={`shrink-0 rounded border p-1 ${
                  activeImage === variant
                    ? 'border-amazon-orange ring-1 ring-amazon-orange'
                    : 'border-amazon-border hover:border-amazon-orange'
                }`}
                key={variant}
                type="button"
                onClick={() => setActiveImage(variant)}
              >
                <ProductPlaceholder compact product={product} variant={variant} />
              </button>
            ))
          )}
        </div>

        <div className="order-1 min-w-0 flex-1 sm:order-2">
          {availableImages.length > 0 ? (
            <img
              alt={product.title}
              className="mx-auto max-h-[480px] w-full object-contain"
              src={availableImages[activeImage]}
            />
          ) : (
            <ProductPlaceholder product={product} variant={activeImage} />
          )}
        </div>
      </div>
    </section>
  )
}

export default ProductGallery
