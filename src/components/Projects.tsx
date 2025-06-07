"use client"

import { motion } from 'framer-motion'
import { Github } from 'lucide-react'
import Image from 'next/image'

const Projects = () => {
  const projects = [
    {
      title: 'LLM-Powered Drone Control System',
      description: 'Developed an AI-powered system that integrates drones with Large Language Models (LLMs) for user-driven control through natural language, utilizing RAG to boost command accuracy by 68%.',
      image: '/images/projects/llm-drone.png',
      technologies: ['Large Language Models', 'RAG', 'Python', 'Agile/Scrum'],
      github: 'https://github.com/vidit1906/llmdronecontrol',
    },
    {
      title: 'InsureSearch: RAG based AI Chatbot',
      description: 'Deployed RAG and fine-tuned LLaMA3 to boost response accuracy. Reduced token usage by 65% with top-k BERT search and enhanced LLaMA-3 with 4-bit quantization and LoRA.',
      image: '/images/projects/insure-search.jpeg',
      technologies: ['RAG', 'LLaMA3', 'BERT', 'LoRA', 'Fine-Tuning', 'Together AI', 'Git'],
      github: 'https://github.com/dhrumilankola/LLama3_Hackathon',
    },
    {
      title: 'CitySafe: Chicago Crime Insights Dashboard',
      description: 'Built an analytics dashboard processing over 1.5M records using SQL, Spark, and PostGIS. Designed geospatial visualizations with Python and React, reducing query response time by 25%.',
      image: '/images/projects/city-safe.png',
      technologies: ['SQL', 'Spark', 'PostGIS', 'ETL', 'React.js', 'Python'],
      github: 'https://github.com/sreekar9601/chicago-crime-analysis',
    },
    {
      title: 'CreateFlow - CalHacks 11.0',
      description: 'Designed a multi-agent system with LangGraph linking AI agents for content, scheduling, & analytics, cutting creation time by 50%. Fine-tuned LLaMA-3 8B on LinkedIn data to predict engagement.',
      image: '/images/projects/create-flow.png',
      technologies: ['LangGraph', 'Multi-Agent Systems', 'LLaMA-3', 'LoRA', 'Fine-Tuning'],
      github: 'https://github.com/dhrumilankola/Calhacks11_CreateFlow',
    },
    {
      title: 'PRRP Graph Partitioning',
      description: 'A reimplementation and extension of spatial regionalization methodologies, featuring a novel module for implementing the PRRP algorithm in graph data structures. Demonstrates the versatility of PRRP in both spatial and graph-based representations.',
      image: '/images/projects/prrp.jpeg',
      technologies: ['Python', 'Graph Theory', 'Statistical Analysis', 'Spatial Data'],
      github: 'https://github.com/sreekar9601/graph-partitioning-prrp',
    }
  ]

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Some of my recent work and side projects
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-background rounded-lg overflow-hidden shadow-lg border border-border group"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-secondary text-secondary-foreground px-2 py-1 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github size={16} />
                    <span className="text-sm">Code</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects