import { useRef, useEffect } from 'react'
import gsap from 'gsap'


const packages = [
  {
    name: 'DAILY RESET',
    price: '180',
    desc: 'Perfect for daily drivers that need a proper refresh.',
    features: [
      'Premium hand wash & dry',
      'Wheel & tyre deep clean',
      'Interior vacuum & wipe down',
      'Dashboard & trim dressing',
      'Glass cleaning inside & out',
      'Tyre dressing',
    ],
    popular: false,
    msg: "Hi%20GlossRaya!%20I'm%20interested%20in%20the%20Daily%20Reset%20package.",
  },
  {
    name: 'GLOSS CORRECTION',
    price: '580',
    desc: 'Our most popular package. For cars that need paint love.',
    features: [
      'Everything in Daily Reset',
      'Single-stage paint correction',
      'Swirl mark & light scratch removal',
      'Clay bar decontamination',
      '6-month sealant application',
      'Paint depth measurement',
    ],
    popular: true,
    msg: "Hi%20GlossRaya!%20I'm%20interested%20in%20the%20Gloss%20Correction%20package.",
  },
  {
    name: 'COATING PREP',
    price: '1,200',
    desc: 'The full treatment. Showroom finish that lasts years.',
    features: [
      'Everything in Gloss Correction',
      'Multi-stage paint correction',
      '2-year ceramic coating',
      'Full interior deep clean',
      'Engine bay detail',
      'Headlamp restoration',
    ],
    popular: false,
    msg: "Hi%20GlossRaya!%20I'm%20interested%20in%20the%20Coating%20Prep%20package.",
  },
]

export default function PackagesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      // Header
      gsap.from(el.querySelectorAll('.pkg-header'), {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 80%' },
      })

      // Cards alternate entrance
      const cards = el.querySelectorAll('.pkg-card')
      cards.forEach((card, i) => {
        const fromX = i === 0 ? -60 : i === 2 ? 60 : 0
        const fromY = i === 1 ? 40 : 0
        gsap.from(card, {
          x: fromX,
          y: fromY,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 70%' },
        })
      })

      // Popular badge pop
      const badge = el.querySelector('.pkg-badge')
      if (badge) {
        gsap.from(badge, {
          scale: 0,
          duration: 0.4,
          delay: 0.5,
          ease: 'back.out(2)',
          scrollTrigger: { trigger: el, start: 'top 70%' },
        })
      }
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="packages"
      className="bg-void py-20 md:py-32 px-5 md:px-10"
      data-nav-dark
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <p className="pkg-header font-mono font-bold text-xs text-lime uppercase tracking-[0.15em] mb-4">
          INVESTMENT
        </p>
        <h2 className="pkg-header font-druk text-[clamp(40px,6vw,72px)] text-white mb-4">
          PACKAGES & PRICING
        </h2>
        <p className="pkg-header font-grotesk text-base text-light-gray max-w-[600px] mb-12">
          No hidden fees. No upselling. Just honest work at fair prices. Every
          package includes a pre-detail inspection so we know exactly what your
          car needs.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <div
              key={i}
              className="pkg-card glass-edge rounded-xl p-8 md:p-10 relative transition-all duration-400 hover:-translate-y-1.5 lime-glow-hover group"
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <span
                  className="pkg-badge absolute -top-3 right-6 font-mono font-bold text-[11px] uppercase px-4 py-1.5 rounded bg-lime text-void"
                >
                  POPULAR
                </span>
              )}

              {/* Package name */}
              <h3 className="font-druk text-[28px] text-white mb-2">{pkg.name}</h3>

              {/* Price */}
              <div className="mb-3">
                <span className="font-mono text-sm text-muted">From RM</span>
                <span className="font-mono font-bold text-4xl text-lime ml-2">
                  {pkg.price}
                </span>
              </div>

              {/* Description */}
              <p className="font-grotesk text-sm text-light-gray mb-6">
                {pkg.desc}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feat, fi) => (
                  <li
                    key={fi}
                    className="font-grotesk text-sm text-light-gray flex items-start gap-3"
                  >
                    <span className="text-lime mt-0.5 flex-shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    {feat}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={`https://wa.me/60178493640?text=${pkg.msg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center font-grotesk font-medium text-[13px] uppercase tracking-wider py-3.5 rounded border border-muted text-light-gray hover:border-lime hover:text-lime transition-colors duration-300"
              >
                Book This Package
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
