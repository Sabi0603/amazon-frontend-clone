import CategoryCard from '../components/common/CategoryCard.jsx'
import HeroBanner from '../components/common/HeroBanner.jsx'
import Section from '../components/common/Section.jsx'
import DealCard from '../components/product/DealCard.jsx'
import ProductCard from '../components/product/ProductCard.jsx'
import {
  deals,
  homeCategories,
  promotionalContent,
  recommendedProducts,
} from '../data/homeData.js'

function Home() {
  return (
    <div className="w-full bg-amazon-page">
      <Section
        className="bg-amazon-blue py-0 text-white"
        container={false}
        label="Hero promotional area"
      >
        <HeroBanner />
      </Section>

      <Section className="-mt-4 pt-0 sm:-mt-8" label="Category content area">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {homeCategories.map((category) => (
            <CategoryCard category={category} key={category.title} />
          ))}
        </div>
      </Section>

      <Section label="Today's Deals">
        <div className="border border-amazon-border bg-amazon-surface p-4 sm:p-6">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-xl font-bold text-amazon-text sm:text-2xl">Today&apos;s Deals</h2>
            <a className="shrink-0 text-sm text-amazon-link hover:underline" href="/products">
              See all
            </a>
          </div>
          <ul
            className="mt-5 flex snap-x gap-4 overflow-x-auto pb-2 scrollbar-none [&::-webkit-scrollbar]:hidden"
            aria-label="Today's deals"
          >
            {deals.map((deal) => (
              <li className="snap-start" key={deal.title}>
                <DealCard deal={deal} />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section label="Product recommendation sections">
        <div className="border border-amazon-border bg-amazon-surface p-4 sm:p-6">
          <h2 className="text-xl font-bold text-amazon-text sm:text-2xl">
            Product recommendations
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
            {recommendedProducts.map((product) => (
              <ProductCard key={product.title} product={product} />
            ))}
          </div>
        </div>
      </Section>

      <Section
        className="pt-0"
        label="Additional promotional and content sections"
      >
        <div className="border border-amazon-border bg-amazon-surface p-4 sm:p-6">
          <h2 className="text-xl font-bold text-amazon-text sm:text-2xl">
            More ways to shop
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {promotionalContent.map((promotion) => (
              <article className="border border-amazon-border p-3" key={promotion.title}>
                <div
                  className="flex min-h-36 items-center justify-center overflow-hidden rounded bg-[#f8fafc]"
                >
                  {promotion.image ? (
                    <img
                      alt={promotion.title}
                      className="h-36 w-full object-cover rounded"
                      loading="lazy"
                      src={promotion.image}
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className={`flex h-full w-full items-center justify-center ${promotion.visualClass}`}
                    >
                      <div className="h-20 w-28 rounded-full border-12 border-white/40" />
                    </div>
                  )}
                </div>
                <h3 className="mt-3 text-base font-bold text-amazon-text">{promotion.title}</h3>
                <p className="mt-1 text-sm text-amazon-muted">{promotion.description}</p>
                <a className="mt-3 inline-block text-sm text-amazon-link hover:underline" href="/products">
                  Explore more
                </a>
              </article>
            ))}
          </div>
        </div>
      </Section>
    </div>
  )
}

export default Home
