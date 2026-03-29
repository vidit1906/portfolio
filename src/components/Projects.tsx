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
  }, [projects])

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
