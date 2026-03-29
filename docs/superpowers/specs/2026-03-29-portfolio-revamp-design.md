# Portfolio Revamp — Design Specification

## Overview

Revamp Vidit Naik's professional portfolio from a standard light/dark template into a bold, interactive "Electric Pop" design with a dark base, vivid blue + warm amber palette, and rich interactive elements throughout.

**Framework:** Next.js 16 + TypeScript (existing, no change)
**Styling:** Tailwind CSS (existing) + custom CSS variables for new palette
**Animations:** Framer Motion (existing) + new interactive libraries

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Visual direction | Electric Pop | Bold, punchy, memorable — not bland |
| Color palette | Bright Blue + Amber | Blue-primary (#3B82F6), warm amber accent (#F59E6B), emerald tertiary (#34D399) on near-black base (#0A0A0F) |
| Theme mode | Dark only | Remove light/dark toggle; dark-only matches the aesthetic |
| Hero stats | Removed | Felt like vanity metrics; replaced with "Currently at" badge |
| Header CTA | Removed "Hire Me" | Cleaner nav without a CTA button |
| Skills section | Categorized logo grid | Professional, scannable, with filter tabs |
| Projects layout | Spotlight carousel | One project at a time with 3D tilt, replaces grid |

## Color Palette

All colors are custom (not Tailwind defaults). The accent `#F59E6B` is a warm peach-orange, not Tailwind's amber.

| Role | Hex | HSL | CSS Variable | Usage |
|------|-----|-----|-------------|-------|
| Primary | `#3B82F6` | `217 91% 60%` | `--primary` | Links, CTAs, headings, active states |
| Accent | `#F59E6B` | `22 88% 69%` | `--accent` | Secondary CTAs, highlights, name text |
| Tertiary | `#34D399` | `160 60% 52%` | `--tertiary` | Status indicators, third-color accents |
| Base | `#0A0A0F` | `240 20% 4%` | `--background` | Page background |
| Surface | `#12121A` | `240 17% 8%` | `--surface` | Cards, elevated surfaces |
| Border | `#1A1A2E` | `240 27% 14%` | `--border` | Subtle borders |
| Text primary | `#FFFFFF` | `0 0% 100%` | `--foreground` | Headings |
| Text secondary | `#BBBBBB` | `0 0% 73%` | `--text-secondary` | Body text (AA compliant on base) |
| Text muted | `#999999` | `0 0% 60%` | `--text-muted` | Captions, labels (AA-large compliant) |
| Text dim | `#777777` | `0 0% 47%` | `--text-dim` | Timestamps only (AA-large compliant) |

**Tailwind config:** Replace existing `colors` extension and `:root` / `.dark` CSS variable blocks with these variables. Remove the `.dark` block entirely. Set `darkMode: "class"` and hardcode `class="dark"` on `<html>`.

**Theme migration:** Remove `next-themes` provider from `layout.tsx`. Remove `ThemeProvider` wrapper. Remove theme toggle from Header. Hardcode `<html lang="en" className="dark">` in layout.

## Typography

- **Font:** Inter (already loaded via Google Fonts)
- **Hero heading:** `text-4xl` mobile, `text-5xl` md, `text-6xl` lg — weight 900
- **Section headings:** `text-2xl` mobile, `text-3xl` md — weight 700–800
- **Body:** `text-sm` mobile, `text-base` md — weight 400
- **Labels/caps:** `text-xs`, `tracking-[2px]` to `tracking-[3px]`, uppercase

## Accessibility & Reduced Motion

- All text meets WCAG AA contrast on `#0A0A0F` base
- `prefers-reduced-motion: reduce`: disable particle background, typing animation (show text immediately), 3D tilt, and magnetic cursor. Keep simple fade-in reveals.
- All interactive elements have focus-visible outlines (`ring-2 ring-primary`)
- Project carousel is keyboard-navigable (arrow keys when section is focused via tabindex)
- Images have descriptive alt text

## Sections

### 1. Header (Sticky Navigation)

- **Layout:** Logo "V." (blue dot) left, nav links right
- **Style:** Glassmorphism — transparent background with `backdrop-filter: blur(12px)`, border becomes visible on scroll
- **Links:** About, Experience, Projects, Education, Contact
- **No CTA button**
- **Interactions:**
  - Magnetic hover on nav links (links gently pull toward cursor)
  - Active section highlighted in primary blue
  - Background blur activates after scrolling past hero
- **Mobile:** Hamburger menu with slide-in panel

### 2. Hero Section

- **Layout:** Two-column — text left, photo right
- **Background:** Particle mesh (tsparticles) — subtle connected dots/lines, blue-tinted, react to cursor movement
- **Elements:**
  - "Currently at Checksum AI" pill badge — green dot (#34D399) + text, rounded pill shape, `background: #12121A`, `border: 1px solid #1A1A2E`
  - Headline: "Hey." / "I'm Vidit" — typing animation letter by letter, then resolves. "Hey." dot in blue, "Vidit" in amber
  - Subtitle: "Forward Deployed Engineer building AI-powered products from prototype to production."
  - CTA buttons: "See My Work ↓" scrolls to Projects section (primary blue), "Let's Talk" scrolls to Contact section (amber)
  - Social icons: GitHub, LinkedIn, Resume download (`/vidit-resume.pdf`) — small bordered squares
- **Photo:** Vidit's actual photo (`/images/vidit.jpeg`) in a gradient-bordered frame (blue→amber), `border-radius: 20px`, slight 3deg rotation
- **Interactions:**
  - Typing animation on headline
  - Particle mesh reacts to cursor
  - Magnetic hover on CTA buttons (glow effect on primary color)
  - Fade-in-up entrance animations

### 3. Experience Section

- **Layout:** Vertical timeline, left-aligned
- **Timeline line:** Gradient from blue → amber → emerald, 2px wide
- **Timeline nodes:** 12px circles, colored per position in gradient
- **Cards:** Dark surface background, subtle border, contains company name, role, period, bullet descriptions
- **All 5 roles displayed:** Checksum AI, Shifa Precision Inc., Center for Robotics and Intelligent Systems, Kent Cam, StuDetails
- **Interactions:**
  - Scroll-driven: nodes illuminate and cards slide in from left as user scrolls
  - Timeline progress bar fills with gradient as user scrolls through section
  - Cards have subtle hover elevation

### 4. Projects Section

- **Layout:** Spotlight carousel — one project featured at a time
- **Structure:** Large preview image/card on left, project info on right
- **Preview card:** Shows actual project screenshot from `/public/images/projects/`
- **Info panel:** "FEATURED PROJECT" label, title, description, tech tags (colored by palette), GitHub link button (Live Demo button only if project has a live URL — conditionally rendered)
- **Navigation:** Dot indicators at bottom, arrow keys when section has focus (via tabindex="0"), Framer Motion drag/swipe gestures on mobile. Carousel wraps around (infinite loop). Crossfade transition duration: 400ms ease-out.
- **All 5 projects:** Drone Control, InsureSearch, CitySafe, CreateFlow, PRRP
- **Interactions:**
  - 3D tilt on the preview card (react-parallax-tilt) — tilts toward cursor with shadow shift
  - Smooth crossfade transition between projects
  - Tech tags use palette colors (blue, amber, emerald)

### 5. Skills / Tech Stack Section

- **Layout:** Category-filtered grid
- **Header:** "What I Work With" label + "Tech Stack" heading, centered
- **Filter tabs:** All, AI/ML, Frontend, Backend, Cloud & DevOps, Databases — clicking filters with layout animation
- **Grid tiles:** Each skill gets a tile with:
  - Branded color icon/logo placeholder (36x36px, rounded 8px, brand background color)
  - Skill name below
  - `background: #12121A`, `border: 1px solid #1A1A2E`, `border-radius: 10px`
- **Categories and skills:**
  - **AI/ML (blue):** PyTorch, LangChain, RAG, Claude, Gemini, LoRA, Ollama
  - **Backend & Languages (amber):** JavaScript, Python, Java, Node.js, SpringBoot, Flask, Django
  - **Cloud & DevOps (emerald):** AWS, GCP, Docker, Kubernetes, Jenkins, Git
  - **Databases & Data (blue):** MySQL, MongoDB, Neo4j, Spark, Hadoop
  - **Frontend:** React.js (shown under "All" or its own small category)
  - **Testing:** Playwright, PyTest, JUnit, Selenium
- **Interactions:**
  - Filter tabs animate active state
  - Tiles stagger-animate into view on scroll
  - Hover: subtle scale-up + glow matching category color
- **Icons:** Use `@iconify/react` with simple-icons set for actual SVG technology logos

### 6. Education Section

- **Layout:** Two cards side by side (stacked on mobile)
- **Each card contains:**
  - School logo from `/public/images/schools/`
  - School name, degree, degree color (UCR = blue, VIT = amber)
  - Graduation date, GPA (UCR: 3.63, VIT: omit)
  - Coursework tags
- **Interactions:**
  - Gradient border animation on hover (blue → amber sweep)
  - Coursework tags fade in on scroll
  - Subtle entrance animation

### 7. Contact Section

- **Layout:** Split — info cards left, form right
- **Info cards:** Email, Location, Phone — each with colored icon container (blue, amber, emerald)
- **Form:** Name, Email, Subject, Message textarea, Submit button
- **Validation:** Zod schema (existing), react-hook-form (existing)
- **Backend:** Gmail SMTP via Nodemailer (existing, no change)
- **Interactions:**
  - Input fields glow blue on focus (`border-color: #3B82F6`, subtle box-shadow)
  - Submit button: magnetic hover + loading spinner animation
  - Success/error toast notifications

### 8. AI Chatbot (Floating Widget)

- **Kept as-is functionally** — Gemini-powered, floating bottom-right
- **Restyled:**
  - Chat button: `background: linear-gradient(135deg, #3B82F6, #F59E6B)`, `border-radius: 14px`, 48x48px
  - Chat window: `background: #12121A`, `border: 1px solid #1A1A2E`
  - AI messages: `background: rgba(59,130,246,0.1)`, `color: #8AB4F8`, left-aligned
  - User messages: `background: #1A1A2E`, `color: #BBBBBB`, right-aligned
  - Suggested questions on first open
- **No functional changes** — same API endpoint, same knowledge base

### 9. Footer

- **Layout:** Centered, minimal
- **Gradient divider:** Horizontal line, `linear-gradient(to right, #3B82F6, #F59E6B, #34D399)`
- **Logo:** "V." centered
- **Social icons:** GitHub, LinkedIn, Email — bordered squares with magnetic hover
- **Copyright:** "© 2026 Vidit Naik. Built with Next.js"

## Interactive Elements Summary

| Element | Library | Where Used |
|---------|---------|------------|
| Typing animation | Framer Motion (custom) | Hero headline |
| Particle mesh background | `@tsparticles/react` | Hero section |
| 3D tilt cards | `react-parallax-tilt` | Project preview cards |
| Scroll-driven timeline | Framer Motion `useScroll` + `useTransform` | Experience section |
| Animated counters | Removed | — |
| Interactive skills grid | Framer Motion `AnimatePresence` + `layout` | Skills section |
| Magnetic cursor on buttons | Custom hook: pull radius 80px, max displacement 8px, spring easing. Disabled on touch devices. | CTAs, nav links, social icons |
| Scroll reveal animations | Framer Motion `whileInView` | All sections |

## New Dependencies

| Package | Purpose |
|---------|---------|
| `@tsparticles/react` + `@tsparticles/slim` | Particle mesh background in hero. Config: ~60 particles on desktop, ~20 on mobile (< 768px). Linked with lines, blue-tinted. Disable entirely on `prefers-reduced-motion`. |
| `react-parallax-tilt` | 3D tilt effect on project cards |
| `@iconify/react` | SVG technology logos for skills grid (simple-icons set) |

## Removed/Changed

| Item | Change |
|------|--------|
| Dark/light toggle | Removed — dark-only theme |
| `next-themes` | Remove package. Remove `ThemeProvider` from `layout.tsx`. Hardcode `class="dark"` on `<html>`. |
| `@emailjs/browser` | Remove — unused, replaced by Nodemailer |
| Stat cards in hero | Removed — replaced with "Currently at" badge |
| "Hire Me" header button | Removed |
| Project grid layout | Replaced with spotlight carousel |
| Skills orbit visualization | Replaced with professional categorized grid |

## Stitch MCP Usage

Google Stitch MCP will be used to generate high-fidelity screen designs for each section. The generated designs will inform the implementation — providing reference screenshots, design tokens, and HTML structure that we adapt into the Next.js + Tailwind codebase.

## File Structure (No Change to Existing)

All changes are modifications to existing component files:
- `src/components/Header.tsx`
- `src/components/About.tsx` (hero)
- `src/components/Experience.tsx`
- `src/components/Projects.tsx`
- `src/components/Education.tsx`
- `src/components/Contact.tsx`
- `src/components/Footer.tsx`
- `src/components/AIChatbot.tsx`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/app/page.tsx`

New files:
- `src/components/ParticleBackground.tsx` — tsparticles wrapper
- `src/components/SkillsGrid.tsx` — new section (add to `page.tsx` between Projects and Education)
- `src/hooks/useMagneticHover.ts` — custom hook (create `src/hooks/` directory)

Preserved as-is:
- `src/components/ScrollToTop.tsx` — restyle button to match palette (blue bg, surface border)
- `src/components/GoogleAnalytics.tsx` — keep all existing tracking. Add new events for project carousel navigation and skill filter clicks.
- `src/lib/gtag.ts` — no changes
