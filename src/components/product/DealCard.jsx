function DealCard({ deal }) {
  return (
    <article className="w-[190px] shrink-0 sm:w-[215px]">
      <div className="flex h-full flex-col">
        <div
          className="flex aspect-square items-center justify-center overflow-hidden p-3 bg-white border border-amazon-border rounded"
        >
          {deal.image ? (
            <img
              alt={deal.title}
              className="h-full w-full object-contain"
              loading="lazy"
              src={deal.image}
            />
          ) : (
            <div
              aria-hidden="true"
              className={`flex h-full w-full items-center justify-center p-8 ${deal.visualClass}`}
            >
              <div className="h-24 w-20 rotate-6 rounded-xl border-4 border-white/35 bg-black/20 shadow-lg" />
            </div>
          )}
        </div>
        <div className="pt-3">
          <span className="inline-block bg-[#cc0c39] px-2 py-1 text-xs font-bold text-white">
            {deal.badge}
          </span>
          <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-amazon-text">
            {deal.title}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-medium text-amazon-text">{deal.price}</span>
            <span className="text-xs text-amazon-muted line-through">{deal.originalPrice}</span>
          </div>
          <p className="text-xs font-semibold text-[#cc0c39]">{deal.discount}</p>
        </div>
      </div>
    </article>
  )
}

export default DealCard
