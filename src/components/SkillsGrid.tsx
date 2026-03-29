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
