import { useState } from 'react'

const slides = [
  {
    eyebrow: 'Great Indian Festival',
    title: 'Everything you need, delivered to your door',
    description: 'Explore seasonal offers across the categories you love.',
    action: 'Shop now',
    background: 'bg-[linear-gradient(110deg,#172235_0%,#24506a_48%,#f4b45f_100%)]',
    accent: 'bg-[#f8d28d]',
  },
  {
    eyebrow: 'Everyday essentials',
    title: 'Make your home feel more like home',
    description: 'Discover useful finds for every room and every routine.',
    action: 'Explore deals',
    background: 'bg-[linear-gradient(110deg,#382518_0%,#a35a31_48%,#f3d6a1_100%)]',
    accent: 'bg-[#f4c278]',
  },
  {
    eyebrow: 'New arrivals',
    title: 'Upgrade your everyday technology',
    description: 'Find smart picks for work, study, and entertainment.',
    action: 'See more',
    background: 'bg-[linear-gradient(110deg,#101b31_0%,#355d86_52%,#b8d9dc_100%)]',
    accent: 'bg-[#c9eef0]',
  },
]

function ArrowIcon({ direction }) {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        d={direction === 'previous' ? 'm14.5 5-7 7 7 7' : 'm9.5 5 7 7-7 7'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function HeroBanner() {
  const [activeSlide, setActiveSlide] = useState(0)
  const slide = slides[activeSlide]

  return (
    <div className="relative w-full overflow-hidden bg-amazon-blue" aria-roledescription="carousel">
      <div
        className={`relative isolate flex min-h-90 items-end overflow-hidden px-6 pb-12 pt-20 text-white transition-colors sm:min-h-100 sm:px-12 sm:pb-16 lg:min-h-107.5 lg:px-20 ${slide.background}`}
        aria-live="polite"
        aria-label={`Slide ${activeSlide + 1} of ${slides.length}: ${slide.title}`}
      >
        <div className="absolute inset-0 -z-10 opacity-35 bg-[linear-gradient(120deg,transparent_0%,transparent_55%,rgba(255,255,255,.28)_55%,rgba(255,255,255,.05)_80%)]" />
        <div className={`absolute -right-16 top-10 -z-10 h-64 w-64 rotate-12 rounded-[38%] opacity-40 sm:right-16 sm:h-80 sm:w-80 ${slide.accent}`} />
        <div className="absolute -bottom-20 right-[18%] -z-10 h-48 w-48 rounded-full border-28 border-white/15 sm:h-64 sm:w-64" />

        <div className="mx-auto w-full max-w-180 text-center sm:mx-0 sm:text-left">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/80 sm:text-sm">
            {slide.eyebrow}
          </p>
          <h1 className="mt-3 max-w-155 text-3xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[52px]">
            {slide.title}
          </h1>
          <p className="mt-4 max-w-125 text-sm leading-6 text-white/90 sm:text-base">
            {slide.description}
          </p>
          <button
            className="mt-6 min-h-11 rounded-md bg-amazon-yellow px-6 py-2.5 text-sm font-bold text-amazon-text shadow-sm hover:bg-[#f3a847]"
            type="button"
          >
            {slide.action}
          </button>
        </div>
      </div>

      <button
        aria-label="Previous promotional banner"
        className="absolute left-2 top-1/2 z-10 flex h-12 w-10 -translate-y-1/2 items-center justify-center rounded-sm bg-black/20 text-white outline-offset-2 hover:bg-black/40 disabled:cursor-not-allowed disabled:opacity-35 sm:left-4 sm:h-16 sm:w-12"
        disabled={activeSlide === 0}
        type="button"
        onClick={() => setActiveSlide((current) => Math.max(current - 1, 0))}
      >
        <ArrowIcon direction="previous" />
      </button>
      <button
        aria-label="Next promotional banner"
        className="absolute right-2 top-1/2 z-10 flex h-12 w-10 -translate-y-1/2 items-center justify-center rounded-sm bg-black/20 text-white outline-offset-2 hover:bg-black/40 disabled:cursor-not-allowed disabled:opacity-35 sm:right-4 sm:h-16 sm:w-12"
        disabled={activeSlide === slides.length - 1}
        type="button"
        onClick={() => setActiveSlide((current) => Math.min(current + 1, slides.length - 1))}
      >
        <ArrowIcon direction="next" />
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2" aria-label="Promotional banner slides">
        {slides.map((item, index) => (
          <button
            aria-label={`Show promotional banner ${index + 1}`}
            aria-current={activeSlide === index ? 'true' : undefined}
            className={`h-2.5 w-2.5 rounded-full border border-white/80 outline-offset-2 ${
              activeSlide === index ? 'bg-white' : 'bg-white/35 hover:bg-white/70'
            }`}
            key={item.title}
            type="button"
            onClick={() => setActiveSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroBanner
