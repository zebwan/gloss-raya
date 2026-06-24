import { useRef, useEffect } from 'react'
import gsap from 'gsap'


export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = footerRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll('.footer-item'), {
        y: 30,
        opacity: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer
      ref={footerRef}
      className="bg-void pt-20 pb-10 px-5 md:px-10"
      data-nav-dark
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          {/* Brand */}
          <div className="footer-item">
            <div className="flex items-center gap-2 mb-4">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 2L14 8L2 14V2Z" fill="#CCFF00" stroke="#CCFF00" strokeWidth="1" strokeLinejoin="round" />
              </svg>
              <span className="font-druk text-lg text-white tracking-wider">GLOSSRAYA</span>
            </div>
            <p className="font-grotesk text-sm text-light-gray leading-relaxed">
              Klang Valley&apos;s boldest detailing crew.
            </p>
          </div>

          {/* Nav Links */}
          <div className="footer-item">
            <p className="font-mono font-bold text-xs text-muted uppercase tracking-wider mb-4">Navigate</p>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Work', href: '#work' },
                { label: 'Services', href: '#services' },
                { label: 'Packages', href: '#packages' },
                { label: 'Process', href: '#process' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="font-grotesk text-sm text-light-gray hover:text-tangerine transition-colors duration-300 text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="footer-item">
            <p className="font-mono font-bold text-xs text-muted uppercase tracking-wider mb-4">Follow</p>
            <a
              href="https://instagram.com/glossraya"
              target="_blank"
              rel="noopener noreferrer"
              className="font-grotesk text-sm text-light-gray hover:text-lime transition-colors duration-300 flex items-center gap-2"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              @glossraya
            </a>
          </div>
        </div>

        {/* Large Typography */}
        <div className="footer-item mb-16">
          <h2 className="font-druk text-[clamp(60px,10vw,120px)] leading-[0.9] text-surface select-none">
            GLOSS RAYA
          </h2>
          <h2 className="font-druk text-[clamp(60px,10vw,120px)] leading-[0.9] text-white select-none">
            AUTO STUDIO
          </h2>
        </div>

        {/* Bottom Bar */}
        <div className="footer-item flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-graphite">
          <p className="font-mono text-[11px] text-muted">
            &copy; 2026 GlossRaya Auto Studio. All rights reserved.
          </p>
          <p className="font-mono text-[11px] text-muted">
            Designed by Shazwan
          </p>
        </div>
      </div>
    </footer>
  )
}
