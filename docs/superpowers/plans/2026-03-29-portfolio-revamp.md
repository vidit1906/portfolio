# Portfolio Revamp Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the existing portfolio from a standard light/dark template into a bold "Electric Pop" design with vivid blue + amber palette, interactive elements (particles, 3D tilt, scroll-driven timeline, magnetic cursor), and a dark-only theme.

**Architecture:** Modify existing Next.js 16 + Tailwind components in-place. Add new dependencies for particles, 3D tilt, and icons. Replace CSS variable system and remove light theme. Add new SkillsGrid component and useMagneticHover hook.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 3, Framer Motion 12, @tsparticles/react, react-parallax-tilt, @iconify/react

**Spec:** `docs/superpowers/specs/2026-03-29-portfolio-revamp-design.md`

---

## File Structure

**Modified files:**
- `package.json` — add/remove dependencies
- `tailwind.config.ts` — new color palette, remove unused color keys
- `src/app/globals.css` — replace CSS variables, remove light theme, update scrollbar
- `src/app/layout.tsx` — remove ThemeProvider, hardcode dark class
- `src/app/page.tsx` — add SkillsGrid between Projects and Education
- `src/components/Header.tsx` — glassmorphism nav, remove theme toggle, magnetic hover
- `src/components/About.tsx` — full hero rewrite: typing, badge, particles, new layout
- `src/components/Experience.tsx` — scroll-driven timeline with gradient line
- `src/components/Projects.tsx` — spotlight carousel with 3D tilt
- `src/components/Education.tsx` — gradient border cards, GPA data
- `src/components/Contact.tsx` — restyle to dark palette, glowing inputs
- `src/components/Footer.tsx` — gradient divider, "V." logo
- `src/components/AIChatbot.tsx` — restyle colors only
- `src/components/ScrollToTop.tsx` — no change needed (renders null)

**New files:**
- `src/components/ParticleBackground.tsx` — tsparticles wrapper for hero
- `src/components/SkillsGrid.tsx` — categorized skills with filter tabs
**Deleted files:**
- `src/components/theme-provider.tsx` — no longer needed

---

## Chunk 1: Foundation (Theme, Palette, Dependencies)

### Task 1: Install new dependencies and remove old ones

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install new packages**

```bash
npm install @tsparticles/react @tsparticles/slim react-parallax-tilt @iconify/react
```

- [ ] **Step 2: Remove unused packages**

```bash
npm uninstall next-themes @emailjs/browser
```

- [ ] **Step 3: Verify build still works**

