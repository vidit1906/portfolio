'use client'

import { useEffect } from 'react'
import 'maplibre-gl/dist/maplibre-gl.css'

type Skill = {
  name: string
  level: string
  logo?: string
  fb?: string
  noLogo?: string
}

const stackBlocks: { num: string; title: string; skills: Skill[] }[] = [
  {
    num: '01',
    title: 'AI / ML',
    skills: [
      { name: 'Claude (Anthropic)', level: 'daily', logo: 'anthropic', fb: 'CL' },
      { name: 'GPT · Gemini · Qwen', level: 'multi-model', noLogo: 'AI' },
      { name: 'LangChain · LangGraph', level: 'agents', logo: 'langchain', fb: 'LC' },
      { name: 'Retrieval-Augmented Generation', level: 'depth', noLogo: 'RAG' },
      { name: 'PyTorch · LoRA fine-tuning', level: 'applied', logo: 'pytorch', fb: 'PT' },
      { name: 'Ollama · local inference', level: 'tinkering', logo: 'ollama', fb: 'OL' },
    ],
  },
  {
    num: '02',
    title: 'Backend',
    skills: [
      { name: 'Python', level: 'primary', logo: 'python', fb: 'PY' },
      { name: 'Node.js · Express', level: 'daily', logo: 'nodedotjs', fb: 'NO' },
      { name: 'Java · SpringBoot', level: 'working', logo: 'spring', fb: 'SP' },
      { name: 'Flask · Django · FastAPI', level: 'comfortable', logo: 'flask', fb: 'FL' },
      { name: 'Neo4j · knowledge graphs', level: 'deep', logo: 'neo4j' },
      { name: 'MongoDB · MySQL · SQL', level: 'daily', logo: 'mongodb', fb: 'MO' },
    ],
  },
  {
    num: '03',
    title: 'Cloud / DevOps',
    skills: [
      { name: 'AWS · S3 / Glue / Lambda / EC2', level: 'prod', noLogo: 'AWS' },
      { name: 'Google Cloud Platform', level: 'prod', logo: 'googlecloud', fb: 'GO' },
      { name: 'Docker', level: 'daily', logo: 'docker', fb: 'DO' },
      { name: 'Kubernetes', level: 'working', logo: 'kubernetes', fb: 'KU' },
      { name: 'Jenkins · GH Actions', level: 'CI/CD', logo: 'jenkins', fb: 'JE' },
      { name: 'Git · GitHub', level: 'always', logo: 'git', fb: 'GI' },
    ],
  },
  {
    num: '04',
    title: 'QA / Frontend',
    skills: [
      { name: 'Playwright', level: 'self-healing', noLogo: 'PW' },
      { name: 'PyTest · JUnit · Selenium', level: 'full-stack QA', logo: 'pytest', fb: 'PY' },
      { name: 'React', level: 'prototyping', logo: 'react', fb: 'RE' },
      { name: 'TypeScript · JavaScript', level: 'daily', logo: 'typescript', fb: 'TY' },
      { name: 'Jira · Agile / Scrum', level: 'delivery', logo: 'jira', fb: 'JR' },
      { name: 'Linux · shell', level: 'native', logo: 'linux', fb: 'LI' },
    ],
  },
]

const disciplines: (string | [string, string])[] = [
  'Software engineer',
  ['LLM ', 'whisperer'],
  'RAG & retrieval',
  'Forward deployed',
  'Knowledge graphs',
  'Agents & orchestration',
  ['Self-healing ', 'QA'],
  'Cloud & infra',
  ['Aviation ', 'enthusiast'],
]

function MarqueeSet({ label }: { label: string }) {
  return (
    <>
      <span className="label">{label}</span>
      {disciplines.map((d, i) => (
        <span key={i} style={{ display: 'contents' }}>
          <span className="item">
            {Array.isArray(d) ? (
              <>
                {d[0]}
                <span className="alt">{d[1]}</span>
              </>
            ) : (
              d
            )}
          </span>
          <span className="dot"></span>
        </span>
      ))}
    </>
  )
}

