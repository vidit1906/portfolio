"use client"

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Tilt from 'react-parallax-tilt'

const Projects = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  const projects = [
    {
      title: 'LLM-Powered Drone Control',
      description: 'AI system integrating drones with LLMs for natural language control. RAG boosts command accuracy by 68%.',
      image: '/images/projects/llm-drone.png',
      technologies: ['LangChain', 'RAG', 'Python', 'ChromaDB'],
      github: 'https://github.com/vidit1906/llmdronecontrol',
      tagColors: ['primary', 'accent', 'tertiary', 'primary'],
    },
    {
      title: 'InsureSearch: RAG Chatbot',
      description: 'Fine-tuned LLaMA-3 with RAG. Reduced token usage by 65% via top-k BERT search and 4-bit quantization.',
      image: '/images/projects/insure-search.jpeg',
      technologies: ['RAG', 'LLaMA-3', 'BERT', 'LoRA'],
      github: 'https://github.com/dhrumilankola/LLama3_Hackathon',
      tagColors: ['accent', 'primary', 'tertiary', 'accent'],
    },
    {
      title: 'CitySafe: Crime Dashboard',
      description: 'Analytics dashboard processing 1.5M+ records with SQL, Spark, and PostGIS. Reduced query time by 25%.',
      image: '/images/projects/city-safe.png',
      technologies: ['SQL', 'Spark', 'PostGIS', 'React'],
      github: 'https://github.com/sreekar9601/chicago-crime-analysis',
      tagColors: ['primary', 'accent', 'tertiary', 'primary'],
    },
    {
      title: 'CreateFlow - CalHacks 11.0',
      description: 'Multi-agent system with LangGraph for content, scheduling & analytics. Cut creation time by 50%.',
      image: '/images/projects/create-flow.png',
      technologies: ['LangGraph', 'Multi-Agent', 'LLaMA-3', 'LoRA'],
      github: 'https://github.com/dhrumilankola/Calhacks11_CreateFlow',
      tagColors: ['accent', 'primary', 'primary', 'accent'],
    },
    {
      title: 'PRRP Graph Partitioning',
      description: 'Spatial regionalization with a novel PRRP algorithm module for graph data structures.',
      image: '/images/projects/prrp.jpeg',
      technologies: ['Python', 'Graph Theory', 'Statistics', 'Spatial'],
      github: 'https://github.com/sreekar9601/graph-partitioning-prrp',
      tagColors: ['tertiary', 'primary', 'accent', 'tertiary'],
    },
  ]

  // Duplicate for seamless infinite scroll
  const allProjects = [...projects, ...projects]

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    let animationId: number
    let scrollPos = 0
    const speed = 0.5 // px per frame

    const scroll = () => {
      if (!isPaused && container) {
        scrollPos += speed
        // Reset when we've scrolled through the first set
        const halfWidth = container.scrollWidth / 2
        if (scrollPos >= halfWidth) {
          scrollPos = 0
        }
        container.scrollLeft = scrollPos
      }
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)
    return () => cancelAnimationFrame(animationId)
  }, [isPaused])

  const colorClasses: Record<string, string> = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    accent: 'bg-accent/10 text-accent border-accent/20',
    tertiary: 'bg-tertiary/10 text-tertiary border-tertiary/20',
  }

  return (
    <section id="projects" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
      </div>

      {/* Auto-scrolling container — full width, no padding */}
      <div
        ref={scrollRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        className="flex gap-5 overflow-hidden px-4 sm:px-6 lg:px-8 cursor-grab"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {allProjects.map((project, index) => (
          <Tilt
            key={`${project.title}-${index}`}
            tiltMaxAngleX={6}
            tiltMaxAngleY={6}
            glareEnable={true}
            glareMaxOpacity={0.08}
            glareColor="#3B82F6"
            glarePosition="all"
            className="flex-shrink-0 w-[320px] md:w-[360px]"
          >
            <div className="bg-surface border border-border rounded-xl overflow-hidden h-full group hover:border-primary/30 transition-colors">
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-base font-bold text-foreground mb-2">{project.title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed mb-4 line-clamp-3">{project.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className={`text-[10px] px-2 py-0.5 rounded-md border ${colorClasses[project.tagColors[i] || 'primary']}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  <Github size={14} />
                  View Code
                  <ExternalLink size={10} />
                </a>
              </div>
            </div>
          </Tilt>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <p className="text-xs text-text-dim text-center">Hover to pause</p>
      </div>
    </section>
  )
}

export default Projects