Run: `npm run build`
Expected: Build succeeds (will have theme-provider import errors — that's expected, we fix in next tasks)

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: update dependencies for portfolio revamp"
```

### Task 2: Replace CSS variable system with new palette

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace the entire globals.css**

Replace the `:root` and `.dark` blocks with a single `:root` block using the new palette. Remove the `.dark` block entirely. Update scrollbar colors. Keep existing animations and utility classes but update them to use new variables.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 240 20% 4%;
    --foreground: 0 0% 100%;
    --surface: 240 17% 8%;
    --primary: 217 91% 60%;
    --primary-foreground: 0 0% 100%;
    --accent: 22 88% 69%;
    --accent-foreground: 240 20% 4%;
    --tertiary: 160 60% 52%;
    --border: 240 27% 14%;
    --input: 240 27% 14%;
    --ring: 217 91% 60%;
    --radius: 0.5rem;
    --text-secondary: 0 0% 73%;
    --text-muted: 0 0% 60%;
    --text-dim: 0 0% 47%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
    font-family: var(--font-inter), system-ui, sans-serif;
  }

  html {
    scroll-behavior: smooth;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: hsl(var(--surface));
}

::-webkit-scrollbar-thumb {
  background: hsl(var(--primary) / 0.5);
  border-radius: 9999px;
}

::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--primary) / 0.7);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Verify the file is saved correctly**

Run: `head -5 src/app/globals.css`
Expected: Shows `@tailwind base;` lines

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: replace CSS variables with Electric Pop dark palette"
```

### Task 3: Update Tailwind config for new palette

**Files:**
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Replace the tailwind.config.ts colors and clean up**

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: "hsl(var(--surface))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        tertiary: "hsl(var(--tertiary))",
        "text-secondary": "hsl(var(--text-secondary))",
        "text-muted": "hsl(var(--text-muted))",
        "text-dim": "hsl(var(--text-dim))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: Commit**

```bash
git add tailwind.config.ts
git commit -m "feat: update Tailwind config with new color palette"
```

### Task 4: Remove ThemeProvider and hardcode dark mode

**Files:**
- Modify: `src/app/layout.tsx`
- Delete: `src/components/theme-provider.tsx`

- [ ] **Step 1: Rewrite layout.tsx**

Remove `ThemeProvider` import and wrapper. Hardcode `className="dark"` on `<html>`. Keep everything else (GoogleAnalytics, ScrollToTop, AIChatbot).

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ScrollToTop from '@/components/ScrollToTop';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import AIChatbot from '@/components/AIChatbot';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Vidit - Software Engineer Portfolio",
  description: "Software Engineer passionate about building innovative solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ScrollToTop />
        {children}
        <AIChatbot />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Delete theme-provider.tsx**

```bash
rm src/components/theme-provider.tsx
```

- [ ] **Step 3: Verify build succeeds**

Run: `npm run build`
Expected: Build succeeds with no ThemeProvider errors

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx
git rm src/components/theme-provider.tsx
git commit -m "feat: remove ThemeProvider, hardcode dark-only theme"
```

### Task 5: Create ParticleBackground component

**Files:**
- Create: `src/components/ParticleBackground.tsx`

- [ ] **Step 1: Write the particle background component**

```tsx
"use client"

import { useCallback, useEffect, useState } from 'react'
import Particles from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { Engine } from '@tsparticles/engine'

export default function ParticleBackground() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mql.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  const [particleCount, setParticleCount] = useState(60)

  useEffect(() => {
    setParticleCount(window.innerWidth < 768 ? 20 : 60)
  }, [])

  if (prefersReducedMotion) return null

  return (
    <Particles
      id="hero-particles"
      init={particlesInit}
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ParticleBackground.tsx
git commit -m "feat: add ParticleBackground component for hero section"
```

---

## Chunk 2: Header, Hero, Experience

### Task 7: Rewrite Header component

**Files:**
- Modify: `src/components/Header.tsx`

- [ ] **Step 1: Rewrite Header with glassmorphism, no theme toggle, magnetic hover**

```tsx
"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = ['about', 'experience', 'projects', 'skills', 'education', 'contact']
      for (const id of sections.reverse()) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <motion.a
            href="#about"
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-extrabold text-foreground"
          >
            V<span className="text-primary">.</span>
          </motion.a>

          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ scale: 1.05 }}
                className={`transition-colors text-sm font-medium ${
                  activeSection === item.href.slice(1)
                    ? 'text-primary'
                    : 'text-text-muted hover:text-foreground'
                }`}
              >
                {item.name}
              </motion.a>
            ))}
          </nav>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-surface border border-border"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 border-t border-border overflow-hidden"
            >
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  whileHover={{ x: 10 }}
                  className={`block py-3 transition-colors ${
                    activeSection === item.href.slice(1)
                      ? 'text-primary'
                      : 'text-text-muted hover:text-foreground'
                  }`}
                >
                  {item.name}
                </motion.a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

export default Header
```

- [ ] **Step 2: Verify no import errors**

Run: `npx tsc --noEmit src/components/Header.tsx 2>&1 | head -20`

- [ ] **Step 3: Commit**

```bash
git add src/components/Header.tsx
git commit -m "feat: rewrite Header with glassmorphism nav, active section tracking"
```

### Task 8: Rewrite Hero (About) component

**Files:**
- Modify: `src/components/About.tsx`

- [ ] **Step 1: Full rewrite of About.tsx with typing animation, particle bg, "Currently at" badge**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/About.tsx
git commit -m "feat: rewrite hero with typing animation, particle bg, currently-at badge"
```

### Task 9: Rewrite Experience with scroll-driven timeline

**Files:**
- Modify: `src/components/Experience.tsx`

