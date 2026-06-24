import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'

import Marquee from 'react-fast-marquee'

const serviceOptions = [
  'Premium Wash',
  'Paint Correction',
  'Ceramic Coating',
  'Interior Deep Clean',
  'Full Package',
  'Not Sure — Advise Me',
]

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    carModel: '',
    service: '',
    message: '',
  })

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll('.contact-header'), {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 75%' },
      })

      gsap.from(el.querySelectorAll('.form-field'), {
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 65%' },
      })

      gsap.from(el.querySelector('.diagonal-text'), {
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 60%' },
      })

      gsap.from(el.querySelectorAll('.info-card'), {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 60%' },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('sending')
    setTimeout(() => setFormState('sent'), 1500)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-lime py-20 md:py-32 px-5 md:px-10 overflow-hidden"
      data-nav-light
    >
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left: Form */}
          <div className="w-full lg:w-1/2">
            <p className="contact-header font-mono font-bold text-xs text-void uppercase tracking-[0.15em] mb-4">
              GET IN TOUCH
            </p>
            <h2 className="contact-header font-druk text-[clamp(40px,5vw,64px)] text-void leading-[0.95] mb-4">
              READY WHEN YOU ARE
            </h2>
            <p className="contact-header font-grotesk text-base text-void/70 mb-10">
              Drop us a message on WhatsApp or fill in the form. We&apos;ll get back
              to you within a few hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="form-field">
                <label className="font-mono font-bold text-[11px] text-void uppercase tracking-wider block mb-2">
                  YOUR NAME
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ahmad / Sarah / etc."
                  className="w-full bg-transparent border-b-2 border-void/30 py-3 font-grotesk text-base text-void placeholder:text-void/40 focus:border-void focus:outline-none transition-colors"
                  disabled={formState === 'sent'}
                />
              </div>

              <div className="form-field">
                <label className="font-mono font-bold text-[11px] text-void uppercase tracking-wider block mb-2">
                  PHONE NUMBER
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="012-345-6789"
                  className="w-full bg-transparent border-b-2 border-void/30 py-3 font-grotesk text-base text-void placeholder:text-void/40 focus:border-void focus:outline-none transition-colors"
                  disabled={formState === 'sent'}
                />
              </div>

              <div className="form-field">
                <label className="font-mono font-bold text-[11px] text-void uppercase tracking-wider block mb-2">
                  CAR MODEL
                </label>
                <input
                  type="text"
                  name="carModel"
                  value={formData.carModel}
                  onChange={handleChange}
                  placeholder="Myvi / X50 / Civic / etc."
                  className="w-full bg-transparent border-b-2 border-void/30 py-3 font-grotesk text-base text-void placeholder:text-void/40 focus:border-void focus:outline-none transition-colors"
                  disabled={formState === 'sent'}
                />
              </div>

              <div className="form-field">
                <label className="font-mono font-bold text-[11px] text-void uppercase tracking-wider block mb-2">
                  WHAT DO YOU NEED?
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-void/30 py-3 font-grotesk text-base text-void focus:border-void focus:outline-none transition-colors cursor-pointer"
                  disabled={formState === 'sent'}
                >
                  <option value="" className="bg-lime text-void">Select a service</option>
                  {serviceOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-lime text-void">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label className="font-mono font-bold text-[11px] text-void uppercase tracking-wider block mb-2">
                  ANYTHING ELSE?
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your car's condition..."
                  rows={4}
                  className="w-full bg-transparent border-b-2 border-void/30 py-3 font-grotesk text-base text-void placeholder:text-void/40 focus:border-void focus:outline-none transition-colors resize-none"
                  disabled={formState === 'sent'}
                />
              </div>

              <button
                type="submit"
                disabled={formState !== 'idle'}
                className="form-field w-full font-grotesk font-semibold text-sm uppercase tracking-wider py-4 border-2 border-void text-void transition-all duration-300 hover:bg-void hover:text-lime disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formState === 'idle' && 'Send Message'}
                {formState === 'sending' && 'Sending...'}
                {formState === 'sent' && 'Message Sent!'}
              </button>
            </form>
          </div>

          {/* Right: Diagonal text + Info cards */}
          <div className="w-full lg:w-1/2 relative">
            {/* Diagonal watermark text */}
            <div
              className="diagonal-text absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden lg:block"
              style={{
                transform: 'translateY(-50%) rotate(-5deg)',
                opacity: 0.15,
              }}
            >
              <p className="font-druk text-[clamp(60px,10vw,140px)] text-void leading-[0.85]">
                YOUR CAR
                <br />
                DESERVES
                <br />
                IT
              </p>
            </div>

            {/* Info Cards */}
            <div className="relative z-10 space-y-4 lg:mt-20">
              <a
                href="https://wa.me/60178493640"
                target="_blank"
                rel="noopener noreferrer"
                className="info-card block bg-void/5 rounded-lg px-6 py-5 hover:bg-void/10 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#0D0D0D" className="mb-2">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <p className="font-mono font-bold text-[11px] text-void/60 uppercase">
                  WHATSAPP
                </p>
                <p className="font-grotesk font-semibold text-base text-void">
                  017-8493640
                </p>
              </a>

              <div className="info-card bg-void/5 rounded-lg px-6 py-5">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0D0D0D" strokeWidth="2" className="mb-2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <p className="font-mono font-bold text-[11px] text-void/60 uppercase">
                  LOCATION
                </p>
                <p className="font-grotesk font-semibold text-base text-void">
                  Shah Alam, Selangor
                </p>
                <p className="font-grotesk text-[13px] text-void/60 mt-1">
                  Servicing Klang Valley & surrounding areas
                </p>
              </div>

              <div className="info-card bg-void/5 rounded-lg px-6 py-5">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0D0D0D" strokeWidth="2" className="mb-2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <p className="font-mono font-bold text-[11px] text-void/60 uppercase">
                  OPENING HOURS
                </p>
                <p className="font-grotesk font-semibold text-base text-void">
                  Tue – Sun: 9AM – 7PM
                </p>
                <p className="font-grotesk text-[13px] text-void/60 mt-1">
                  Closed on Mondays
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom marquee strip */}
      <div className="absolute bottom-0 left-0 right-0 bg-void py-4">
        <Marquee speed={80} gradient={false}>
          <span className="font-druk text-[clamp(24px,6vw,72px)] text-lime mx-6 leading-none py-2">
            YOUR CAR DESERVES IT — BOOK NOW — YOUR CAR DESERVES IT — BOOK NOW —
          </span>
          <span className="font-druk text-[clamp(24px,6vw,72px)] text-lime mx-6 leading-none py-2">
            YOUR CAR DESERVES IT — BOOK NOW — YOUR CAR DESERVES IT — BOOK NOW —
          </span>
        </Marquee>
      </div>
    </section>
  )
}
