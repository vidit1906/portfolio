"use client"

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'

const Footer = () => {
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/vidit1906', icon: Github },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/viditnaik/', icon: Linkedin },
    { name: 'Email', url: 'mailto:viditnaik@gmail.com', icon: Mail },
  ]

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        {/* Gradient divider */}
        <div className="w-48 h-[2px] mx-auto mb-8 rounded-full bg-gradient-to-r from-primary via-accent to-tertiary" />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <span className="text-xl font-extrabold text-foreground">V<span className="text-primary">.</span></span>
        </motion.div>

        <div className="flex justify-center gap-3 mb-6">
          {socialLinks.map(link => (
            <motion.a
              key={link.name}
              href={link.url}
              {...(link.name !== 'Email' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 bg-surface border border-border rounded-lg flex items-center justify-center text-text-muted hover:text-foreground transition-colors"
              aria-label={link.name}
            >
              <link.icon size={16} />
            </motion.a>
          ))}
        </div>

        <p className="text-xs text-text-dim">
          &copy; {new Date().getFullYear()} Vidit Naik. Built with Next.js
        </p>
      </div>
    </footer>
  )
}

export default Footer