- [ ] **Step 1: Rewrite Experience.tsx with gradient timeline, scroll-driven animations**

```tsx
"use client"

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const experiences = [
    {
      title: 'Forward Deployed Engineer',
      company: 'Checksum AI',
      period: 'November 2025 - Present',
      color: 'primary',
      description: [
        'Leading end-to-end delivery of AI products into client software, managing design, launch, and enablement.',
        'Architecting self-healing QA pipelines by integrating LLM models like Claude to automatically analyze DOM changes and patch broken selectors.',
        'Developing internal AI tools using LLM agents to ensure uniform code quality across multiple codebases.',
        'Primary technical liaison for enterprise clients, leading design sessions, demos, and workshops.',
      ],
    },
    {
      title: 'Software Engineer - AI/ML',
      company: 'Shifa Precision Inc.',
      period: 'July 2025 - November 2025',
      color: 'accent',
      description: [
        'Led backend development of Project Oasis — patient "digital twins" on AWS and Neo4j.',
        'Built knowledge graph with 1M+ nodes and 10M+ relationships from biomedical data sources.',
        'Implemented LLM-based biomedical entity extraction achieving 95% accuracy.',
      ],
    },
    {
      title: 'Student Researcher',
      company: 'Center for Robotics and Intelligent Systems',
      period: 'October 2024 - March 2025',
      color: 'tertiary',
      description: [
        'Developed LLM-powered drone control system via natural language commands.',
        'Built RAG pipeline with LangChain, increasing command accuracy by 68%.',
        'Agile/Scrum development process with focus on quality and scalability.',
      ],
    },
    {
      title: 'Machine Learning Engineer',
      company: 'Kent Cam',
      period: 'May 2022 - June 2022',
      color: 'primary',
      description: [
        'Utilized data analytics to optimize camera feature integration.',
        'Automated cross-region data pipelines, reducing validation errors by 35%.',
        'Ensured 99.9% data integrity across multiple data streams.',
      ],
    },
    {
      title: 'Software Engineer',
      company: 'StuDetails',
      period: 'July 2020 - February 2021',
      color: 'accent',
      description: [
        'Built scalable web app with React & Flask serving 5,000+ monthly users across 50+ locations.',
        'Optimized AWS S3 workflows with AWS Glue, improving data accuracy by 25%.',
        'Implemented CI/CD pipelines, cutting deployment failures by 30%.',
      ],
    },
  ]

  const colorMap: Record<string, string> = {
    primary: 'bg-primary',
    accent: 'bg-accent',
    tertiary: 'bg-tertiary',
  }

  const textColorMap: Record<string, string> = {
    primary: 'text-primary',
    accent: 'text-accent',
    tertiary: 'text-tertiary',
  }

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-[3px] uppercase text-primary font-semibold">Career</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mt-2">Experience</h2>
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* Timeline track */}
          <div className="absolute left-[7px] md:left-[11px] top-0 bottom-0 w-[2px] bg-border">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-primary via-accent to-tertiary"
            />
          </div>

          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-8 md:pl-10"
              >
                {/* Timeline node */}
                <div className={`absolute left-0 md:left-[3px] top-2 w-[16px] h-[16px] rounded-full ${colorMap[exp.color]} border-[3px] border-background`} />

                <div className="bg-surface border border-border rounded-xl p-5 hover:border-border/80 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <div>
                      <h3 className="text-base font-bold text-foreground">{exp.title}</h3>
                      <p className={`text-sm font-semibold ${textColorMap[exp.color]}`}>{exp.company}</p>
                    </div>
                    <span className="text-xs text-text-dim mt-1 md:mt-0">{exp.period}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-sm text-text-secondary flex items-start">
                        <span className={`mr-2 mt-1.5 w-1 h-1 rounded-full flex-shrink-0 ${colorMap[exp.color]}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Experience.tsx
git commit -m "feat: rewrite Experience with scroll-driven gradient timeline"
```

---

## Chunk 3: Projects, Skills, Education

### Task 10: Rewrite Projects as spotlight carousel with 3D tilt

**Files:**
- Modify: `src/components/Projects.tsx`

- [ ] **Step 1: Full rewrite of Projects.tsx**

```tsx
"use client"

