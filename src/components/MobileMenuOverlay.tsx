import { useRef, useEffect } from 'react'
import gsap from 'gsap'

interface MobileMenuOverlayProps {
  isOpen: boolean
  onClose: () => void
  onNavigate: (href: string) => void
}

const navLinks = [
  { label: 'WORK', href: '#work' },
  { label: 'SERVICES', href: '#services' },
  { label: 'PACKAGES', href: '#packages' },
  { label: 'PROCESS', href: '#process' },
  { label: 'CONTACT', href: '#contact' },
]

export default function MobileMenuOverlay({
  isOpen,
  onClose,
  onNavigate,
}: MobileMenuOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const el = overlayRef.current
    if (!el) return

    if (isOpen) {
      if (tlRef.current) tlRef.current.kill()
      gsap.set(el, { display: 'flex', pointerEvents: 'auto' })
      tlRef.current = gsap.timeline()
      tlRef.current.fromTo(
        el,
        { y: '-100%' },
        { y: '0%', duration: 0.6, ease: 'power3.inOut' }
      )
      tlRef.current.fromTo(
        el.querySelectorAll('.menu-link'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: 'power3.out' },
        '-=0.3'
      )
      document.body.style.overflow = 'hidden'
    } else {
      if (tlRef.current) tlRef.current.kill()
      gsap.to(el, {
        y: '-100%',
        duration: 0.5,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(el, { display: 'none', pointerEvents: 'none' })
        },
      })
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleNav = (href: string) => {
    onNavigate(href)
    onClose()
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 flex-col items-center justify-center px-5"
      style={{
        display: 'none',
        pointerEvents: 'none',
        backgroundColor: '#1A1A1A',
        zIndex: 1002,
      }}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-5 right-5 text-white p-4 z-[1004] hover:text-lime transition-colors"
        aria-label="Close menu"
        style={{ touchAction: 'manipulation' }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="4" y1="4" x2="20" y2="20" />
          <line x1="20" y1="4" x2="4" y2="20" />
        </svg>
      </button>

      {/* Brand mark */}
      <div className="absolute top-8 left-5 flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M2 2L14 8L2 14V2Z"
            fill="#CCFF00"
            stroke="#CCFF00"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </svg>
        <span className="font-druk text-lg tracking-wider text-white">GLOSSRAYA</span>
      </div>

      {/* Nav links */}
      <div className="flex flex-col items-center gap-6">
        {navLinks.map((link) => (
          <button
            key={link.href}
            type="button"
            onClick={() => handleNav(link.href)}
            className="menu-link font-druk text-4xl text-white hover:text-lime transition-colors duration-300"
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* WhatsApp CTA */}
      <a
        href="https://wa.me/60178493640"
        target="_blank"
        rel="noopener noreferrer"
        className="menu-link mt-10 font-grotesk font-semibold text-sm uppercase tracking-wider px-8 py-4 rounded"
        style={{ backgroundColor: '#CCFF00', color: '#0D0D0D' }}
      >
        Book via WhatsApp
      </a>
    </div>
  )
}
