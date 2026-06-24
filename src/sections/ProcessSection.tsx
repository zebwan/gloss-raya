import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useIsDesktop } from '@/hooks/useMediaQuery'

const steps = [
  {
    num: '01',
    label: 'STEP ONE',
    title: 'QUICK CHECK',
    desc: "We walk around your car and take photos of every panel. We mark scratches, swirl marks, stains, and anything that needs attention. No surprises — you'll know exactly what we're dealing with before we start.",
    duration: '10-15 MINUTES',
  },
  {
    num: '02',
    label: 'STEP TWO',
    title: 'WASH & DECON',
    desc: 'Snow foam pre-wash, two-bucket hand wash, clay bar treatment to remove bonded contaminants, iron fallout removal, and tar spot cleaning. We get the paint cleaner than the day it left the factory.',
    duration: '1-2 HOURS',
  },
  {
    num: '03',
    label: 'STEP THREE',
    title: 'CORRECTION & CLEANING',
    desc: 'Machine polishing to remove defects — from light single-stage work to heavy multi-stage correction. Interior gets the same attention: steam clean, extraction, leather treatment, and odour neutralisation.',
    duration: '3-6 HOURS',
  },
  {
    num: '04',
    label: 'STEP FOUR',
    title: 'PROTECTION',
    desc: 'Ceramic coating or sealant application depending on your package. We apply in a controlled environment with proper lighting and curing time. Every panel gets checked under LED before we move on.',
    duration: '2-4 HOURS',
  },
  {
    num: '05',
    label: 'STEP FIVE',
    title: 'FINAL CHECK & HANDOVER',
    desc: "We inspect every panel under our LED light setup. We take after photos and walk you through what was done. You'll drive away knowing exactly what your car got.",
    duration: '15-20 MINUTES',
  },
]

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isDesktop = useIsDesktop()

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll('.process-header'), {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 80%' },
      })

      if (!isDesktop) return

      const cards = Array.from(el.querySelectorAll<HTMLElement>('.desktop-process-card'))
      const inactiveScale = 0.9
      const inactiveBrightness = 0.45
      const inactiveOpacity = 0.48

      gsap.set(cards, {
        scale: inactiveScale,
        opacity: inactiveOpacity,
        filter: `brightness(${inactiveBrightness})`,
        transformOrigin: 'center top',
      })

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            y: 56,
            scale: inactiveScale,
            opacity: inactiveOpacity,
            filter: `brightness(${inactiveBrightness})`,
          },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            filter: 'brightness(1)',
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              end: 'top 58%',
              scrub: true,
            },
          }
        )

        if (index < cards.length - 1) {
          gsap.to(card, {
            scale: inactiveScale,
            opacity: inactiveOpacity,
            filter: `brightness(${inactiveBrightness})`,
            ease: 'none',
            scrollTrigger: {
              trigger: cards[index + 1],
              start: 'top 86%',
              end: 'top 58%',
              scrub: true,
            },
          })
        }
      })
    }, el)

    return () => ctx.revert()
  }, [isDesktop])

  return (
    <section
      ref={sectionRef}
      id="process"
      className="bg-void py-20 md:py-32 overflow-visible"
      data-nav-dark
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        {isDesktop ? (
          <div className="flex gap-12">
            {/* Sticky Title (desktop) */}
            <div className="w-[35%] flex-shrink-0">
              <div className="sticky top-32">
                <p className="process-header font-mono font-bold text-xs text-lime uppercase tracking-[0.15em] mb-4">
                  THE PROCESS
                </p>
                <h2 className="process-header font-druk text-[clamp(48px,6vw,80px)] text-white leading-[0.95]">
                  HOW
                  <br />
                  WE
                  <br />
                  DO IT
                </h2>
              </div>
            </div>

            {/* Desktop Process Cards */}
            <div className="w-[65%] space-y-7">
              {steps.map((step) => (
                <div
                  key={step.num}
                  className="desktop-process-card relative bg-surface rounded-2xl border-l-4 border-lime overflow-hidden p-12"
                >
                  <span className="absolute top-6 right-10 font-druk text-[clamp(64px,8vw,120px)] text-lime/15 select-none pointer-events-none leading-none">
                    {step.num}
                  </span>
                  <span className="font-mono font-bold text-xs text-lime uppercase tracking-[0.12em]">
                    {step.label}
                  </span>
                  <h3 className="font-druk text-[32px] text-white mt-2 mb-3 pr-24">
                    {step.title}
                  </h3>
                  <p className="font-grotesk text-base text-light-gray max-w-[520px] leading-relaxed">
                    {step.desc}
                  </p>
                  <span className="inline-block mt-4 font-mono text-[11px] text-muted uppercase">
                    {step.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {/* Mobile header */}
            <div className="mb-8">
              <p className="process-header font-mono font-bold text-[10px] text-lime uppercase tracking-[0.15em] mb-4">
                THE PROCESS
              </p>
              <h2 className="process-header font-druk text-[clamp(40px,11vw,58px)] text-white leading-[0.92]">
                HOW WE DO IT
              </h2>
            </div>

            {/* Mobile Stacking Cards */}
            <div className="relative pb-[36vh]">
              {steps.map((step, index) => (
                <article
                  key={step.num}
                  className="mobile-stack-card sticky mb-5 min-h-[255px] overflow-hidden rounded-2xl border border-white/8 border-l-4 border-lime bg-surface p-5 shadow-[0_18px_60px_rgba(0,0,0,0.5)]"
                  style={{
                    top: `${86 + index * 12}px`,
                    zIndex: index + 1,
                  }}
                >
                  <span className="absolute -top-1 right-4 font-druk text-[82px] text-lime/12 select-none pointer-events-none leading-none">
                    {step.num}
                  </span>
                  <span className="font-mono font-bold text-[10px] text-lime uppercase tracking-[0.13em]">
                    {step.label}
                  </span>
                  <h3 className="font-druk text-[30px] text-white mt-2 mb-3 pr-14 leading-none">
                    {step.title}
                  </h3>
                  <p className="font-grotesk text-[13px] text-light-gray/85 leading-relaxed pr-1">
                    {step.desc}
                  </p>
                  <span className="inline-block mt-4 font-mono text-[9px] text-muted uppercase tracking-[0.08em]">
                    {step.duration}
                  </span>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