import { useState, useCallback } from 'react'
import { motion, AnimatePresence, type PanInfo } from 'framer-motion'
import { Github, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Tilt from 'react-parallax-tilt'
import { event as trackEvent } from '@/lib/gtag'

const Projects = () => {
  const [current, setCurrent] = useState(0)

  const projects = [
    {
      title: 'LLM-Powered Drone Control System',
      description: 'AI-powered system integrating drones with LLMs for natural language control. Uses RAG to boost command accuracy by 68%.',
      image: '/images/projects/llm-drone.png',
      technologies: ['LangChain', 'RAG', 'Python', 'ChromaDB'],
      github: 'https://github.com/vidit1906/llmdronecontrol',
      tagColors: ['primary', 'accent', 'tertiary', 'primary'],
    },
    {
      title: 'InsureSearch: RAG AI Chatbot',
      description: 'Deployed RAG and fine-tuned LLaMA-3 to boost response accuracy. Reduced token usage by 65% with top-k BERT search and 4-bit quantization.',
      image: '/images/projects/insure-search.jpeg',
      technologies: ['RAG', 'LLaMA-3', 'BERT', 'LoRA'],
      github: 'https://github.com/dhrumilankola/LLama3_Hackathon',
      tagColors: ['accent', 'primary', 'tertiary', 'accent'],
    },
    {
      title: 'CitySafe: Crime Insights Dashboard',
      description: 'Analytics dashboard processing 1.5M+ records with SQL, Spark, and PostGIS. Geospatial visualizations reducing query time by 25%.',
      image: '/images/projects/city-safe.png',
      technologies: ['SQL', 'Spark', 'PostGIS', 'React'],
      github: 'https://github.com/sreekar9601/chicago-crime-analysis',
      tagColors: ['primary', 'accent', 'tertiary', 'primary'],
    },
    {
      title: 'CreateFlow - CalHacks 11.0',
      description: 'Multi-agent system with LangGraph linking AI agents for content, scheduling & analytics, cutting creation time by 50%.',
      image: '/images/projects/create-flow.png',
      technologies: ['LangGraph', 'Multi-Agent', 'LLaMA-3', 'LoRA'],
      github: 'https://github.com/dhrumilankola/Calhacks11_CreateFlow',
      tagColors: ['accent', 'primary', 'primary', 'accent'],
    },
    {
      title: 'PRRP Graph Partitioning',
      description: 'Reimplementation of spatial regionalization with a novel PRRP algorithm module for graph data structures.',
      image: '/images/projects/prrp.jpeg',
      technologies: ['Python', 'Graph Theory', 'Statistics', 'Spatial Data'],
      github: 'https://github.com/sreekar9601/graph-partitioning-prrp',
      tagColors: ['tertiary', 'primary', 'accent', 'tertiary'],
    },
  ]

  const navigate = useCallback((dir: number) => {
    setCurrent(prev => {
      const next = (prev + dir + projects.length) % projects.length
      trackEvent({ action: 'project_navigate', category: 'carousel', label: projects[next].title })
      return next
    })
  }, [projects.length])

  const handleDragEnd = useCallback((_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -50) navigate(1)
    else if (info.offset.x > 50) navigate(-1)
  }, [navigate])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') navigate(-1)
    if (e.key === 'ArrowRight') navigate(1)
  }, [navigate])

  const colorClasses: Record<string, string> = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    accent: 'bg-accent/10 text-accent border-accent/20',
    tertiary: 'bg-tertiary/10 text-tertiary border-tertiary/20',
  }

  const project = projects[current]

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-[3px] uppercase text-primary font-semibold">Portfolio</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mt-2">Projects</h2>
        </motion.div>

        <div
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="bg-surface border border-border rounded-2xl p-6 md:p-8 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          role="region"
          aria-label="Project carousel"
          aria-roledescription="carousel"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            >
              {/* Preview card with 3D tilt */}
              <Tilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                glareEnable={true}
                glareMaxOpacity={0.1}
                glareColor="#3B82F6"
                glarePosition="all"
                className="rounded-xl overflow-hidden"
              >
                <div className="relative aspect-[16/10] bg-background rounded-xl overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    fill
                    className="object-cover"
                  />
                </div>
              </Tilt>

              {/* Info panel */}
              <div>
                <span className="text-[10px] tracking-[2px] uppercase text-primary font-semibold">Featured Project</span>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mt-2 mb-3">{project.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className={`text-xs px-2.5 py-1 rounded-md border ${colorClasses[project.tagColors[i] || 'primary']}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  <Github size={16} />
                  View on GitHub
                </motion.a>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(-1)}
              className="w-9 h-9 bg-background border border-border rounded-lg flex items-center justify-center text-text-muted hover:text-foreground transition-colors"
              aria-label="Previous project"
            >
              <ChevronLeft size={16} />
            </motion.button>

            <div className="flex gap-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    i === current ? 'bg-primary' : 'bg-border hover:bg-text-dim'
                  }`}
                  aria-label={`Go to project ${i + 1}`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(1)}
              className="w-9 h-9 bg-background border border-border rounded-lg flex items-center justify-center text-text-muted hover:text-foreground transition-colors"
              aria-label="Next project"
            >
              <ChevronRight size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Projects.tsx
git commit -m "feat: rewrite Projects as spotlight carousel with 3D tilt"
```

