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
