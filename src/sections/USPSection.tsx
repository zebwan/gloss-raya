import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { Clock, MessageCircle, Eye } from 'lucide-react'

const usps = [
  {
    icon: Clock,
    title: "WE DON'T RUSH",
    desc: "A proper detail takes time. We don't squeeze jobs in or cut corners to finish faster. Your car gets the full attention it deserves, every single time.",
    bg: '#2D1F1F',
  },
  {
    icon: MessageCircle,
    title: 'WE EXPLAIN WHAT WE DO',
    desc: "No jargon, no mystery. We tell you exactly what your car needs and why. You'll understand every step before we touch a single panel.",
    bg: '#1F2D2D',
  },
  {
    icon: Eye,
    title: 'WE NOTICE THE DETAILS',
    desc: 'Door jambs, fuel caps, under seals — the areas most quick washes skip. We check under LED lights before handover. If it\'s not right, we redo it.',
    bg: '#1F1F2D',
  },
]

export default function USPSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll('.usp-header'), {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 80%' },
      })

      el.querySelectorAll('.usp-card').forEach((card) => {
        gsap.from(card, {
          y: 36,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
        })
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-surface py-16 md:py-32 px-5 md:px-10"
      data-nav-dark
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <p className="usp-header font-mono font-bold text-xs text-lime uppercase tracking-[0.15em] mb-4">
          WHY US
        </p>
        <h2 className="usp-header font-druk text-[clamp(40px,6vw,72px)] text-white mb-8 md:mb-12">
          BUILT DIFFERENT
        </h2>

        {/* Cards - Clean grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {usps.map((usp, i) => {
            const Icon = usp.icon
            return (
              <div
                key={i}
                className="usp-card rounded-xl p-7 md:p-10 min-h-[220px] md:min-h-[260px] flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] group"
                style={{ backgroundColor: usp.bg }}
              >
                <Icon
                  className="text-lime mb-5 flex-shrink-0"
                  size={36}
                  strokeWidth={1.5}
                />
                <h3 className="font-druk text-xl md:text-2xl text-white mb-3">
                  {usp.title}
                </h3>
                <p className="font-grotesk text-sm text-white/70 leading-relaxed">
                  {usp.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
