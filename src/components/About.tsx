"use client"

import { motion } from 'framer-motion'
import { Github, Linkedin, Download, MessageCircle, Sparkles } from 'lucide-react'
import Image from 'next/image'
import { trackDownload, trackSocialClick } from '@/lib/gtag'

const About = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/vidit1906',
      icon: Github,
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/vidit-naik',
      icon: Linkedin,
    },
  ]

  const handleResumeDownload = () => {
    // Track the download event
    trackDownload('Vidit_Naik_Resume.pdf')
  }

  const handleSocialClick = (platform: string, url: string) => {
    // Track the social media click
    trackSocialClick(platform)
    // Open the social media link
    window.open(url, '_blank')
  }

  return (
    <section id="about" className="min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Hi, I&apos;m{' '}
              <span className="text-primary">Vidit</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-muted-foreground mb-6">
              Software Engineer
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Passionate software engineer with expertise in full-stack development,
              creating innovative solutions that solve real-world problems. I love
              building scalable applications and exploring new technologies.
            </p>

            {/* AI Chatbot CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-4 mb-8"
            >
              <div className="flex items-start gap-3">
                <div className="bg-primary/20 rounded-lg p-2 mt-1">
                  <Sparkles className="text-primary" size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                    Try My AI Assistant
                    <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">NEW</span>
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Have questions about my experience, skills, or projects? Chat with my AI assistant powered by Gemini! Click the chat icon below.
                  </p>
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center gap-2 text-primary text-sm font-medium"
                  >
                    <MessageCircle size={16} />
                    <span>Look for the chat icon in the bottom-right →</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {/* Changed button to an anchor tag for robust downloading */}
              <motion.a
                href="/vidit-resume.pdf"
                download="Vidit_Naik_Resume.pdf"
                onClick={handleResumeDownload}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Download size={20} />
                <span>Download Resume</span>
              </motion.a>

              <div className="flex space-x-4">
                {socialLinks.map((link) => (
                  <motion.button
                    key={link.name}
                    onClick={() => handleSocialClick(link.name, link.url)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-secondary hover:bg-secondary/80 p-3 rounded-lg transition-colors"
                  >
                    <link.icon size={20} />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="w-80 h-80 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <div className="w-72 h-72 bg-background rounded-full overflow-hidden">
                <Image
                  src="/images/vidit.jpeg"
                  alt="Vidit Naik profile photo"
                  width={288}
                  height={288}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About