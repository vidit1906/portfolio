"use client"

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart } from 'lucide-react'

const Footer = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/vidit1906',
      icon: Github,
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/viditnaik/',
      icon: Linkedin,
    },
    {
      name: 'Email',
      url: 'mailto:viditnaik@gmail.com',
      icon: Mail,
    },
  ]

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary/10 border-t border-border py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h3 className="text-2xl font-bold text-foreground mb-4">Vidit</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Software Engineer passionate about creating innovative solutions
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center space-x-6 mb-8"
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="bg-background hover:bg-secondary p-3 rounded-lg transition-colors shadow-sm"
              >
                <link.icon size={20} className="text-muted-foreground hover:text-foreground" />
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-8 border-t border-border"
          >
            <p className="text-muted-foreground flex items-center justify-center space-x-1">
              <span>© {currentYear} Vidit. Made with</span>
              <Heart size={16} className="text-red-500 mx-1" />
              <span>and Next.js</span>
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 