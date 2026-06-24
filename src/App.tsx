import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Navigation from '@/components/Navigation'
import CustomCursor from '@/components/CustomCursor'
import WhatsAppFAB from '@/components/WhatsAppFAB'
import Footer from '@/components/Footer'
import HeroSection from '@/sections/HeroSection'
import IntroSection from '@/sections/IntroSection'
import ServicesSection from '@/sections/ServicesSection'
import WorkGallerySection from '@/sections/WorkGallerySection'
import PackagesSection from '@/sections/PackagesSection'
import ProcessSection from '@/sections/ProcessSection'
import USPSection from '@/sections/USPSection'
import FAQSection from '@/sections/FAQSection'
import ContactSection from '@/sections/ContactSection'

function App() {
  const [loading, setLoading] = useState(true)
  const preloaderRef = useRef<HTMLDivElement>(null)
  const heroReadyRef = useRef(false)
  const lenisRef = useRef<Lenis | null>(null)

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    })
    lenisRef.current = lenis

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf as any)
    }
  }, [])

  // Preloader exit animation
  const handleHeroReady = useCallback(() => {
    heroReadyRef.current = true
    if (!preloaderRef.current) return

    gsap.to(preloaderRef.current, {
      y: '-100%',
      duration: 0.8,
      ease: 'power3.inOut',
      onComplete: () => setLoading(false),
    })
  }, [])

  // Auto-exit preloader after max 3s
  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) {
        handleHeroReady()
      }
    }, 3000)
    return () => clearTimeout(timer)
  }, [loading, handleHeroReady])

  return (
    <>
      {/* Preloader */}
      {loading && (
        <div
          ref={preloaderRef}
          className="fixed inset-0 bg-void flex items-center justify-center"
          style={{ zIndex: 9999 }}
        >
          <span
            className="font-druk text-5xl text-white animate-pulse"
            style={{ animationDuration: '1s' }}
          >
            GLOSSRAYA
          </span>
        </div>
      )}

      {/* Custom Cursor (desktop only) */}
      <CustomCursor />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main>
        <HeroSection onLoadComplete={handleHeroReady} />
        <IntroSection />
        <ServicesSection />
        <WorkGallerySection />
        <PackagesSection />
        <ProcessSection />
        <USPSection />
        <FAQSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile WhatsApp FAB */}
      <WhatsAppFAB />
    </>
  )
}

export default App
