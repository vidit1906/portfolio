"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'

const Education = () => {
  const education = [
    {
      degree: 'Master of Science in Computer Science',
      school: 'University of California, Riverside',
      period: 'March 2025',
      description: 'Relevant Coursework: Operating Systems, Agile Development, SDLC, Data Structures and Algorithms, Object Oriented Programming, Machine Learning, Artificial Intelligence, Networking, Design Patterns, Distributed Systems.',
      logo: '/images/schools/ucr-logo.png',
    },
    {
      degree: 'Bachelor\'s in Computer Science and Engineering',
      school: 'Vellore Institute of Technology, Chennai',
      period: 'August 2023',
      description: 'Focused on a comprehensive curriculum in computer science and engineering, building a strong foundational knowledge.',
      logo: '/images/schools/vit-logo.png',
    },
  ]

  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Education
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My educational background and continuous learning journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-background rounded-lg p-6 shadow-lg border border-border"
            >
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 p-3 rounded-lg mr-4 flex items-center justify-center">
                  <Image
                    src={edu.logo}
                    alt={`${edu.school} logo`}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <span className="text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                  {edu.period}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2">
                {edu.degree}
              </h3>
              <p className="text-primary font-medium mb-3">{edu.school}</p>
              <p className="text-muted-foreground text-sm">{edu.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education