### Task 11: Create SkillsGrid component

**Files:**
- Create: `src/components/SkillsGrid.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Write SkillsGrid.tsx**

```tsx
"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'
import { event as trackEvent } from '@/lib/gtag'

type Category = 'All' | 'AI / ML' | 'Frontend' | 'Backend' | 'Cloud & DevOps' | 'Databases' | 'Testing'

interface Skill {
  name: string
  icon: string
  bg: string
  category: Category[]
}

const skills: Skill[] = [
  { name: 'PyTorch', icon: 'simple-icons:pytorch', bg: '#EE4C2C', category: ['AI / ML'] },
  { name: 'LangChain', icon: 'simple-icons:langchain', bg: '#1C3C3C', category: ['AI / ML'] },
  { name: 'RAG', icon: 'simple-icons:openai', bg: '#3B82F6', category: ['AI / ML'] },
  { name: 'Claude', icon: 'simple-icons:anthropic', bg: '#D97757', category: ['AI / ML'] },
  { name: 'Gemini', icon: 'simple-icons:googlegemini', bg: '#4285F4', category: ['AI / ML'] },
  { name: 'LoRA', icon: 'simple-icons:huggingface', bg: '#FFD21E', category: ['AI / ML'] },
  { name: 'Ollama', icon: 'simple-icons:ollama', bg: '#FFFFFF', category: ['AI / ML'] },
  { name: 'React', icon: 'simple-icons:react', bg: '#61DAFB', category: ['Frontend'] },
  { name: 'JavaScript', icon: 'simple-icons:javascript', bg: '#F7DF1E', category: ['Backend'] },
  { name: 'Python', icon: 'simple-icons:python', bg: '#3776AB', category: ['Backend'] },
  { name: 'Java', icon: 'simple-icons:openjdk', bg: '#ED8B00', category: ['Backend'] },
  { name: 'Node.js', icon: 'simple-icons:nodedotjs', bg: '#339933', category: ['Backend'] },
  { name: 'Spring Boot', icon: 'simple-icons:springboot', bg: '#6DB33F', category: ['Backend'] },
  { name: 'Flask', icon: 'simple-icons:flask', bg: '#FFFFFF', category: ['Backend'] },
  { name: 'Django', icon: 'simple-icons:django', bg: '#092E20', category: ['Backend'] },
  { name: 'AWS', icon: 'simple-icons:amazonwebservices', bg: '#FF9900', category: ['Cloud & DevOps'] },
  { name: 'GCP', icon: 'simple-icons:googlecloud', bg: '#4285F4', category: ['Cloud & DevOps'] },
  { name: 'Docker', icon: 'simple-icons:docker', bg: '#2496ED', category: ['Cloud & DevOps'] },
  { name: 'Kubernetes', icon: 'simple-icons:kubernetes', bg: '#326CE5', category: ['Cloud & DevOps'] },
  { name: 'Jenkins', icon: 'simple-icons:jenkins', bg: '#D24939', category: ['Cloud & DevOps'] },
  { name: 'Git', icon: 'simple-icons:git', bg: '#F05032', category: ['Cloud & DevOps'] },
  { name: 'MySQL', icon: 'simple-icons:mysql', bg: '#4479A1', category: ['Databases'] },
  { name: 'MongoDB', icon: 'simple-icons:mongodb', bg: '#47A248', category: ['Databases'] },
  { name: 'Neo4j', icon: 'simple-icons:neo4j', bg: '#018BFF', category: ['Databases'] },
  { name: 'Spark', icon: 'simple-icons:apachespark', bg: '#E25A1C', category: ['Databases'] },
  { name: 'Hadoop', icon: 'simple-icons:apachehadoop', bg: '#FF6600', category: ['Databases'] },
  { name: 'Playwright', icon: 'simple-icons:playwright', bg: '#2EAD33', category: ['Testing'] },
  { name: 'PyTest', icon: 'simple-icons:pytest', bg: '#0A9EDC', category: ['Testing'] },
  { name: 'JUnit', icon: 'simple-icons:junit5', bg: '#25A162', category: ['Testing'] },
  { name: 'Selenium', icon: 'simple-icons:selenium', bg: '#43B02A', category: ['Testing'] },
]

