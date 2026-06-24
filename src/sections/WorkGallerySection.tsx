import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'

import Marquee from 'react-fast-marquee'
import { useIsDesktop } from '@/hooks/useMediaQuery'

const galleryItems = [
  {
    img: './assets/gallery-myvi.jpg',
    title: 'Daily Myvi Refresh',
    desc: 'Paint correction + ceramic coating',
  },
  {
    img: './assets/gallery-x50.jpg',
    title: 'X50 Coating Prep',
    desc: 'Full decon + 2-year ceramic',
  },
  {
    img: './assets/gallery-civic.jpg',
    title: 'Civic Paint Rescue',
    desc: '2-stage correction + coating',
  },
  {
    img: './assets/gallery-vios.jpg',
    title: 'Vios Interior Rescue',
    desc: 'Deep clean + odour treatment',
  },
]

export default function WorkGallerySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const mobileSliderRef = useRef<HTMLDivElement>(null)
  const isDesktop = useIsDesktop()
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [activeMobileIdx, setActiveMobileIdx] = useState(0)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll('.gallery-header'), {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 75%' },
      })

      gsap.from(el.querySelectorAll('.gallery-item'), {
        y: 80,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 70%' },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const slider = mobileSliderRef.current
    if (!slider || isDesktop) return

    const updateActiveCard = () => {
      const cards = Array.from(slider.querySelectorAll<HTMLElement>('.mobile-gallery-card'))
      const sliderCenter = slider.scrollLeft + slider.clientWidth / 2

      let closestIdx = 0
      let closestDistance = Number.POSITIVE_INFINITY

      cards.forEach((card, idx) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2
        const distance = Math.abs(sliderCenter - cardCenter)

        if (distance < closestDistance) {
          closestDistance = distance
          closestIdx = idx
        }
      })

      setActiveMobileIdx(closestIdx)
    }

    updateActiveCard()
    slider.addEventListener('scroll', updateActiveCard, { passive: true })
    window.addEventListener('resize', updateActiveCard)

    return () => {
      slider.removeEventListener('scroll', updateActiveCard)
      window.removeEventListener('resize', updateActiveCard)
    }
  }, [isDesktop])

  const getItemWidth = (idx: number) => {
    if (!isDesktop || hoveredIdx === null) return '33.333%'
    if (hoveredIdx === idx) return '50%'
    return '25%'
  }

  return (
    <section
      ref={sectionRef}
      id="work"
      className="bg-tangerine py-16 md:py-32 px-5 md:px-10 overflow-hidden"
      data-nav-light
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <p className="gallery-header font-mono font-bold text-[10px] md:text-xs text-void uppercase tracking-[0.15em] mb-4">
          PROOF
        </p>
        <h2 className="gallery-header font-druk text-[clamp(36px,6vw,72px)] text-void mb-3 md:mb-4">
          REAL RESULTS
        </h2>
        <p className="gallery-header font-grotesk text-sm md:text-base text-void/70 mb-8 md:mb-12 max-w-lg leading-relaxed">
          Scroll through some of the cars we&apos;ve brought back to life.
        </p>

        {/* Desktop Gallery Grid */}
        {isDesktop && (
          <div className="flex gap-5">
            {galleryItems.slice(0, 3).map((item, idx) => (
              <div
                key={idx}
                className="gallery-item relative overflow-hidden rounded-lg cursor-pointer"
                style={{
                  width: getItemWidth(idx),
                  flex: `0 0 ${getItemWidth(idx)}`,
                  transition: 'flex 0.6s cubic-bezier(0.65, 0, 0.35, 1)',
                }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <div className="aspect-[3/4] overflow-hidden rounded-lg">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                {/* Caption */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent transition-all duration-400"
                  style={{
                    opacity: hoveredIdx === idx ? 1 : 0.9,
                    transform: hoveredIdx === idx ? 'translateY(0)' : 'translateY(0)',
                  }}
                >
                  <p className="font-mono font-bold text-xs text-white uppercase">
                    {item.title}
                  </p>
                  <p className="font-grotesk text-xs text-white/70 mt-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mobile Center-Focus Slider */}
        {!isDesktop && (
          <div className="gallery-item -mx-5">
            <div
              ref={mobileSliderRef}
              className="flex gap-4 overflow-x-auto px-5 pb-5 pt-2 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {galleryItems.map((item, idx) => {
                const isActive = activeMobileIdx === idx

                return (
                  <article
                    key={item.title}
                    className={`mobile-gallery-card relative shrink-0 w-[72vw] max-w-[310px] min-w-[235px] overflow-hidden rounded-lg snap-center transition-all duration-500 ease-out ${
                      isActive
                        ? 'scale-100 opacity-100 shadow-[0_18px_50px_rgba(0,0,0,0.3)]'
                        : 'scale-[0.86] opacity-70'
                    }`}
                  >
                    <div className="aspect-[3/4] overflow-hidden rounded-lg bg-void">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent px-4 pb-4 pt-12">
                      <p className="font-mono font-bold text-[10px] text-white uppercase tracking-[0.08em]">
                        {item.title}
                      </p>
                      <p className="font-grotesk text-[11px] leading-snug text-white/70 mt-1">
                        {item.desc}
                      </p>
                    </div>
                  </article>
                )
              })}
            </div>

            <div className="mt-1 flex justify-center gap-2">
              {galleryItems.map((item, idx) => (
                <span
                  key={item.title}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeMobileIdx === idx ? 'w-6 bg-void' : 'w-1.5 bg-void/30'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Rolling marquee at bottom */}
      <div className="mt-12 md:mt-16 -mx-5 md:-mx-10">
        <Marquee speed={80} gradient={false}>
          <span className="font-druk text-[clamp(24px,6vw,72px)] text-void/10 mx-6 leading-none py-2">
            BEFORE & AFTER — REAL RESULTS — TRUST THE PROCESS —
          </span>
          <span className="font-druk text-[clamp(24px,6vw,72px)] text-void/10 mx-6 leading-none py-2">
            BEFORE & AFTER — REAL RESULTS — TRUST THE PROCESS —
          </span>
        </Marquee>
      </div>
    </section>
  )
}
