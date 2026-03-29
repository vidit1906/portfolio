"use client"

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'

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
      logo: '/images/companies/checksum-ai.svg',
      linkedIn: 'https://www.linkedin.com/company/checksum-ai',
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
      logo: '/images/companies/shifa-precision.png',
      linkedIn: 'https://www.linkedin.com/company/shifa-precision',
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
      logo: '/images/companies/ucr-cris.png',
      linkedIn: 'https://cris.ucr.edu',
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
      logo: '/images/companies/kent-cam.png',
      linkedIn: 'https://www.linkedin.com/company/view-kent-cam',
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
      logo: '/images/companies/studetails.png',
      linkedIn: 'https://www.linkedin.com/in/viditnaik/',
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

                <div className="bg-surface border border-border rounded-xl p-5 hover:border-primary/20 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3 gap-3">
                    <div className="flex items-start gap-3">
                      {/* Company logo */}
                      <a
                        href={exp.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 w-10 h-10 bg-background border border-border rounded-lg flex items-center justify-center overflow-hidden hover:border-primary/40 transition-colors"
                        title={`View ${exp.company} on LinkedIn`}
                      >
                        <Image
                          src={exp.logo}
                          alt={`${exp.company} logo`}
                          width={28}
                          height={28}
                          className="object-contain"
                        />
                      </a>
                      <div>
                        <h3 className="text-base font-bold text-foreground">{exp.title}</h3>
                        <a
                          href={exp.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-sm font-semibold ${textColorMap[exp.color]} hover:underline inline-flex items-center gap-1`}
                        >
                          {exp.company}
                          <ExternalLink size={11} className="opacity-50" />
                        </a>
                      </div>
                    </div>
                    <span className="text-xs text-text-dim mt-1 md:mt-0 flex-shrink-0">{exp.period}</span>
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