const categories: Category[] = ['All', 'AI / ML', 'Frontend', 'Backend', 'Cloud & DevOps', 'Databases', 'Testing']

const categoryColors: Record<string, string> = {
  'All': 'bg-primary text-primary-foreground',
  'AI / ML': 'bg-primary text-primary-foreground',
  'Frontend': 'bg-primary text-primary-foreground',
  'Backend': 'bg-accent text-accent-foreground',
  'Cloud & DevOps': 'bg-tertiary text-background',
  'Databases': 'bg-primary text-primary-foreground',
  'Testing': 'bg-accent text-accent-foreground',
}

export default function SkillsGrid() {
  const [active, setActive] = useState<Category>('All')

  const handleFilter = (cat: Category) => {
    setActive(cat)
    trackEvent({ action: 'skill_filter', category: 'skills', label: cat })
  }

  const filtered = active === 'All' ? skills : skills.filter(s => s.category.includes(active))

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-xs tracking-[3px] uppercase text-primary font-semibold">What I Work With</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mt-2">Tech Stack</h2>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleFilter(cat)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                active === cat
                  ? categoryColors[cat]
                  : 'bg-surface border border-border text-text-muted hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3">
          <AnimatePresence mode="popLayout">
            {filtered.map(skill => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.08 }}
                className="bg-surface border border-border rounded-xl p-3 text-center cursor-default group"
              >
                <div
                  className="w-9 h-9 mx-auto mb-2 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: skill.bg + '20' }}
                >
                  <Icon icon={skill.icon} width={20} height={20} style={{ color: skill.bg }} />
                </div>
                <span className="text-[11px] text-text-secondary font-medium group-hover:text-foreground transition-colors">{skill.name}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add SkillsGrid to page.tsx**

Update `src/app/page.tsx` to import and render SkillsGrid between Projects and Education:

```tsx
import Header from '@/components/Header'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import SkillsGrid from '@/components/SkillsGrid'
import Education from '@/components/Education'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <About />
      <Experience />
      <Projects />
      <SkillsGrid />
      <Education />
      <Contact />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/SkillsGrid.tsx src/app/page.tsx
git commit -m "feat: add SkillsGrid with categorized filter tabs and icons"
```

### Task 12: Rewrite Education with gradient borders

**Files:**
- Modify: `src/components/Education.tsx`

- [ ] **Step 1: Rewrite Education.tsx**

```tsx
"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'

const Education = () => {
  const education = [
    {
      degree: 'Master of Science in Computer Science',
      school: 'University of California, Riverside',
      period: 'March 2025',
      gpa: '3.63',
      color: 'primary',
      coursework: ['ML', 'AI', 'Distributed Systems', 'Design Patterns', 'OS', 'Networking'],
      logo: '/images/schools/ucr-logo.png',
    },
    {
      degree: "Bachelor's in Computer Science and Engineering",
      school: 'Vellore Institute of Technology, Chennai',
      period: 'August 2023',
      gpa: null,
      color: 'accent',
      coursework: ['OOP', 'DSA', 'Networking', 'DBMS', 'SDLC'],
      logo: '/images/schools/vit-logo.png',
    },
  ]

  const tagColor: Record<string, string> = {
    primary: 'bg-primary/10 text-primary',
    accent: 'bg-accent/10 text-accent',
  }

  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-[3px] uppercase text-primary font-semibold">Background</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mt-2">Education</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -4 }}
              className="group relative bg-surface border border-border rounded-xl p-6 hover:border-transparent transition-all duration-300"
            >
              {/* Gradient border on hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary via-accent to-tertiary opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-[1px]" />
              <div className="absolute inset-[1px] rounded-[11px] bg-surface -z-10" />

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-background border border-border rounded-lg flex items-center justify-center flex-shrink-0">
                  <Image src={edu.logo} alt={`${edu.school} logo`} width={28} height={28} className="object-contain" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">{edu.school}</h3>
                  <p className={`text-xs font-semibold ${edu.color === 'primary' ? 'text-primary' : 'text-accent'}`}>
                    {edu.degree}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4 text-xs text-text-dim">
                <span>{edu.period}</span>
                {edu.gpa && <span>GPA: {edu.gpa}</span>}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {edu.coursework.map((course, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${tagColor[edu.color]}`}
                  >
                    {course}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Education.tsx
