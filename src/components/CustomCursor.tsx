import { useRef, useEffect, useState } from 'react'
import { useIsDesktop } from '@/hooks/useMediaQuery'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function CustomCursor() {
  const isDesktop = useIsDesktop()
  const reducedMotion = useReducedMotion()
  const cursorRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!isDesktop || reducedMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const targetEl = e.target as HTMLElement
      if (
        targetEl.closest('a') ||
        targetEl.closest('button') ||
        targetEl.closest('[data-cursor-hover]')
      ) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const targetEl = e.target as HTMLElement
      if (
        targetEl.closest('a') ||
        targetEl.closest('button') ||
        targetEl.closest('[data-cursor-hover]')
      ) {
        setIsHovering(false)
      }
    }

    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15
      pos.current.y += (target.current.y - pos.current.y) * 0.15

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      cancelAnimationFrame(rafRef.current)
    }
  }, [isDesktop, reducedMotion])

  if (!isDesktop || reducedMotion) return null

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none"
      style={{ zIndex: 8888 }}
    >
      <div
        className="rounded-full transition-all duration-300 ease-out"
        style={{
          width: isHovering ? 40 : 12,
          height: isHovering ? 40 : 12,
          backgroundColor: isHovering ? 'transparent' : '#CCFF00',
          border: isHovering ? '2px solid #CCFF00' : 'none',
        }}
      />
    </div>
  )
}
