import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'

import DustParticles from '@/components/DustParticles'

interface HeroSectionProps {
  onLoadComplete?: () => void
}

export default function HeroSection({ onLoadComplete }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const playBtnRef = useRef<HTMLButtonElement>(null)
  const socialRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const [videoOpen, setVideoOpen] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on scroll
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          y: '-30%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      if (titleRef.current) {
        gsap.to(titleRef.current, {
          y: '-50%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      // Entrance animation sequence
      const tl = gsap.timeline({
        delay: 0.3,
        onComplete: () => onLoadComplete?.(),
      })

      // Title words stagger
      const titleWords = titleRef.current?.querySelectorAll('.hero-word')
      if (titleWords) {
        tl.fromTo(
          titleWords,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.12, duration: 1, ease: 'power4.out' }
        )
      }

      // Subtitle
      tl.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )

      // CTAs
      tl.fromTo(
        ctaRef.current?.children || [],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      )

      // Play button
      tl.fromTo(
        playBtnRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.3'
      )

      // Social links
      tl.fromTo(
        socialRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.2'
      )

      // Scroll indicator fade out on scroll
      gsap.to(scrollIndicatorRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '10% top',
          end: '20% top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [onLoadComplete])

  return (
    <>
      <section
        ref={sectionRef}
        className="relative w-full min-h-[100dvh] flex items-center overflow-hidden"
        data-nav-dark
      >
        {/* Background Image */}
        <div
          ref={bgRef}
          className="absolute inset-0 w-full h-[130%]"
          style={{ zIndex: -1 }}
        >
          <img
            src="./assets/hero-background.jpg"
            alt="Luxury car in detailing studio"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Dark Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(13,13,13,0.95) 0%, rgba(13,13,13,0.5) 35%, rgba(13,13,13,0.2) 65%, transparent 100%)',
            zIndex: 0,
          }}
        />

        {/* Dust Particles */}
        <DustParticles />

        {/* Content */}
        <div
          className="relative w-full max-w-[1400px] mx-auto px-5 md:px-10 pt-24 pb-20"
          style={{ zIndex: 2 }}
        >
          {/* Title */}
          <div ref={titleRef}>
            <h1 className="font-druk text-[clamp(48px,9vw,140px)] leading-[0.9] text-white">
              <span className="hero-word block">WE MAKE</span>
              <span className="hero-word block">CARS LOOK</span>
              <span className="hero-word block">GOOD</span>
            </h1>
          </div>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="font-grotesk text-lg text-light-gray max-w-[480px] mt-6"
          >
            Premium car detailing studio based in Klang Valley. From Myvi to
            BMW, we treat every car with the same obsession.
          </p>

          {/* CTA Group */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mt-8">
            <a
              href="https://wa.me/60178493640"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-grotesk font-semibold text-[13px] uppercase tracking-[0.05em] px-7 py-3.5 rounded bg-lime text-void hover:bg-white transition-colors duration-300"
            >
              Book via WhatsApp
              <svg className="ml-2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <button
              onClick={() =>
                document
                  .querySelector('#work')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="inline-flex items-center justify-center font-grotesk font-medium text-[13px] uppercase tracking-wider px-7 py-3.5 rounded border border-muted text-light-gray hover:border-lime hover:text-lime transition-colors duration-300"
            >
              View Our Work
            </button>
          </div>

          {/* Social Links (desktop) */}
          <div
            ref={socialRef}
            className="hidden md:flex items-center gap-6 mt-12"
          >
            <a
              href="https://instagram.com/glossraya"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-muted hover:text-lime transition-colors duration-300"
            >
              @glossraya
            </a>
            <span className="text-muted">|</span>
            <span className="font-mono text-xs text-muted">
              Klang Valley, Selangor
            </span>
          </div>
        </div>

        {/* Video Play Button */}
        <button
          ref={playBtnRef}
          onClick={() => setVideoOpen(true)}
          className="absolute bottom-24 right-8 md:right-16 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: '2px solid rgba(255,255,255,0.3)',
            zIndex: 2,
          }}
          data-cursor-hover
        >
          <img
            src="./assets/video-thumbnail.jpg"
            alt="Watch our work"
            className="absolute inset-1 rounded-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
          />
          <div className="absolute inset-0 rounded-full flex items-center justify-center group-hover:bg-lime/20 transition-colors">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="white"
              className="ml-1"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>

        {/* Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ zIndex: 2 }}
        >
          <span className="font-mono text-[10px] text-muted tracking-[0.2em]">
            SCROLL
          </span>
          <div className="w-px h-10 bg-muted relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-lime animate-scroll-dot" />
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {videoOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(13,13,13,0.95)', zIndex: 9999 }}
          onClick={() => setVideoOpen(false)}
        >
          <button
            className="absolute top-6 right-6 text-white p-2 hover:text-lime transition-colors"
            onClick={() => setVideoOpen(false)}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="4" x2="20" y2="20" />
              <line x1="20" y1="4" x2="4" y2="20" />
            </svg>
          </button>
          <div
            className="w-full max-w-4xl aspect-video bg-surface rounded-lg flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="#CCFF00" className="mx-auto mb-4 opacity-50">
                <path d="M8 5v14l11-7z" />
              </svg>
              <p className="font-grotesk text-light-gray text-lg">Studio Reel Coming Soon</p>
              <p className="font-mono text-muted text-xs mt-2">Contact us to see our latest work</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