git commit -m "feat: rewrite Education with gradient borders and GPA data"
```

---

## Chunk 4: Contact, Footer, Chatbot, Final Polish

### Task 13: Restyle Contact section

**Files:**
- Modify: `src/components/Contact.tsx`

- [ ] **Step 1: Rewrite Contact.tsx with new palette, glowing inputs**

```tsx
"use client"

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { trackContactForm } from '@/lib/gtag'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactForm = z.infer<typeof contactSchema>

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactForm) => {
    trackContactForm()
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (response.ok) {
        alert("Message sent successfully! I'll get back to you soon.")
        reset()
      } else {
        throw new Error('Failed to send email')
      }
    } catch {
      const subject = encodeURIComponent(`Portfolio Contact: ${data.subject}`)
      const body = encodeURIComponent(
        `Hi Vidit,\n\nName: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\nMessage:\n${data.message}`
      )
      window.open(`mailto:viditnaik@gmail.com?subject=${subject}&body=${body}`, '_blank')
      alert("There was an issue sending the email. I've opened your email client with the message pre-filled.")
      reset()
    }
  }

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'viditnaik@gmail.com', href: 'mailto:viditnaik@gmail.com', color: 'bg-primary/10 text-primary' },
    { icon: MapPin, label: 'Location', value: 'San Francisco, CA', href: '#', color: 'bg-accent/10 text-accent' },
    { icon: Phone, label: 'Phone', value: '+1 (951) 425-7229', href: 'tel:+19514257229', color: 'bg-tertiary/10 text-tertiary' },
  ]

  const inputClasses = 'w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-text-dim text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all'

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-[3px] uppercase text-primary font-semibold">Reach Out</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mt-2">Get In Touch</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.href}
                whileHover={{ x: 6 }}
                className="flex items-center gap-4 p-4 bg-surface border border-border rounded-xl hover:border-primary/30 transition-colors"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${info.color}`}>
                  <info.icon size={18} />
                </div>
                <div>
                  <p className="text-xs text-text-dim">{info.label}</p>
                  <p className="text-sm text-foreground font-medium">{info.value}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input {...register('name')} className={inputClasses} placeholder="Your name" />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <input {...register('email')} type="email" className={inputClasses} placeholder="your@email.com" />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>
              <div>
                <input {...register('subject')} className={inputClasses} placeholder="Subject" />
                {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
              </div>
              <div>
                <textarea {...register('message')} rows={5} className={`${inputClasses} resize-none`} placeholder="Your message..." />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Contact.tsx
git commit -m "feat: restyle Contact with dark palette and glowing inputs"
```

