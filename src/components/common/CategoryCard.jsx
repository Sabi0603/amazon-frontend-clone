function CategoryCard({ category }) {
  return (
    <article className="flex min-h-[300px] flex-col border border-amazon-border bg-amazon-surface p-4 shadow-sm sm:p-5">
      <h3 className="text-lg font-bold leading-6 text-amazon-text">{category.title}</h3>
      <div
        className="my-4 flex min-h-[190px] flex-1 items-center justify-center overflow-hidden rounded bg-[#f8fafc]"
      >
        {category.image ? (
          <img
            alt={category.title}
            className="h-full w-full object-cover rounded"
            loading="lazy"
            src={category.image}
          />
        ) : (
          <div
            aria-hidden="true"
            className={`flex h-full w-full items-center justify-center p-6 ${category.visualClass}`}
          >
            <div className="h-24 w-24 rounded-full border-[14px] border-white/45 shadow-inner" />
          </div>
        )}
      </div>
      <p className="text-xs text-amazon-muted">{category.description}</p>
      <a className="mt-3 w-fit text-sm text-amazon-link hover:underline" href="/products">
        See more
      </a>
    </article>
  )
}

export default CategoryCard