export default function Home() {
  useEffect(() => {
    const cleanups: (() => void)[] = []

    // ====== UTC clock
    const clockEl = document.getElementById('utc-clock')
    if (clockEl) {
      const tick = () => {
        const d = new Date()
        const hh = String(d.getUTCHours()).padStart(2, '0')
        const mm = String(d.getUTCMinutes()).padStart(2, '0')
        clockEl.textContent = `${hh}:${mm} UTC`
      }
      tick()
      const t = setInterval(tick, 1000)
      cleanups.push(() => clearInterval(t))
    }

    // ====== Local clock (Now panel)
    const localClockEl = document.getElementById('now-local-clock')
    if (localClockEl) {
      const fmt = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'America/Los_Angeles',
      })
      const tick = () => {
        localClockEl.textContent = fmt.format(new Date())
      }
      tick()
      const t = setInterval(tick, 30000)
      cleanups.push(() => clearInterval(t))
    }

    // ====== Scroll spy
    const ids = ['about', 'journey', 'work', 'stack', 'contact']
    const links = document.querySelectorAll<HTMLAnchorElement>('.nav a')
    const linkMap = new Map<string, HTMLAnchorElement>()
    links.forEach((a) => linkMap.set((a.getAttribute('href') || '').slice(1), a))
    const onScrollSpy = () => {
      const y = window.scrollY + 140
      let active = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= y) active = id
      }
      links.forEach((a) => a.classList.remove('active'))
      const a = linkMap.get(active)
      if (a) a.classList.add('active')
    }
    window.addEventListener('scroll', onScrollSpy, { passive: true })
    onScrollSpy()
    cleanups.push(() => window.removeEventListener('scroll', onScrollSpy))

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
    cleanups.push(() => anchors.forEach((a) => a.removeEventListener('click', anchorClick)))

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // ====== Plane cursor
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const cur = document.getElementById('planeCursor')
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

      const onMove = (e: MouseEvent) => {
        mx = e.clientX
        my = e.clientY
      }
      const onDown = () => {
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
          'a, button, .btn, [role="button"], .work, .edu-card, .stack-block, .iconlinks a, .nav a'
        )
        cur.classList.toggle('hot', isHot)
      }
      const hotTimer = setInterval(hotCheck, 80)

      let rafId = 0
      const frame = (t: number) => {
        px += (mx - px) * 0.28
        py += (my - py) * 0.28
        const dx = mx - lastX
        const dy = my - lastY
        const dist = Math.hypot(dx, dy)
        if (dist > 1.5) targetRot = (Math.atan2(dx, -dy) * 180) / Math.PI
        const diff = ((targetRot - rot + 540) % 360) - 180
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
      cleanups.push(() => {
        window.removeEventListener('mousemove', onMove)
        window.removeEventListener('mousedown', onDown)
        clearInterval(hotTimer)
        cancelAnimationFrame(rafId)
      })
    }

    // ====== Scroll reveals
    const revealTargets = document.querySelectorAll(
      '.section-head, .telemetry .cell, .edu-card, .stack-block, .contact, .stack-side, .work'
    )
    revealTargets.forEach((el) => el.classList.add('reveal'))
    if (prefersReduced) {
      revealTargets.forEach((el) => el.classList.add('in'))
    } else {
      const io = new IntersectionObserver(
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
              io.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      )
      revealTargets.forEach((el) => io.observe(el))
      cleanups.push(() => io.disconnect())
    }

    // ====== Count-up stats
    if (!prefersReduced) {
      const nodes = document.querySelectorAll<HTMLElement>('[data-count]')
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            const el = entry.target as HTMLElement
            io.unobserve(el)
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
              el.textContent = prefix + (target * eased).toFixed(decimals) + suffix
              if (p < 1) requestAnimationFrame(step)
            }
            requestAnimationFrame(step)
          })
        },
        { threshold: 0.4 }
      )
      nodes.forEach((n) => io.observe(n))
      cleanups.push(() => io.disconnect())
    }

    // ====== Headline flap boards + role rotator
    {
      const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-./ '
      const flaps = document.querySelectorAll<HTMLElement>('.flap[data-flap]')

      const animateFlap = (
        chars: { span: HTMLSpanElement; final: string; settled: boolean }[]
      ) => {
        const startTime = performance.now()
        const settleStep = 90
        const flipInterval = 55
        let lastFlip = 0
        const tick = (now: number) => {
          const elapsed = now - startTime
          const settledCount = Math.min(chars.length, Math.floor(elapsed / settleStep))
          for (let i = 0; i < chars.length; i++) {
            const c = chars[i]
            if (!c || !c.span) continue
            if (i < settledCount && !c.settled) {
              c.settled = true
              c.span.textContent = c.final === ' ' ? ' ' : c.final
              c.span.classList.remove('flip')
              void c.span.offsetWidth
              c.span.classList.add('flip')
            }
          }
          if (now - lastFlip > flipInterval) {
            lastFlip = now
            for (let i = settledCount; i < chars.length; i++) {
              const c = chars[i]
              if (!c || !c.span) continue
              if (c.final === ' ') {
                c.span.textContent = ' '
                continue
              }
              c.span.textContent = CHARS[Math.floor(Math.random() * CHARS.length)]
              c.span.classList.remove('flip')
              void c.span.offsetWidth
              c.span.classList.add('flip')
            }
          }
          if (settledCount < chars.length) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }

      flaps.forEach((el) => {
        const target = el.getAttribute('data-flap') || ''
        const delay = parseInt(el.getAttribute('data-flap-delay') || '0', 10)
        el.textContent = ''
        const chars: { span: HTMLSpanElement; final: string; settled: boolean }[] = []
        for (let i = 0; i < target.length; i++) {
          const span = document.createElement('span')
          span.className = 'flap-char'
          span.textContent = ' '
          el.appendChild(span)
          chars.push({ span, final: target[i], settled: false })
        }
        if (prefersReduced) {
          chars.forEach((c) => (c.span.textContent = c.final === ' ' ? ' ' : c.final))
          return
        }
        const t = setTimeout(() => animateFlap(chars), delay)
        cleanups.push(() => clearTimeout(t))
      })

      const rotator = document.getElementById('roleRotator')
      if (rotator) {
        const roles = ['DEVELOPER', 'AI ENGINEER', 'FDE @ CHECKSUM', 'BUILDER', 'AVGEEK', 'SHIPS THINGS']
        const padLen = roles.reduce((m, r) => Math.max(m, r.length), 0)
        rotator.textContent = ''
        const charSpans: HTMLSpanElement[] = []
        for (let i = 0; i < padLen; i++) {
          const s = document.createElement('span')
          s.className = 'flap-char'
          s.textContent = ' '
          rotator.appendChild(s)
          charSpans.push(s)
        }
        const showRole = (role: string) => {
          const finals = role.padEnd(padLen, ' ').split('')
          const startTime = performance.now()
          const settleStep = 75
          const flipInterval = 55
          const settledFlags = finals.map(() => false)
          let lastFlip = 0
          const tick = (now: number) => {
            const elapsed = now - startTime
            const settledCount = Math.min(finals.length, Math.floor(elapsed / settleStep))
            for (let i = 0; i < finals.length; i++) {
              const span = charSpans[i]
              if (!span) continue
              if (i < settledCount && !settledFlags[i]) {
                settledFlags[i] = true
                span.textContent = finals[i] === ' ' ? ' ' : finals[i]
                span.classList.remove('flip')
                void span.offsetWidth
                span.classList.add('flip')
              }
            }
            if (now - lastFlip > flipInterval) {
              lastFlip = now
              for (let i = settledCount; i < finals.length; i++) {
                const span = charSpans[i]
                if (!span) continue
                if (finals[i] === ' ') {
                  span.textContent = ' '
                  continue
                }
                span.textContent = CHARS[Math.floor(Math.random() * CHARS.length)]
                span.classList.remove('flip')
                void span.offsetWidth
                span.classList.add('flip')
              }
            }
            if (settledCount < finals.length) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
        showRole(roles[0])
        if (!prefersReduced) {
          let idx = 0
          const t = setInterval(() => {
            idx = (idx + 1) % roles.length
            showRole(roles[idx])
          }, 2800)
          cleanups.push(() => clearInterval(t))
        }
      }
    }

    // ====== World journey (maplibre, scroll-driven)
    let cancelled = false
    const track = document.getElementById('worldTrack')
    const mapContainer = document.getElementById('worldMap')
    if (track && mapContainer) {
      import('maplibre-gl').then((mod) => {
        if (cancelled) return
        const maplibregl = mod.default

        const stops = [
          { id: 'world', label: 'WORLD VIEW', center: [10, 25] as [number, number], zoom: 1.5 },
          { id: 'chennai', label: 'CHENNAI', center: [80.27, 13.08] as [number, number], zoom: 9 },
          { id: 'riverside', label: 'RIVERSIDE', center: [-117.39, 33.95] as [number, number], zoom: 9.5 },
          { id: 'sfo', label: 'SAN FRANCISCO', center: [-122.42, 37.77] as [number, number], zoom: 10 },
        ]
        const markers = [
          { id: 'mumbai', name: 'MUMBAI', coords: [72.88, 19.08] as [number, number], context: true },
          { id: 'delhi', name: 'DELHI', coords: [77.21, 28.64] as [number, number], context: true },
          { id: 'chennai', name: 'CHENNAI', coords: [80.27, 13.08] as [number, number], context: false },
          { id: 'riverside', name: 'RIVERSIDE', coords: [-117.39, 33.95] as [number, number], context: false },
          { id: 'sfo', name: 'SAN FRANCISCO', coords: [-122.42, 37.77] as [number, number], context: false },
        ]
        const stopContent = [
          {
            coord: 'WORLD VIEW &middot; SCROLL TO FLY THE PATH',
            city: 'The route<em>.</em>',
            role: 'From Mumbai to here. Three cities of work, one through-line.',
            when: '<span class="lbl">SPAN</span> <span>2019 &rarr; now</span>',
          },
          {
            coord: '01 / MAA &middot; 13.08&deg;N 80.27&deg;E',
            city: 'Chennai<em>.</em>',
            role: '<b>B.E. Computer Science</b> at VIT Chennai &mdash; where I learned to ship code.',
            when: '<span class="lbl">YEARS</span> <span>2019 &mdash; 2023</span>',
          },
          {
            coord: '02 / RIV &middot; 33.95&deg;N 117.39&deg;W',
            city: 'Riverside<em>.</em>',
            role: '<b>M.S. Computer Science</b> at UC Riverside. Researched LLM-driven drone control at CRIS.',
            when: '<span class="lbl">YEARS</span> <span>2023 &mdash; 2025</span>',
          },
          {
            coord: '03 / SFO &middot; 37.77&deg;N 122.42&deg;W &middot; <span style="color:var(--green);">CURRENT</span>',
            city: 'San Francisco<em>.</em>',
            role: '<b>Forward Deployed Engineer</b> at Checksum AI &mdash; LLM systems landed inside enterprise codebases.',
            when: '<span class="lbl">SINCE</span> <span>Nov 2025</span>',
          },
        ]

        const map = new maplibregl.Map({
          container: mapContainer,
          style: 'https://tiles.openfreemap.org/styles/dark',
          center: stops[0].center,
          zoom: stops[0].zoom,
          interactive: false,
          attributionControl: false,
          pitch: 0,
          fadeDuration: 100,
          renderWorldCopies: true,
        })
        if (map.dragRotate) map.dragRotate.disable()
        if (map.touchZoomRotate) map.touchZoomRotate.disableRotation()

        const markerEls: Record<string, HTMLElement> = {}
        let mapReady = false

        const greatCircle = (a: number[], b: number[], segments: number) => {
          const pts: [number, number][] = []
          const lat1 = (a[1] * Math.PI) / 180
          const lon1 = (a[0] * Math.PI) / 180
          const lat2 = (b[1] * Math.PI) / 180
          const lon2 = (b[0] * Math.PI) / 180
          const d =
            2 *
            Math.asin(
              Math.sqrt(
                Math.pow(Math.sin((lat2 - lat1) / 2), 2) +
                  Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin((lon2 - lon1) / 2), 2)
              )
            )
          for (let i = 0; i <= segments; i++) {
            const f = i / segments
            const A = Math.sin((1 - f) * d) / Math.sin(d)
            const B = Math.sin(f * d) / Math.sin(d)
            const x = A * Math.cos(lat1) * Math.cos(lon1) + B * Math.cos(lat2) * Math.cos(lon2)
            const y = A * Math.cos(lat1) * Math.sin(lon1) + B * Math.cos(lat2) * Math.sin(lon2)
            const z = A * Math.sin(lat1) + B * Math.sin(lat2)
            const lat = Math.atan2(z, Math.sqrt(x * x + y * y))
            const lon = Math.atan2(y, x)
            pts.push([(lon * 180) / Math.PI, (lat * 180) / Math.PI])
          }
          return pts
        }

        map.on('load', () => {
          mapReady = true
          map.resize()
          markers.forEach((m) => {
            const el = document.createElement('div')
            el.className = 'map-marker' + (m.context ? ' context' : '')
            el.innerHTML = '<span class="dot"></span><span class="label">' + m.name + '</span>'
            markerEls[m.id] = el
            new maplibregl.Marker({ element: el, anchor: 'left' }).setLngLat(m.coords).addTo(map)
          })

          const careerPath = [
            [80.27, 13.08],
            [-117.39, 33.95],
            [-122.42, 37.77],
          ]
          const segs: [number, number][][] = []
          for (let i = 0; i < careerPath.length - 1; i++) {
            segs.push(greatCircle(careerPath[i], careerPath[i + 1], 64))
          }
          map.addSource('career-path', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: segs.map((coords) => ({
                type: 'Feature' as const,
                geometry: { type: 'LineString' as const, coordinates: coords },
                properties: {},
              })),
            },
          })
          map.addLayer({
            id: 'career-path-line',
            type: 'line',
            source: 'career-path',
            paint: {
              'line-color': '#ffb020',
              'line-width': 1.4,
              'line-opacity': 0.7,
              'line-dasharray': [2, 2.5],
            },
          })
          update()
        })
        map.on('error', (e) => {
          console.warn('[journey] map error', e && e.error ? e.error.message : e)
        })

        const stopLabelEl = document.getElementById('worldStopLabel')
        const progressEl = document.getElementById('worldProgress')
        const progressSpans = progressEl ? progressEl.querySelectorAll('span') : []
        const infoEl = document.getElementById('worldInfo')
        const coordEl = document.getElementById('worldCoord')
        const cityEl = document.getElementById('worldCity')
        const roleEl = document.getElementById('worldRole')
        const whenEl = document.getElementById('worldWhen')
        const hintEl = document.getElementById('worldHint')

        const lerp = (a: number, b: number, t: number) => a + (b - a) * t
        const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)

        const getInterpolatedStop = (progress: number) => {
          const i = Math.floor(progress)
          const t = progress - i
          const a = stops[Math.min(stops.length - 1, i)]
          const b = stops[Math.min(stops.length - 1, i + 1)]
          if (!b) return { center: a.center, zoom: a.zoom }
          const e = easeInOut(Math.max(0, Math.min(1, t)))
          return {
            center: [lerp(a.center[0], b.center[0], e), lerp(a.center[1], b.center[1], e)] as [
              number,
              number,
            ],
            zoom: lerp(a.zoom, b.zoom, e),
          }
        }

        let currentStopIndex = -1
        let swapTimer: ReturnType<typeof setTimeout> | null = null
        const setActiveStop = (i: number) => {
          if (i === currentStopIndex) return
          const wasFirst = currentStopIndex === -1
          currentStopIndex = i
          progressSpans.forEach((s, idx) => s.classList.toggle('on', idx <= i))
          const stop = stops[i] || stops[0]
          if (stopLabelEl) stopLabelEl.textContent = stop.label
          Object.keys(markerEls).forEach((id) => {
            markerEls[id].classList.toggle('active', id === stop.id)
          })
          if (infoEl && coordEl && cityEl && roleEl && whenEl) {
            const content = stopContent[i] || stopContent[0]
            if (wasFirst) {
              coordEl.innerHTML = content.coord
              cityEl.innerHTML = content.city
              roleEl.innerHTML = content.role
              whenEl.innerHTML = content.when
            } else {
              if (swapTimer) clearTimeout(swapTimer)
              infoEl.classList.add('fading')
              swapTimer = setTimeout(() => {
                coordEl.innerHTML = content.coord
                cityEl.innerHTML = content.city
                roleEl.innerHTML = content.role
                whenEl.innerHTML = content.when
                infoEl.classList.remove('fading')
              }, 240)
            }
          }
        }

        let raf: number | null = null
        const update = () => {
          if (raf) cancelAnimationFrame(raf)
          raf = requestAnimationFrame(() => {
            const rect = track.getBoundingClientRect()
            const trackTop = window.scrollY + rect.top
            const trackHeight = track.offsetHeight - window.innerHeight
            const rawProgress = (window.scrollY - trackTop) / trackHeight
            const clamped = Math.max(0, Math.min(1, rawProgress))
            const seg = clamped * (stops.length - 1)
            const target = getInterpolatedStop(seg)
            if (mapReady) map.jumpTo({ center: target.center, zoom: target.zoom })
            setActiveStop(Math.round(seg))
            if (hintEl) {
              const inSection = rect.top < window.innerHeight && rect.bottom > 0
              hintEl.classList.toggle('show', inSection && clamped < 0.95)
            }
          })
        }

        setActiveStop(0)
        window.addEventListener('scroll', update, { passive: true })
        window.addEventListener('resize', update)
        update()

        cleanups.push(() => {
          window.removeEventListener('scroll', update)
          window.removeEventListener('resize', update)
          if (raf) cancelAnimationFrame(raf)
          if (swapTimer) clearTimeout(swapTimer)
          map.remove()
        })
      })
    }

    return () => {
      cancelled = true
      cleanups.forEach((fn) => fn())
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
            <span className="brand-call">VIDIT&nbsp;NAIK</span>
            <span className="brand-dim">/ Software Engineer</span>
          </div>
          <nav className="nav">
            <a href="#about" className="active">hello</a>
            <a href="#journey">journey</a>
            <a href="#work">work</a>
            <a href="#stack">stack</a>
            <a href="#contact">say hi</a>
          </nav>
          <div className="status">
            <span><span className="status-dot"></span>Available</span>
            <span className="sep hide-sm">·</span>
            <span className="hide-sm">San Francisco</span>
            <span className="sep hide-sm">·</span>
            <span id="utc-clock" className="hide-sm">—</span>
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
                <span>Currently at</span>
                <strong>Checksum AI</strong>
                <span style={{ color: 'var(--ink-4)' }}>·</span>
                <span>SFO</span>
              </div>

              <h1 className="hero-title" id="heroTitle">
                <span className="flap-line">
                  <span className="flap" data-flap="VIDIT NAIK" data-flap-delay="200"></span>
                </span>
                <span className="flap-line">
                  <span className="alt" id="roleRotator" aria-live="polite">DEVELOPER</span>
                </span>
                <span className="flap-line">
                  <span
                    className="flap"
                    data-flap="WHO BUILDS."
                    data-flap-delay="900"
                    data-flap-color="amber"
                  ></span>
                </span>
              </h1>

              <p className="hero-sub">
                Software engineer building AI that actually ships — currently at{' '}
                <b>Checksum&nbsp;AI</b>, helping LLM systems graduate from prototype into
                production code real enterprise users touch every day.
              </p>
              <p className="hero-sub" style={{ marginTop: '-22px', color: 'var(--ink-3)', fontSize: '16px' }}>
                Also an avgeek.
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

            {/* Now panel */}
            <aside className="now-panel" aria-label="What I'm currently up to">
              <div className="now-head">
                <div className="left">
                  <span className="dot"></span>
                  <span className="lbl">NOW</span>
                  <span>· LIVE</span>
                </div>
                <div>UPDATED WEEKLY</div>
              </div>

              <div className="now-list">
                <div className="now-row">
                  <div className="k">Role</div>
                  <div className="v"><b>Checksum AI</b><small>Forward Deployed Engineer · SF</small></div>
                </div>
                <div className="now-row">
                  <div className="k">Focus</div>
                  <div className="v">LLM systems in production<small>self-healing QA · knowledge graphs</small></div>
                </div>
                <div className="now-row">
                  <div className="k">Based</div>
                  <div className="v">San Francisco<small>previously Riverside · Chennai</small></div>
                </div>
                <div className="now-row">
                  <div className="k">Open to</div>
                  <div className="v">Smart conversations<small>not job-hunting — just curious</small></div>
                </div>
              </div>

              <div className="now-foot">
                <span>VN · <span id="now-local-clock">——:——</span> PT</span>
                <span className="scroll-cue"><span>scroll for the route</span> <span className="arr">↓</span></span>
              </div>
            </aside>
          </div>

          {/* Telemetry strip */}
          <div className="telemetry">
            <div className="cell">
              <div className="k">Based</div>
              <div className="v">San Francisco<small>previously Riverside · Chennai</small></div>
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
              <div className="v">Avgeek<small>aviation is the through-line</small></div>
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <section aria-hidden="true">
          <div className="marquee">
            <div className="marquee-track" id="marqueeTrack">
              <MarqueeSet label="( disciplines )" />
              <MarqueeSet label="——  ( disciplines )" />
            </div>
          </div>
        </section>

        {/* WORLD JOURNEY */}
        <section className="world-journey" id="journey">
          <div className="world-journey-track" id="worldTrack">
            <div className="world-stage">
              <div className="world-frame">
                <div className="world-map" id="worldMap"></div>
                <div className="world-vignette" aria-hidden="true"></div>
                <div className="map-attrib">
                  ©{' '}
                  <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>
                  {' '}·{' '}
                  <a href="https://openfreemap.org" target="_blank" rel="noopener noreferrer">OpenFreeMap</a>
                </div>
              </div>

              <div className="world-overlay">
                <div className="left">
                  <div>
                    <div className="world-meta">
                      <span className="dot"></span>
                      <span>02 / THE ROUTE</span>
                    </div>
                    <h3 className="world-title-h3">
                      Chennai to <em>here.</em>
                    </h3>
                  </div>
                  <div>
                    <div className="world-meta" style={{ marginBottom: '8px' }}>
                      <span style={{ color: 'var(--ink-3)' }}>CURRENT</span>
                      <span style={{ color: 'var(--amber)' }} id="worldStopLabel">WORLD VIEW</span>
                    </div>
                    <div className="world-progress" id="worldProgress">
                      <span className="on"></span><span></span><span></span><span></span>
                    </div>
                  </div>
                </div>

                <div className="right">
                  <div className="world-info" id="worldInfo">
                    <div className="coord">
                      <span className="pip"></span>
                      <span id="worldCoord">WORLD VIEW · SCROLL TO FLY THE PATH</span>
                    </div>
                    <h4 id="worldCity">The route<em>.</em></h4>
                    <div className="role" id="worldRole">Three cities, one through-line.</div>
                    <div className="when" id="worldWhen">2019 → now</div>
                  </div>
                </div>
              </div>

              <div className="world-hint" id="worldHint">
                <span>keep scrolling</span> <span className="arr">↓</span>
              </div>
            </div>
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

        {/* STACK */}
        <section className="section wrap" id="stack">
          <div className="section-head">
            <div>
              <div className="section-eyebrow">04 / Stack</div>
              <h2 className="section-title">What I actually <em>reach for.</em></h2>
            </div>
            <div className="section-meta">DAILY DRIVERS · 2026</div>
          </div>

          <div className="stack-grid">
            <div className="stack-side">
              <p className="lead">The stack I actually use, day in, day out.</p>
              <p>Equally at home in a Jupyter notebook arguing about embeddings and a client&apos;s Terraform repo arguing about IAM. Nothing below is here just to fill space.</p>
              <p style={{ color: 'var(--ink-3)', fontSize: '13.5px' }}>
                Curious about something specific?{' '}
                <a href="#contact" style={{ color: 'var(--amber)', borderBottom: '1px solid var(--amber)' }}>Ask me</a>.
              </p>
            </div>

            <div className="stack-blocks">
              {stackBlocks.map((block) => (
                <div className="stack-block" key={block.num}>
                  <h4><span className="num">{block.num}</span> · {block.title}</h4>
                  {block.skills.map((s) => (
                    <div className="skill-row" key={s.name}>
                      {s.noLogo ? (
                        <span className="logo no-logo">{s.noLogo}</span>
                      ) : (
                        <span className="logo">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`https://cdn.simpleicons.org/${s.logo}/aab2c2`}
                            alt=""
                            onError={(e) => e.currentTarget.classList.add('broken')}
                          />
                          {s.fb && <span className="fb">{s.fb}</span>}
                        </span>
                      )}
                      <span className="name">{s.name}</span>
                      <span className="level">{s.level}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EDUCATION */}
        <section className="section wrap" id="education">
          <div className="section-head">
            <div>
              <div className="section-eyebrow">06 / School</div>
              <h2 className="section-title">Where I went to <em>school.</em></h2>
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
            <div className="contact-eyebrow">07 / Say hi</div>
            <h2>Got something <em>interesting</em><br />to talk about?</h2>
            <p className="lede">I&apos;m at Checksum AI and happy there — but always down for a good conversation about LLM systems in production, weird research ideas, or anything you&apos;re building.</p>

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
                BASED
                <strong>San Francisco, CA</strong>
                Mission District
              </div>
              <div>
                CALL
                <strong>(951) 425-7229</strong>
                Voice / SMS · PT
              </div>
              <div>
                STATUS
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
            <span>HANDCRAFTED IN SF</span>
          </div>
          <div className="right">
            ↑ <a href="#about" style={{ borderBottom: '1px solid var(--line-2)', paddingBottom: '1px' }}>RETURN TO TOP</a>
          </div>
        </div>
      </footer>
    </>
  )
}
