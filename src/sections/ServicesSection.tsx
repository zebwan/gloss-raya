import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'


const categories = ['ALL', 'EXTERIOR', 'INTERIOR', 'PROTECTION']

const services = [
  {
    name: 'PREMIUM WASH',
    desc: 'Deep clean that removes traffic film, tar, and bonded contaminants. Two-bucket method with pH-neutral snow foam.',
    cat: 'EXTERIOR',
    img: './assets/service-wash.jpg',
  },
  {
    name: 'PAINT CORRECTION',
    desc: 'Multi-stage machine polishing to remove swirl marks, scratches, and oxidation. Restores clarity and depth.',
    cat: 'EXTERIOR',
    img: './assets/service-correction.jpg',
  },
  {
    name: 'CERAMIC COATING',
    desc: 'Nano-ceramic protection that lasts 2-5 years. Hydrophobic finish, UV resistance, and insane gloss levels.',
    cat: 'PROTECTION',
    img: './assets/service-coating.jpg',
  },
  {
    name: 'INTERIOR DEEP CLEAN',
    desc: 'Full vacuum, steam clean, leather treatment, and odour removal. We get into the gaps most places ignore.',
    cat: 'INTERIOR',
    img: './assets/service-interior.jpg',
  },
  {
    name: 'ENGINE BAY DETAIL',
    desc: 'Degrease, agitation, and dress. Your engine bay will look as clean as the day it left the showroom.',
    cat: 'EXTERIOR',
    img: './assets/service-engine.jpg',
  },
  {
    name: 'HEADLAMP RESTORE',
    desc: 'Remove yellowing and oxidation from headlights. Sand, polish, and seal for crystal-clear night visibility.',
    cat: 'EXTERIOR',
    img: './assets/service-headlamp.jpg',
  },
  {
    name: 'GLASS POLISH & SEAL',
    desc: 'Remove water spots and fine scratches from windshield and windows. Hydrophobic coating for clearer drives in Malaysian rain.',
    cat: 'PROTECTION',
    img: './assets/service-glass.jpg',
  },
]

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeFilter, setActiveFilter] = useState('ALL')
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from(el.querySelectorAll('.services-header'), {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 80%' },
      })

      // Cards stagger
      gsap.from(el.querySelectorAll('.service-card'), {
        y: 60,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 70%' },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll('.service-card')
    cards.forEach((card) => {
      const cat = (card as HTMLElement).dataset.category
      const match = activeFilter === 'ALL' || cat === activeFilter
      gsap.to(card, {
        opacity: match ? 1 : 0.3,
        scale: match ? 1 : 0.98,
        duration: 0.4,
        ease: 'power2.out',
      })
    })
  }, [activeFilter])

  return (
    <section
      ref={sectionRef}
      id="services"
      className="bg-void py-20 md:py-32 px-5 md:px-10"
      data-nav-dark
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <p className="services-header font-mono font-bold text-xs text-lime uppercase tracking-[0.15em] mb-4">
          WHAT WE DO
        </p>
        <h2 className="services-header font-druk text-[clamp(40px,6vw,72px)] text-white mb-12">
          DETAILING SERVICES
        </h2>

        {/* Filter */}
        <div className="services-header flex flex-wrap gap-6 md:gap-8 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className="font-druk text-lg transition-colors duration-300 relative"
              style={{
                color: activeFilter === cat ? '#FFFFFF' : '#4A4A4A',
              }}
            >
              {cat}
              {activeFilter === cat && (
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-lime" />
              )}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((s, i) => (
            <div
              key={i}
              data-category={s.cat}
              className="service-card group relative bg-graphite rounded-lg inset-shadow overflow-hidden transition-transform duration-300 hover:-translate-y-1"
            >
              {/* Lime accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-lime rounded-l-lg opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400" />

              {/* Image */}
              <div className="aspect-[16/10] overflow-hidden m-4 mb-0 rounded-md">
                <img
                  src={s.img}
                  alt={s.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6 pt-5">
                <h3 className="font-druk text-2xl text-white group-hover:text-lime transition-colors duration-300">
                  {s.name}
                </h3>
                <p className="font-grotesk text-sm text-light-gray mt-3 line-clamp-2">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
