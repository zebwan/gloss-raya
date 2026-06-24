import { useRef, useEffect } from 'react'
import gsap from 'gsap'

import Marquee from 'react-fast-marquee'

export default function IntroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleLinesRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const ghostRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      // Title lines entrance
      const lines = titleLinesRef.current?.querySelectorAll('.intro-line')
      if (lines) {
        gsap.from(lines, {
          y: 50,
          opacity: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 75%',
          },
        })
      }

      // Body + CTA
      gsap.from(bodyRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 60%',
        },
      })

      // Car image
      gsap.from(imageRef.current, {
        x: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 70%',
        },
      })

      // Ghost text breathing
      if (ghostRef.current) {
        gsap.to(ghostRef.current, {
          opacity: 0.5,
          duration: 3,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })
      }
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-lime overflow-hidden" data-nav-light>
      {/* Rolling Marquee at top */}
      <div className="bg-lime py-4 md:py-5 relative overflow-visible" style={{ zIndex: 10 }}>
        <Marquee speed={70} gradient={false} autoFill className="overflow-visible">
          <span className="font-druk block text-[clamp(36px,12vw,100px)] text-void mx-8 leading-[1.05] py-3">
            GLOSSRAYA — Klang Valley&apos;s Finest —
          </span>
        </Marquee>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-16 md:py-24 min-h-[80vh] flex flex-col md:flex-row items-center">
        {/* Left: Text */}
        <div className="w-full md:w-[55%] relative z-10">
          <div ref={titleLinesRef}>
            <span className="intro-line block font-druk text-[clamp(48px,8vw,120px)] text-void leading-[0.95]">
              THAT NEW
            </span>
            <span
              ref={ghostRef}
              className="intro-line block font-druk text-[clamp(48px,8vw,120px)] leading-[0.95]"
              style={{ color: '#B8E600' }}
            >
              CAR FEELING
            </span>
            <span className="intro-line block font-druk text-[clamp(48px,8vw,120px)] text-void leading-[0.95]">
              NEVER FADES
            </span>
          </div>

          <div ref={bodyRef} className="mt-8 max-w-[440px]">
            <p className="font-grotesk text-lg text-void leading-relaxed">
              Every car that rolls through our doors gets treated like it&apos;s our
              own. We don&apos;t do rushed jobs. We don&apos;t skip the hard-to-reach
              spots. We detail because we actually care about how your car looks
              when you drive it home.
            </p>
            <a
              href="https://wa.me/60178493640"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-8 font-grotesk font-semibold text-sm uppercase tracking-wider px-10 py-4 border-2 border-void text-void hover:bg-void hover:text-lime transition-colors duration-300"
            >
              Book Your Slot
            </a>
          </div>
        </div>

        {/* Right: Car Image with mix-blend-mode */}
        <div
          ref={imageRef}
          className="w-full md:w-[45%] mt-10 md:mt-0 md:absolute md:right-0 md:top-0 md:h-full"
        >
          <img
            src="./assets/intro-car-multiply.jpg"
            alt="Dark sports car"
            className="w-full md:w-auto md:h-full md:max-w-none object-cover mx-auto md:mx-0"
            style={{ mixBlendMode: 'multiply', maxHeight: '70vh' }}
          />
        </div>
      </div>
    </section>
  )
}
