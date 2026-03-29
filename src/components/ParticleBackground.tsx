"use client"

import { useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

export default function ParticleBackground() {
  const [ready, setReady] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [particleCount, setParticleCount] = useState(60)

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mql.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    setParticleCount(window.innerWidth < 768 ? 20 : 60)
  }, [])

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setReady(true))
  }, [])

  if (prefersReducedMotion || !ready) return null

  return (
    <Particles
      id="hero-particles"
      options={{
        fullScreen: false,
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: { enable: true, mode: 'grab' },
          },
          modes: {
            grab: { distance: 140, links: { opacity: 0.3 } },
          },
        },
        particles: {
          color: { value: '#3B82F6' },
          links: {
            color: '#3B82F6',
            distance: 150,
            enable: true,
            opacity: 0.15,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.8,
            direction: 'none',
            outModes: { default: 'bounce' },
          },
          number: {
            value: particleCount,
            density: { enable: true },
          },
          opacity: { value: 0.3 },
          shape: { type: 'circle' },
          size: { value: { min: 1, max: 3 } },
        },
      }}
      className="absolute inset-0 z-0"
    />
  )
}