### Task 14: Rewrite Footer

**Files:**
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Rewrite Footer.tsx with gradient divider and V. logo**

```tsx
"use client"

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'

const Footer = () => {
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/vidit1906', icon: Github },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/viditnaik/', icon: Linkedin },
    { name: 'Email', url: 'mailto:viditnaik@gmail.com', icon: Mail },
  ]

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        {/* Gradient divider */}
        <div className="w-48 h-[2px] mx-auto mb-8 rounded-full bg-gradient-to-r from-primary via-accent to-tertiary" />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <span className="text-xl font-extrabold text-foreground">V<span className="text-primary">.</span></span>
        </motion.div>

        <div className="flex justify-center gap-3 mb-6">
          {socialLinks.map(link => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 bg-surface border border-border rounded-lg flex items-center justify-center text-text-muted hover:text-foreground transition-colors"
              aria-label={link.name}
            >
              <link.icon size={16} />
            </motion.a>
          ))}
        </div>

        <p className="text-xs text-text-dim">
          &copy; {new Date().getFullYear()} Vidit Naik. Built with Next.js
        </p>
      </div>
    </footer>
  )
}

export default Footer
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: restyle Footer with gradient divider and V. branding"
```

### Task 15: Restyle AIChatbot colors

**Files:**
- Modify: `src/components/AIChatbot.tsx`

- [ ] **Step 1: Apply color changes to AIChatbot.tsx**

All functional logic stays the same. Only change class names and styles:

**Floating button (line ~113):** Change from:
```
className="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow"
```
To:
```
className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-[14px] shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
style={{ background: 'linear-gradient(135deg, #3B82F6, #F59E6B)' }}
```
And change `<MessageCircle size={28} />` to `<MessageCircle size={22} className="text-white" />`

**Chat window (line ~134):** Change from:
```
className="... bg-background border border-border ..."
```
To:
```
className="... bg-surface border border-border ..."
```

**Chat header (line ~137):** Change from:
```
className="bg-primary text-primary-foreground p-4 ..."
```
To:
```
className="p-4 flex items-center justify-between border-b border-border"
style={{ background: 'linear-gradient(135deg, #3B82F6, #F59E6B)' }}
```

**AI messages (line ~168):** Change from:
```
'bg-secondary text-secondary-foreground'
```
To:
```
'bg-primary/10 text-[#8AB4F8]'
```

**User messages (line ~168):** Change from:
```
'bg-primary text-primary-foreground'
```
To:
```
'bg-background text-text-secondary'
```

**Loading bubble (line ~184):** Same change as AI messages: `bg-primary/10 text-[#8AB4F8]`

**Suggested questions (line ~203):** Change from:
```
className="... bg-secondary/50 hover:bg-secondary text-secondary-foreground ..."
```
To:
```
className="... bg-background hover:bg-background/80 text-text-secondary ..."
```

**Input field (line ~224):** Change from:
```
className="... bg-secondary border border-border ..."
```
To:
```
className="... bg-background border border-border ..."
```

- [ ] **Step 2: Commit**

```bash
git add src/components/AIChatbot.tsx
git commit -m "feat: restyle AIChatbot to match new dark palette"
```

### Task 16: Final build verification and dev server

- [ ] **Step 1: Run the build**

```bash
npm run build
```

Expected: Build succeeds with no errors

- [ ] **Step 2: Fix any build errors**

Address any TypeScript or import errors that surface

- [ ] **Step 3: Start dev server**

```bash
npm run dev
```

Expected: Server starts on port 3005, accessible at http://localhost:3005

- [ ] **Step 4: Commit any remaining fixes**

```bash
git add -A
git commit -m "fix: resolve build issues from portfolio revamp"
```

- [ ] **Step 5: Final commit for .gitignore update**

Add `.superpowers/` to `.gitignore`:

```bash
echo ".superpowers/" >> .gitignore
git add .gitignore
git commit -m "chore: add .superpowers to gitignore"
```
