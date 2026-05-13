'use client'

import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    // ====== UTC clock
    const clockEl = document.getElementById('utc-clock')
    let clockTimer: ReturnType<typeof setInterval> | undefined
    if (clockEl) {
      const tick = () => {
        const d = new Date()
        const hh = String(d.getUTCHours()).padStart(2, '0')
        const mm = String(d.getUTCMinutes()).padStart(2, '0')
        const ss = String(d.getUTCSeconds()).padStart(2, '0')
        clockEl.textContent = `${hh}:${mm}:${ss} UTC`
      }
      tick()
      clockTimer = setInterval(tick, 1000)
    }

    // ====== Scroll spy
    const ids = ['about', 'log', 'work', 'stack', 'contact']
    const links = document.querySelectorAll<HTMLAnchorElement>('.nav a')
    const map = new Map<string, HTMLAnchorElement>()
    links.forEach((a) => {
      const href = a.getAttribute('href') || ''
      map.set(href.slice(1), a)
    })
    const onScroll = () => {
      const y = window.scrollY + 140
      let active = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= y) active = id
      }
      links.forEach((a) => a.classList.remove('active'))
      const a = map.get(active)
      if (a) a.classList.add('active')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    // ====== Smooth scroll for nav
    const anchorClick = (e: Event) => {
      const a = e.currentTarget as HTMLAnchorElement
      const href = a.getAttribute('href') || ''
      if (href.length > 1) {
        const target = document.querySelector(href)
        if (target) {
          e.preventDefault()
          const rect = (target as HTMLElement).getBoundingClientRect()
          window.scrollTo({ top: rect.top + window.scrollY - 70, behavior: 'smooth' })
        }
      }
    }
    const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')
    anchors.forEach((a) => a.addEventListener('click', anchorClick))

    // ====== Plane cursor
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const cur = document.getElementById('planeCursor')
    let rafId = 0
    let hotTimer: ReturnType<typeof setInterval> | undefined
    let onMove: ((e: MouseEvent) => void) | undefined
    let onDown: (() => void) | undefined
    if (isFinePointer && cur) {
      let mx = window.innerWidth / 2,
        my = window.innerHeight / 2
      let px = mx,
        py = my
      let lastX = mx,
        lastY = my
      let rot = 0
      let targetRot = 0
      let lastTrail = 0

      onMove = (e: MouseEvent) => {
        mx = e.clientX
        my = e.clientY
      }
      onDown = () => {
        cur.style.setProperty('--r', rot + 'deg')
        cur.classList.remove('click')
        void cur.offsetWidth
        cur.classList.add('click')
      }
      window.addEventListener('mousemove', onMove, { passive: true })
      window.addEventListener('mousedown', onDown)

      const hotCheck = () => {
        const el = document.elementFromPoint(mx, my) as HTMLElement | null
        if (!el) {
          cur.classList.remove('hot')
          return
        }
        const isHot = !!el.closest(
          'a, button, .btn, [role="button"], .work, .log-row, .edu-card, .cap-block, .iconlinks a, .nav a'
        )
        cur.classList.toggle('hot', isHot)
      }
      hotTimer = setInterval(hotCheck, 80)

      const frame = (t: number) => {
        px += (mx - px) * 0.28
        py += (my - py) * 0.28

        const dx = mx - lastX
        const dy = my - lastY
        const dist = Math.hypot(dx, dy)
        if (dist > 1.5) {
          targetRot = (Math.atan2(dx, -dy) * 180) / Math.PI
        }
        let diff = ((targetRot - rot + 540) % 360) - 180
        rot += diff * 0.18

        cur.style.left = px + 'px'
        cur.style.top = py + 'px'
        cur.style.transform = `translate(-50%, -50%) rotate(${rot}deg)`

        if (dist > 4 && t - lastTrail > 28) {
          lastTrail = t
          const v = document.createElement('div')
          v.className = 'vapor'
          v.style.left = px + 'px'
          v.style.top = py + 'px'
          document.body.appendChild(v)
          setTimeout(() => v.remove(), 800)
        }

        lastX = mx
        lastY = my
        rafId = requestAnimationFrame(frame)
      }
      rafId = requestAnimationFrame(frame)
    }

    // ====== Scroll reveals
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const targets = document.querySelectorAll(
      '.section-head, .telemetry .cell, .log-row, .edu-card, .cap-block, .contact, .caps-side, .work'
    )
    targets.forEach((el) => el.classList.add('reveal'))
    let revealIo: IntersectionObserver | undefined
    if (prefersReduced) {
      targets.forEach((el) => el.classList.add('in'))
    } else {
      revealIo = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const parent = entry.target.parentElement
              const sibs = parent
                ? Array.from(parent.children).filter((c) => c.classList.contains('reveal'))
                : []
              const idx = Math.max(0, sibs.indexOf(entry.target))
              const delay = Math.min(idx, 5) * 70
              setTimeout(() => entry.target.classList.add('in'), delay)
              revealIo!.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      )
      targets.forEach((el) => revealIo!.observe(el))
    }

    // ====== Count-up stats
    let countIo: IntersectionObserver | undefined
    if (!prefersReduced) {
      const nodes = document.querySelectorAll<HTMLElement>('[data-count]')
      countIo = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            const el = entry.target as HTMLElement
            countIo!.unobserve(el)
            const target = parseFloat(el.getAttribute('data-count') || '')
            if (isNaN(target)) return
            const prefix = el.getAttribute('data-prefix') || ''
            const suffix = el.getAttribute('data-suffix') || ''
            const decimals = (String(target).split('.')[1] || '').length
            const duration = 1100
            const start = performance.now()
            const step = (now: number) => {
              const p = Math.min(1, (now - start) / duration)
              const eased = 1 - Math.pow(1 - p, 3)
              const val = target * eased
              el.textContent = prefix + val.toFixed(decimals) + suffix
              if (p < 1) requestAnimationFrame(step)
            }
            requestAnimationFrame(step)
          })
        },
        { threshold: 0.4 }
      )
      nodes.forEach((n) => countIo!.observe(n))
    }

    // ====== Headline decode/scramble
    const decodeTimeouts: ReturnType<typeof setTimeout>[] = []
    const decodeIntervals: ReturnType<typeof setInterval>[] = []
    if (!prefersReduced) {
      const scrambleTargets = document.querySelectorAll<HTMLElement>('h1.hero-title .alt')
      const chars = '!@#$%&*+-/=?ABCDEFGHJKLMNPQRSTUVWXYZ0123456789'
      scrambleTargets.forEach((el, idx) => {
        const finalText = el.textContent || ''
        const len = finalText.length
        let progress = 0
        let frame = 0
        const startDelay = 700 + idx * 300
        const t1 = setTimeout(() => {
          const interval = setInterval(() => {
            frame++
            if (frame % 2 === 0) progress = Math.min(len, progress + 1)
            let out = ''
            for (let i = 0; i < len; i++) {
              if (i < progress) out += finalText[i]
              else if (finalText[i] === ' ') out += ' '
              else out += chars[Math.floor(Math.random() * chars.length)]
            }
            el.textContent = out
            if (progress >= len) {
              el.textContent = finalText
              clearInterval(interval)
            }
          }, 40)
          decodeIntervals.push(interval)
        }, startDelay)
        decodeTimeouts.push(t1)
      })
    }

    // ====== Radar dynamic blip
    const radar = document.getElementById('radar')
    let radarRaf = 0
    if (radar) {
      const target = document.createElement('div')
      target.className = 'radar-blip'
      target.style.width = '7px'
      target.style.height = '7px'
      target.style.left = '50%'
      target.style.top = '50%'
      target.style.background = 'var(--cyan)'
      target.style.boxShadow = '0 0 10px var(--cyan)'
      target.style.zIndex = '2'
      radar.appendChild(target)
      let t = 0
      const step = () => {
        t += 0.006
        const r = 36 + 4 * Math.sin(t * 1.3)
        const x = 50 + r * Math.cos(t)
        const y = 50 + r * Math.sin(t * 0.78)
        target.style.left = x + '%'
        target.style.top = y + '%'
        radarRaf = requestAnimationFrame(step)
      }
      radarRaf = requestAnimationFrame(step)
    }

    return () => {
      if (clockTimer) clearInterval(clockTimer)
      window.removeEventListener('scroll', onScroll)
      anchors.forEach((a) => a.removeEventListener('click', anchorClick))
      if (onMove) window.removeEventListener('mousemove', onMove)
      if (onDown) window.removeEventListener('mousedown', onDown)
      if (hotTimer) clearInterval(hotTimer)
      if (rafId) cancelAnimationFrame(rafId)
      if (revealIo) revealIo.disconnect()
      if (countIo) countIo.disconnect()
      decodeTimeouts.forEach((t) => clearTimeout(t))
      decodeIntervals.forEach((i) => clearInterval(i))
      if (radarRaf) cancelAnimationFrame(radarRaf)
    }
  }, [])

  return (
    <>
      <div className="reg-marks" aria-hidden="true">
        <span></span><span></span><span></span><span></span>
      </div>

      <div className="plane-cursor" id="planeCursor" aria-hidden="true">
        <svg viewBox="0 0 32 32" fill="currentColor">
          <path d="M16 2 L18 14 L30 16 L30 18 L18 18 L18 24 L22 26 L22 27 L16 26 L10 27 L10 26 L14 24 L14 18 L2 18 L2 16 L14 14 Z" />
        </svg>
      </div>

      <div className="fly-by" aria-hidden="true">
        ✈ <span className="label">VN001 · KSFO → ???</span>
      </div>

      {/* TOP BAR */}
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <div className="brand-mark mono">V</div>
            <span className="brand-call">VIDIT.NAIK</span>
            <span className="brand-dim">/ FDE</span>
          </div>
          <nav className="nav">
            <a href="#about" className="active">01 / Brief</a>
            <a href="#log">02 / Flight Log</a>
            <a href="#work">03 / Work</a>
            <a href="#stack">04 / Stack</a>
            <a href="#contact">05 / Contact</a>
          </nav>
          <div className="status">
            <span><span className="status-dot"></span>ON STATION</span>
            <span className="sep hide-sm">·</span>
            <span className="hide-sm">KSFO 37.7749°N · 122.4194°W</span>
            <span className="sep hide-sm">·</span>
            <span id="utc-clock" className="hide-sm">— UTC</span>
          </div>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="hero wrap" id="about">
          <div className="hero-grid">
            <div>
              <div className="hero-tag">
                <span className="pip"></span>
                <span>Currently flying with</span>
                <strong>Checksum AI</strong>
                <span style={{ color: 'var(--ink-4)' }}>·</span>
                <span>SFO</span>
              </div>

              <h1 className="hero-title">
                <span className="stack">Vidit Naik<span className="cursor" aria-hidden="true"></span></span>
                <span className="stack"><span className="alt">building</span> AI that</span>
                <span className="stack">actually <span className="alt">ships.</span></span>
              </h1>

              <p className="hero-sub">
                I&apos;m a software engineer who builds <b>AI things that actually ship</b>
                {' '}— currently at Checksum AI, helping LLM systems graduate from prototype
                {' '}into production code that real enterprise users touch every day.
              </p>
              <p className="hero-sub" style={{ marginTop: '-22px', color: 'var(--ink-3)', fontSize: '16px' }}>
                Off the clock I&apos;m an unrepentant{' '}
                <b style={{ color: 'var(--amber-2)', fontWeight: 500 }}>aviation geek</b>
                {' '}— deep in a FlightRadar24 tab, learning approach plates for airports I&apos;ll
                {' '}never fly into, and ready to argue that the CRJ-900 is criminally underrated.
              </p>

              <div className="cta-row">
                <a href="#work" className="btn primary">
                  <span>View selected work</span>
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </a>
                <a href="#contact" className="btn">
                  <span>Initiate contact</span>
                  <span className="arrow">→</span>
                </a>
                <div className="iconlinks">
                  <a href="https://github.com/vidit1906" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.27-5.23-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.36-5.25 5.65.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.55C20.21 21.38 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" /></svg>
                  </a>
                  <a href="https://www.linkedin.com/in/viditnaik/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43A2.06 2.06 0 1 1 5.34 3.3a2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" /></svg>
                  </a>
                  <a href="/vidit-resume.pdf" download aria-label="Resume">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3 1.5h7l3 3V14a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V2a.5.5 0 0 1 .5-.5z" />
                      <path d="M10 1.5V5h3M5.5 8.5v3M5.5 11.5l-1.5-1.5M5.5 11.5l1.5-1.5" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Instrument panel */}
            <div className="instrument" aria-hidden="true">
              <div className="instr-head">
                <span><span className="lbl">●</span> RADAR / TFC</span>
                <div className="right">
                  <span>RNG 80NM</span>
                  <span>HDG 274°</span>
                </div>
              </div>
              <div className="radar" id="radar">
                <div className="radar-cross"></div>
                <div className="radar-sweep"></div>
                <div className="radar-center"></div>
                <div className="radar-blip" style={{ left: '62%', top: '35%' }} title="Checksum AI"></div>
                <div className="radar-blip dim" style={{ left: '30%', top: '28%' }} title="Shifa"></div>
                <div className="radar-blip dim small" style={{ left: '38%', top: '70%' }}></div>
                <div className="radar-blip dim small" style={{ left: '72%', top: '64%' }}></div>
                <div className="radar-blip small" style={{ left: '20%', top: '55%' }}></div>
              </div>
              <div className="portrait-frame">
                <div className="corners"><span></span><span></span><span></span><span></span></div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/vidit.jpeg" alt="Vidit Naik" />
                <div className="tag">VN-001 / OPERATOR</div>
              </div>
            </div>
          </div>

          {/* Telemetry strip */}
          <div className="telemetry">
            <div className="cell">
              <div className="k">Position</div>
              <div className="v">San Francisco<small>KSFO · UTC−08</small></div>
            </div>
            <div className="cell">
              <div className="k">Role</div>
              <div className="v">Forward Deployed Eng<small>Checksum AI · since Nov 2025</small></div>
            </div>
            <div className="cell">
              <div className="k">Focus</div>
              <div className="v">LLM agents in prod<small>QA · knowledge graphs · RAG</small></div>
            </div>
            <div className="cell">
              <div className="k">Off duty</div>
              <div className="v">Flight tracking<small>Approach plates · airline livery</small></div>
            </div>
          </div>
        </section>

        {/* FLIGHT LOG */}
        <section className="section wrap" id="log">
          <div className="section-head">
            <div>
              <div className="section-eyebrow">02 / Flight Log</div>
              <h2 className="section-title">Where I&apos;ve <em>logged hours.</em></h2>
            </div>
            <div className="section-meta">
              5 ENTRIES · 5+ YRS<br />
              MOST RECENT FIRST
            </div>
          </div>

          <div className="log">
            <article className="log-row">
              <div className="log-id mono">LOG_05</div>
              <div className="log-when">
                <span>NOV &apos;25</span><span className="arrow">→</span><span>NOW</span>
                <span className="dur">on station</span>
              </div>
              <div className="log-body">
                <a href="https://www.linkedin.com/company/checksum-ai" target="_blank" rel="noopener noreferrer" className="log-logo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/companies/checksum-ai.svg" alt="Checksum AI" />
                </a>
                <div className="log-content">
                  <h3>Forward Deployed Engineer</h3>
                  <div className="co">CHECKSUM AI · SAN FRANCISCO</div>
                  <ul>
                    <li><span className="log-bullet">▸</span>Land AI products inside enterprise codebases — design through enablement.</li>
                    <li><span className="log-bullet">▸</span>Architecting self-healing QA pipelines: Claude analyzes DOM changes and patches broken selectors.</li>
                    <li><span className="log-bullet">▸</span>Building internal LLM agents that enforce uniform code quality across client repos.</li>
                    <li><span className="log-bullet">▸</span>Primary technical liaison — design sessions, demos, workshops, deployment.</li>
                  </ul>
                </div>
              </div>
              <div className="log-tags">
                <span className="tag hot">CLAUDE</span><span className="tag">PLAYWRIGHT</span><span className="tag">LLM AGENTS</span><span className="tag">FDE</span>
              </div>
            </article>

            <article className="log-row">
              <div className="log-id mono">LOG_04</div>
              <div className="log-when">
                <span>JUL &apos;25</span><span className="arrow">→</span><span>OCT &apos;25</span>
                <span className="dur">4 mo · BOS</span>
              </div>
              <div className="log-body">
                <a href="https://www.linkedin.com/company/shifa-precision" target="_blank" rel="noopener noreferrer" className="log-logo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/companies/shifa-precision.png" alt="Shifa Precision" />
                </a>
                <div className="log-content">
                  <h3>Software Engineer · AI/ML</h3>
                  <div className="co">SHIFA PRECISION · BOSTON</div>
                  <ul>
                    <li><span className="log-bullet">▸</span>Led backend for Project Oasis — real-time patient &ldquo;digital twins&rdquo; on GCP + Neo4j.</li>
                    <li><span className="log-bullet">▸</span>Architected API-first pipeline unifying biomedical data into a knowledge graph with 10M+ relationships.</li>
                    <li><span className="log-bullet">▸</span>LLM-based entity extraction over unstructured biomedical text at 95% accuracy.</li>
                  </ul>
                </div>
              </div>
              <div className="log-tags">
                <span className="tag">NEO4J</span><span className="tag">GCP</span><span className="tag hot">KG · 10M+</span><span className="tag">LLMS</span>
              </div>
            </article>

            <article className="log-row">
              <div className="log-id mono">LOG_03</div>
              <div className="log-when">
                <span>OCT &apos;24</span><span className="arrow">→</span><span>MAR &apos;25</span>
                <span className="dur">6 mo · UCR</span>
              </div>
              <div className="log-body">
                <a href="https://cris.ucr.edu" target="_blank" rel="noopener noreferrer" className="log-logo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/companies/ucr-cris.png" alt="UCR CRIS" />
                </a>
                <div className="log-content">
                  <h3>Student Researcher</h3>
                  <div className="co">CENTER FOR ROBOTICS &amp; INTELLIGENT SYSTEMS · UCR</div>
                  <ul>
                    <li><span className="log-bullet">▸</span>Drones you can talk to: LLM-driven control via natural language.</li>
                    <li><span className="log-bullet">▸</span>RAG pipeline (LangChain + vector embeddings) over manuals — 68% lift in command execution accuracy.</li>
                    <li><span className="log-bullet">▸</span>Scrum-based delivery with research-engineering rigor.</li>
                  </ul>
                </div>
              </div>
              <div className="log-tags">
                <span className="tag">RAG</span><span className="tag">LANGCHAIN</span><span className="tag hot">+68% ACC</span><span className="tag">DRONES</span>
              </div>
            </article>

            <article className="log-row">
              <div className="log-id mono">LOG_02</div>
              <div className="log-when">
                <span>MAY &apos;22</span><span className="arrow">→</span><span>JUN &apos;22</span>
                <span className="dur">internship</span>
              </div>
              <div className="log-body">
                <a href="https://www.linkedin.com/company/view-kent-cam" target="_blank" rel="noopener noreferrer" className="log-logo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/companies/kent-cam.png" alt="Kent Cam" />
                </a>
                <div className="log-content">
                  <h3>Machine Learning Engineer</h3>
                  <div className="co">KENT CAM</div>
                  <ul>
                    <li><span className="log-bullet">▸</span>Used analytics to inform camera feature integration decisions.</li>
                    <li><span className="log-bullet">▸</span>Automated cross-region pipelines, cutting validation errors by 35%.</li>
                    <li><span className="log-bullet">▸</span>Held 99.9% data integrity across streaming inputs.</li>
                  </ul>
                </div>
              </div>
              <div className="log-tags">
                <span className="tag">ML</span><span className="tag">PIPELINES</span><span className="tag">−35% ERR</span>
              </div>
            </article>

            <article className="log-row">
              <div className="log-id mono">LOG_01</div>
              <div className="log-when">
                <span>JUL &apos;20</span><span className="arrow">→</span><span>FEB &apos;21</span>
                <span className="dur">8 mo · NOIDA</span>
              </div>
              <div className="log-body">
                <a href="https://www.linkedin.com/in/viditnaik/" target="_blank" rel="noopener noreferrer" className="log-logo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/companies/studetails.png" alt="StuDetails" />
                </a>
                <div className="log-content">
                  <h3>Software Engineer</h3>
                  <div className="co">STUDETAILS · NOIDA, IN</div>
                  <ul>
                    <li><span className="log-bullet">▸</span>Shipped a React + Flask app to 5,000+ monthly users across 50+ locations.</li>
                    <li><span className="log-bullet">▸</span>Optimized AWS S3 / Glue workflows — +25% data accuracy.</li>
                    <li><span className="log-bullet">▸</span>Stood up CI/CD; cut deployment failures by 30%.</li>
                  </ul>
                </div>
              </div>
              <div className="log-tags">
                <span className="tag">REACT</span><span className="tag">FLASK</span><span className="tag">AWS</span><span className="tag">CI/CD</span>
              </div>
            </article>
          </div>
        </section>

        {/* WORK */}
        <section className="section wrap" id="work">
          <div className="section-head">
            <div>
              <div className="section-eyebrow">03 / Selected Work</div>
              <h2 className="section-title">Things I&apos;ve <em>built &amp; flown.</em></h2>
            </div>
            <div className="section-meta">5 ARTIFACTS · 2022—NOW</div>
          </div>

          <div className="work-grid">
            <article className="work">
              <div className="work-media">
                <span className="work-marker amber">PROJECT_01</span>
                <span className="work-acq">ACQUIRED</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/projects/llm-drone.png" alt="LLM Drone Control" />
              </div>
              <div className="work-body">
                <div className="work-eyebrow">DRONES · LLM</div>
                <h3>Talking to drones.</h3>
                <p className="work-desc">Fly a UAV in plain English — RAG over the manuals grounds every command.</p>
                <div className="work-stat-inline">
                  <span data-count="68" data-suffix="%" data-prefix="+">+68%</span>
                  <span className="l">Command accuracy</span>
                </div>
                <div className="work-tags">
                  <span className="tag">LANGCHAIN</span><span className="tag">RAG</span><span className="tag">PYTHON</span>
                </div>
                <div className="work-foot">
                  <span className="work-id">UCR · CRIS</span>
                  <a href="https://github.com/vidit1906/llmdronecontrol" target="_blank" rel="noopener noreferrer" className="work-link">View source</a>
                </div>
              </div>
            </article>

            <article className="work">
              <div className="work-media">
                <span className="work-marker">PROJECT_02</span>
                <span className="work-acq">ACQUIRED</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/projects/insure-search.jpeg" alt="InsureSearch" />
              </div>
              <div className="work-body">
                <div className="work-eyebrow">RAG · FINE-TUNING</div>
                <h3>InsureSearch.</h3>
                <p className="work-desc">Fine-tuned LLaMA-3 chatbot for insurance docs — same answers, 65% fewer tokens.</p>
                <div className="work-stat-inline">
                  <span data-count="65" data-suffix="%" data-prefix="−">−65%</span>
                  <span className="l">Token usage</span>
                </div>
                <div className="work-tags">
                  <span className="tag">LLAMA-3</span><span className="tag">LORA</span><span className="tag">BERT</span>
                </div>
                <div className="work-foot">
                  <span className="work-id">HACKATHON</span>
                  <a href="https://github.com/dhrumilankola/LLama3_Hackathon" target="_blank" rel="noopener noreferrer" className="work-link">View source</a>
                </div>
              </div>
            </article>

            <article className="work">
              <div className="work-media">
                <span className="work-marker">PROJECT_03</span>
                <span className="work-acq">ACQUIRED</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/projects/city-safe.png" alt="CitySafe" />
              </div>
              <div className="work-body">
                <div className="work-eyebrow">SPATIAL · BIG DATA</div>
                <h3>CitySafe.</h3>
                <p className="work-desc">1.5M Chicago crime records, mapped. Spark + PostGIS ETL with a 25% faster query path.</p>
                <div className="work-stat-inline">
                  <span data-count="1.5" data-suffix="M+">1.5M+</span>
                  <span className="l">Records processed</span>
                </div>
                <div className="work-tags">
                  <span className="tag">SQL</span><span className="tag">SPARK</span><span className="tag">POSTGIS</span>
                </div>
                <div className="work-foot">
                  <span className="work-id">ANALYTICS</span>
                  <a href="https://github.com/sreekar9601/chicago-crime-analysis" target="_blank" rel="noopener noreferrer" className="work-link">View source</a>
                </div>
              </div>
            </article>

            <article className="work">
              <div className="work-media">
                <span className="work-marker">PROJECT_04</span>
                <span className="work-acq">ACQUIRED</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/projects/create-flow.png" alt="CreateFlow" />
              </div>
              <div className="work-body">
                <div className="work-eyebrow">MULTI-AGENT</div>
                <h3>CreateFlow.</h3>
                <p className="work-desc">LangGraph multi-agent system for creators — half the time, full content pipeline.</p>
                <div className="work-stat-inline">
                  <span data-count="50" data-suffix="%" data-prefix="−">−50%</span>
                  <span className="l">Creation time</span>
                </div>
                <div className="work-tags">
                  <span className="tag">LANGGRAPH</span><span className="tag">AGENTS</span><span className="tag">LORA</span>
                </div>
                <div className="work-foot">
                  <span className="work-id">CALHACKS 11</span>
                  <a href="https://github.com/dhrumilankola/Calhacks11_CreateFlow" target="_blank" rel="noopener noreferrer" className="work-link">View source</a>
                </div>
              </div>
            </article>

            <article className="work">
              <div className="work-media">
                <span className="work-marker">PROJECT_05</span>
                <span className="work-acq">ACQUIRED</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/projects/prrp.jpeg" alt="PRRP" />
              </div>
              <div className="work-body">
                <div className="work-eyebrow">GRAPH · ALGORITHMS</div>
                <h3>PRRP Partitioning.</h3>
                <p className="work-desc">Spatial regionalization on graphs, packaged as a reusable Python module.</p>
                <div className="work-stat-inline">
                  <span>P·RRP</span>
                  <span className="l">Reusable lib</span>
                </div>
                <div className="work-tags">
                  <span className="tag">PYTHON</span><span className="tag">GRAPHS</span><span className="tag">SPATIAL</span>
                </div>
                <div className="work-foot">
                  <span className="work-id">RESEARCH</span>
                  <a href="https://github.com/sreekar9601/graph-partitioning-prrp" target="_blank" rel="noopener noreferrer" className="work-link">View source</a>
                </div>
              </div>
            </article>

            <article className="work work-cta">
              <div className="work-cta-inner">
                <div className="work-cta-glyph">
                  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="32" cy="32" r="30" />
                    <circle cx="32" cy="32" r="18" />
                    <circle cx="32" cy="32" r="3" fill="currentColor" />
                    <path d="M32 2v60M2 32h60" />
                  </svg>
                </div>
                <div className="work-eyebrow">PROJECT_06</div>
                <h3>Up next.</h3>
                <p className="work-desc">More builds in the hangar — ping me if you want to collaborate, or peek at GitHub for works-in-progress.</p>
                <div className="work-foot">
                  <span className="work-id">INBOUND</span>
                  <a href="https://github.com/vidit1906" target="_blank" rel="noopener noreferrer" className="work-link">All repos</a>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* STACK / CAPABILITIES */}
        <section className="section wrap" id="stack">
          <div className="section-head">
            <div>
              <div className="section-eyebrow">04 / Stack</div>
              <h2 className="section-title">Tools on the <em>flight deck.</em></h2>
            </div>
            <div className="section-meta">LAST UPDATED · 2026</div>
          </div>

          <div className="caps">
            <div className="caps-side">
              <p className="lead">I&apos;m a software engineer first — AI just happens to be the most interesting frontier to ship into right now.</p>
              <p>I&apos;m equally comfortable in a Jupyter notebook arguing about embeddings and in a client&apos;s Terraform repo arguing about IAM. The kit on the right is what I actually reach for day to day. Aviation enthusiasm not pictured.</p>
            </div>

            <div className="caps-grid">
              <div className="cap-block">
                <h4><span className="num">01</span> · AI / ML</h4>
                <ul>
                  <li>Large Language Models <span className="level">Claude · Gemini · Qwen</span></li>
                  <li>Retrieval Augmented Generation <span className="level">LangChain · Vectors</span></li>
                  <li>Fine-tuning (LoRA, quant) <span className="level">PyTorch · Ollama</span></li>
                  <li>Agents &amp; multi-agent <span className="level">LangGraph</span></li>
                  <li>Knowledge graphs <span className="level">Neo4j</span></li>
                </ul>
              </div>
              <div className="cap-block">
                <h4><span className="num">02</span> · Backend</h4>
                <ul>
                  <li>Python <span className="level">Flask · Django · FastAPI</span></li>
                  <li>Node.js <span className="level">Express</span></li>
                  <li>Java <span className="level">SpringBoot</span></li>
                  <li>SQL · NoSQL <span className="level">MySQL · MongoDB</span></li>
                  <li>RESTful microservices <span className="level">API-first</span></li>
                </ul>
              </div>
              <div className="cap-block">
                <h4><span className="num">03</span> · Cloud / DevOps</h4>
                <ul>
                  <li>AWS <span className="level">S3 · Glue · Lambda · EC2</span></li>
                  <li>GCP <span className="level">Compute · Storage</span></li>
                  <li>Containers <span className="level">Docker · Kubernetes</span></li>
                  <li>CI/CD <span className="level">Jenkins · GH Actions</span></li>
                  <li>Observability <span className="level">Logging · Metrics</span></li>
                </ul>
              </div>
              <div className="cap-block">
                <h4><span className="num">04</span> · QA / Frontend</h4>
                <ul>
                  <li>Playwright <span className="level">self-healing</span></li>
                  <li>PyTest · JUnit · Selenium <span className="level">full-stack QA</span></li>
                  <li>React <span className="level">prototyping</span></li>
                  <li>Git / GitHub <span className="level">daily driver</span></li>
                  <li>Jira / Agile <span className="level">Scrum delivery</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* EDUCATION */}
        <section className="section wrap" id="education">
          <div className="section-head">
            <div>
              <div className="section-eyebrow">05 / Training</div>
              <h2 className="section-title">Where I got <em>type-rated.</em></h2>
            </div>
            <div className="section-meta">2 INSTITUTIONS · BS + MS</div>
          </div>

          <div className="edu">
            <article className="edu-card">
              <div className="edu-logo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/schools/ucr-logo.png" alt="UCR" />
              </div>
              <div>
                <h4>M.S. Computer Science</h4>
                <div className="meta">UC RIVERSIDE · MAR 2025</div>
                <p>Coursework in Distributed Systems, Machine Learning, AI, Design Patterns, Operating Systems, Networking, and Agile / SDLC.</p>
                <span className="gpa">GPA · 3.63</span>
              </div>
            </article>
            <article className="edu-card">
              <div className="edu-logo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/schools/vit-logo.png" alt="VIT" />
              </div>
              <div>
                <h4>B.E. Computer Science &amp; Engineering</h4>
                <div className="meta">VELLORE INSTITUTE OF TECHNOLOGY · AUG 2023</div>
                <p>Foundations in DSA, OOP, networking, OS, and full-stack engineering. Chennai, India.</p>
              </div>
            </article>
          </div>
        </section>

        {/* CONTACT */}
        <section className="section wrap" id="contact">
          <div className="contact">
            <div className="contact-eyebrow">06 / Final Approach</div>
            <h2>Got something <em>interesting</em><br />in your hangar?</h2>
            <p className="lede">I&apos;m currently at Checksum AI and happy there — but I always make time for a good conversation about LLM systems in production, weird research ideas, or anything aviation-adjacent.</p>

            <div className="contact-actions">
              <a href="mailto:viditnaik@gmail.com" className="btn primary">
                <span>viditnaik@gmail.com</span>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
              </a>
              <a href="https://www.linkedin.com/in/viditnaik/" target="_blank" rel="noopener noreferrer" className="btn">LinkedIn ↗</a>
              <a href="https://github.com/vidit1906" target="_blank" rel="noopener noreferrer" className="btn">GitHub ↗</a>
              <a href="/vidit-resume.pdf" download className="btn">Resume.pdf ↓</a>
            </div>

            <div className="contact-meta">
              <div>
                BASE
                <strong>San Francisco, CA</strong>
                1628 Alemany Blvd · KSFO
              </div>
              <div>
                CALL
                <strong>(951) 425-7229</strong>
                Voice / SMS · PT
              </div>
              <div>
                FLIGHT PLAN
                <strong>Open to interesting work</strong>
                Currently at Checksum AI
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="foot">
        <div className="wrap foot-inner">
          <div>© 2026 · VIDIT NAIK</div>
          <div className="mid">
            <span>BUILT WITH NEXT.JS</span>
            <span style={{ color: 'var(--line-2)' }}>·</span>
            <span>NO TRACKING</span>
            <span style={{ color: 'var(--line-2)' }}>·</span>
            <span>VFR CONDITIONS</span>
          </div>
          <div className="right">
            ↑ <a href="#about" style={{ borderBottom: '1px solid var(--line-2)', paddingBottom: '1px' }}>RETURN TO TOP</a>
          </div>
        </div>
      </footer>
    </>
  )
}
