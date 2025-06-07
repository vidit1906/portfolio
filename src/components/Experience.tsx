"use client"

import { motion } from 'framer-motion'

const Experience = () => {
  const experiences = [
    {
      title: 'Student Researcher',
      company: 'Center for Robotics and Intelligent Systems',
      period: 'October 2024 - March 2025',
      description: [
        'Developed an Al-powered system that integrates drones with Large Language Models (LLMs) for user-driven control through natural language. ',
        'Utilizing Retrieval-Augmented Generation (RAG) to provide the LLM with contextual knowledge from drone manuals, increasing command accuracy by 68%. ',
        'Collaborating in a Scrum-based Agile development process to design features with a core commitment to quality and scalability. ',
      ],
    },
    {
      title: 'Machine Learning Engineer',
      company: 'Kent Cam',
      period: 'May 2022 - June 2022',
      description: [
        'Utilized data analytics techniques to assess and optimize the integration of new features in company cameras, significantly improving core functionalities and enhancing overall product performance. ',
        'Automated cross-region data pipelines, reducing data-validation errors by 35% and ensuring 99.9% data integrity across multiple data streams. ',
        'Conducted thorough product testing, identifying and resolving critical software issues to ensure seamless and efficient performance. ',
      ],
    },
    {
      title: 'Software Engineer',
      company: 'StuDetails',
      period: 'July 2020 - February 2021',
      description: [
        'Built a scalable web application using React and Flask to manage scheduling and inspections for enterprise clients, supporting 5,000+ monthly users across 50+ distributed locations. ',
        'Led cross-functional collaboration to optimize AWS S3 data workflows using AWS Glue, improving data accuracy by 25% and enabling real-time integration with client-facing systems. ',
        'Implemented automated testing and CI/CD pipelines, cutting deployment failures by 30% for apps processing 1TB+ data monthly. ',
      ],
    },
  ]

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My professional journey and the roles that shaped my career
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary hidden md:block"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background hidden md:block"></div>

                <div className="md:ml-20 bg-background rounded-lg p-6 shadow-lg border border-border">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {exp.title}
                      </h3>
                      <p className="text-primary font-medium">{exp.company}</p>
                    </div>
                    <span className="text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full mt-2 md:mt-0 w-fit">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-muted-foreground flex items-start">
                        <span className="text-primary mr-2 mt-1">•</span>
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