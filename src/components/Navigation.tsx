import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsMobile } from '@/hooks/useMediaQuery'
import MobileMenuOverlay from './MobileMenuOverlay'

const navLinks = [
  { label: 'WORK', href: '#work' },
  { label: 'SERVICES', href: '#services' },
  { label: 'PACKAGES', href: '#packages' },
  { label: 'PROCESS', href: '#process' },
  { label: 'CONTACT', href: '#contact' },
]

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const [hasBg, setHasBg] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [navColor, setNavColor] = useState<'light' | 'dark'>('light')
  const lastScroll = useRef(0)
  const isMobile = useIsMobile()

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY
      setHasBg(current > 100)
      setHidden(current > lastScroll.current && current > 200)
      lastScroll.current = current
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Watch sections to change nav color
    const darkSections = document.querySelectorAll('[data-nav-dark]')
    const lightSections = document.querySelectorAll('[data-nav-light]')

    const triggers: ScrollTrigger[] = []

    darkSections.forEach((section) => {
      triggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: 'top 80px',
          end: 'bottom 80px',
          onEnter: () => setNavColor('light'),
          onEnterBack: () => setNavColor('light'),
        })
      )
    })

    lightSections.forEach((section) => {
      triggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: 'top 80px',
          end: 'bottom 80px',
          onEnter: () => setNavColor('dark'),
          onEnterBack: () => setNavColor('dark'),
        })
      )
    })

    return () => {
      triggers.forEach((t) => t.kill())
    }
  }, [])

  useEffect(() => {
    if (navRef.current) {
      gsap.to(navRef.current, {
        y: hidden ? '-100%' : '0%',
        duration: 0.5,
        ease: 'power2.out',
      })
    }
  }, [hidden])

  const scrollTo = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full transition-colors duration-300"
        style={{
          zIndex: 999,
          backgroundColor: hasBg
            ? 'rgba(26, 26, 26, 0.95)'
            : 'transparent',
          backdropFilter: hasBg ? 'blur(10px)' : 'none',
        }}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between h-20 md:h-20 px-5 md:px-10">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 group"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform duration-300 group-hover:scale-110"
            >
              <path
                d="M2 2L14 8L2 14V2Z"
                fill="#CCFF00"
                stroke="#CCFF00"
                strokeWidth="1"
                strokeLinejoin="round"
              />
            </svg>
            <span
              className="font-druk text-lg tracking-wider"
              style={{
                color: navColor === 'light' ? '#FFFFFF' : '#0D0D0D',
              }}
            >
              GLOSSRAYA
            </span>
          </button>

          {/* Desktop Nav Links */}
          {!isMobile && (
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="font-grotesk font-medium text-[13px] uppercase tracking-[0.1em] transition-colors duration-300 hover:text-tangerine"
                  style={{
                    color: navColor === 'light' ? '#E5E5E5' : '#0D0D0D',
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          )}

          {/* CTA + Mobile Menu */}
          <div className="flex items-center gap-4">
            {!isMobile && (
              <a
                href="https://wa.me/60178493640"
                target="_blank"
                rel="noopener noreferrer"
                className="font-grotesk font-semibold text-[13px] uppercase tracking-[0.05em] px-6 py-3 rounded transition-colors duration-300 hover:bg-white"
                style={{
                  backgroundColor: '#CCFF00',
                  color: '#0D0D0D',
                }}
              >
                Book via WhatsApp
              </a>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <button
                onClick={() => setMobileOpen(true)}
                className="flex flex-col items-center justify-center gap-1 p-2"
                aria-label="Open menu"
              >
                <span
                  className="w-1 h-1 rounded-full transition-colors duration-200"
                  style={{
                    backgroundColor:
                      navColor === 'light' ? '#FFFFFF' : '#0D0D0D',
                  }}
                />
                <span
                  className="w-1 h-1 rounded-full transition-colors duration-200"
                  style={{
                    backgroundColor:
                      navColor === 'light' ? '#FFFFFF' : '#0D0D0D',
                  }}
                />
                <span
                  className="w-1 h-1 rounded-full transition-colors duration-200"
                  style={{
                    backgroundColor:
                      navColor === 'light' ? '#FFFFFF' : '#0D0D0D',
                  }}
                />
              </button>
            )}
          </div>
        </div>
      </nav>

      <MobileMenuOverlay
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onNavigate={scrollTo}
      />
    </>
  )
}
