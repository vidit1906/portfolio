"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, FileDown } from 'lucide-react'
import Image from 'next/image'
import { trackDownload, trackSocialClick } from '@/lib/gtag'
import dynamic from 'next/dynamic'

const ParticleBackground = dynamic(() => import('./ParticleBackground'), { ssr: false })

const TypingText = ({ texts, className }: { texts: { text: string; className?: string }[]; className?: string }) => {
  const [displayedChars, setDisplayedChars] = useState(0)
  const fullText = texts.map(t => t.text).join('')

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setDisplayedChars(fullText.length)
      return
    }
    if (displayedChars < fullText.length) {
      const timeout = setTimeout(() => setDisplayedChars(prev => prev + 1), 60)
      return () => clearTimeout(timeout)
    }
  }, [displayedChars, fullText.length])

  let charIndex = 0
  return (
    <span className={className}>
      {texts.map((segment, i) => {
        const start = charIndex
        charIndex += segment.text.length
        const visibleLength = Math.max(0, Math.min(segment.text.length, displayedChars - start))
        return (
          <span key={i} className={segment.className}>
            {segment.text.slice(0, visibleLength)}
          </span>
        )
      })}
      {displayedChars < fullText.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="text-primary"
        >
          |
        </motion.span>
      )}
    </span>
  )
}

const About = () => {
  const handleResumeDownload = () => {
    trackDownload('Vidit_Naik_Resume.pdf')
  }

  const handleSocialClick = (platform: string, url: string) => {
    trackSocialClick(platform)
    window.open(url, '_blank')
  }

  return (
    <section id="about" className="relative min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <ParticleBackground />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Currently at badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-surface border border-border rounded-full mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
              <span className="text-xs text-text-muted">Currently at</span>
              <span className="text-xs text-foreground font-semibold">Checksum AI</span>
            </motion.div>

            {/* Typing headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] mb-4">
              <TypingText
                texts={[
                  { text: 'Hey', className: 'text-foreground' },
                  { text: '.', className: 'text-primary' },
                  { text: '\n', className: '' },
                  { text: "I'm ", className: 'text-foreground' },
                  { text: 'Vidit', className: 'text-accent' },
                ]}
              />
            </h1>

            <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-8 max-w-lg">
              Forward Deployed Engineer building AI-powered products from prototype to production.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                See My Work ↓
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2.5 bg-accent text-accent-foreground rounded-lg text-sm font-bold hover:bg-accent/90 transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
              >
                Let&apos;s Talk
              </motion.a>

              <div className="flex gap-2 ml-1">
                <motion.button
                  onClick={() => handleSocialClick('GitHub', 'https://github.com/vidit1906')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 bg-surface border border-border rounded-lg flex items-center justify-center text-text-muted hover:text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                  aria-label="GitHub"
                >
                  <Github size={16} />
                </motion.button>
                <motion.button
                  onClick={() => handleSocialClick('LinkedIn', 'https://www.linkedin.com/in/viditnaik/')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 bg-surface border border-border rounded-lg flex items-center justify-center text-text-muted hover:text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={16} />
                </motion.button>
                <motion.a
                  href="/vidit-resume.pdf"
                  download="Vidit_Naik_Resume.pdf"
                  onClick={handleResumeDownload}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 bg-surface border border-border rounded-lg flex items-center justify-center text-text-muted hover:text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                  aria-label="Download Resume"
                >
                  <FileDown size={16} />
                </motion.a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="w-40 h-40 md:w-52 md:h-52 lg:w-60 lg:h-60 rounded-[20px] bg-gradient-to-br from-primary to-accent p-[3px] rotate-3">
              <Image
                src="/images/vidit.jpeg"
                alt="Vidit Naik — Forward Deployed Engineer"
                width={240}
                height={240}
                className="w-full h-full rounded-[18px] object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
