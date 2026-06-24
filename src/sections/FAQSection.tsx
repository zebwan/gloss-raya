import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'


const faqs = [
  {
    q: 'How long does a full detail take?',
    a: "A Daily Reset takes about 2-3 hours. Gloss Correction is usually a full day job (6-8 hours). Coating Prep can take 1-2 days depending on the paint condition and coating cure time. We'll give you a realistic time estimate during the quick check.",
  },
  {
    q: 'Do I need to book in advance?',
    a: "Yes — we work by appointment so we can give each car our full attention. Weekends fill up fast, so we recommend booking at least 3-5 days ahead. For coating jobs, a week's notice is ideal. Drop us a WhatsApp to check availability.",
  },
  {
    q: 'What if it rains right after my coating?',
    a: "We coat indoors in a controlled space, and we give the coating proper cure time before you drive off. Light rain within the first 24 hours won't ruin the coating, but we recommend avoiding heavy rain and car washes for the first 7 days. We'll give you a full aftercare guide when you collect your car.",
  },
]

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll('.faq-header'), {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 80%' },
      })

      gsap.from(el.querySelectorAll('.faq-panel'), {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 70%' },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx)
  }

  return (
    <section
      ref={sectionRef}
      className="bg-void py-20 md:py-32 px-5 md:px-10"
      data-nav-dark
    >
      <div className="max-w-[900px] mx-auto">
        {/* Header */}
        <p className="faq-header font-mono font-bold text-xs text-lime uppercase tracking-[0.15em] mb-4">
          FAQ
        </p>
        <h2 className="faq-header font-druk text-[clamp(40px,6vw,72px)] text-white mb-12">
          GOT QUESTIONS?
        </h2>

        {/* Panels */}
        <div className="space-y-0">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i
            return (
              <div
                key={i}
                className={`faq-panel border-b border-graphite transition-colors duration-300 ${
                  isOpen ? 'bg-graphite' : 'bg-surface'
                }`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between p-7 md:px-8 text-left group"
                >
                  <h3 className="font-druk text-xl md:text-2xl text-white pr-4 group-hover:text-lime transition-colors duration-300">
                    {faq.q}
                  </h3>
                  <div className="flex-shrink-0 w-5 h-5 relative">
                    <span className="absolute top-1/2 left-0 w-full h-0.5 bg-lime -translate-y-1/2" />
                    <span
                      className="absolute top-0 left-1/2 w-0.5 h-full bg-lime -translate-x-1/2 transition-transform duration-500"
                      style={{
                        transform: `translateX(-50%) rotate(${isOpen ? 90 : 0}deg)`,
                        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                    />
                  </div>
                </button>

                <div
                  className="overflow-hidden transition-all duration-500"
                  style={{
                    maxHeight: isOpen ? '400px' : '0px',
                    transitionTimingFunction: 'cubic-bezier(0.65, 0, 0.35, 1)',
                  }}
                >
                  <div className="px-7 md:px-8 pb-8">
                    <p
                      className="font-grotesk text-base text-light-gray leading-relaxed"
                      style={{
                        opacity: isOpen ? 1 : 0,
                        transition: 'opacity 0.3s ease 0.2s',
                      }}
                    >
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
