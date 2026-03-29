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
