"use client"

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { trackContactForm } from '@/lib/gtag'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactForm = z.infer<typeof contactSchema>

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactForm) => {
    trackContactForm()
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (response.ok) {
        alert("Message sent successfully! I'll get back to you soon.")
        reset()
      } else {
        throw new Error('Failed to send email')
      }
    } catch {
      const subject = encodeURIComponent(`Portfolio Contact: ${data.subject}`)
      const body = encodeURIComponent(
        `Hi Vidit,\n\nName: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\nMessage:\n${data.message}`
      )
      window.open(`mailto:viditnaik@gmail.com?subject=${subject}&body=${body}`, '_blank')
      alert("There was an issue sending the email. I've opened your email client with the message pre-filled.")
      reset()
    }
  }

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'viditnaik@gmail.com', href: 'mailto:viditnaik@gmail.com', color: 'bg-primary/10 text-primary' },
    { icon: MapPin, label: 'Location', value: 'San Francisco, CA', href: '#', color: 'bg-accent/10 text-accent' },
    { icon: Phone, label: 'Phone', value: '+1 (951) 425-7229', href: 'tel:+19514257229', color: 'bg-tertiary/10 text-tertiary' },
  ]

  const inputClasses = 'w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-text-dim text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all'

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-[3px] uppercase text-primary font-semibold">Reach Out</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mt-2">Get In Touch</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.href}
                whileHover={{ x: 6 }}
                className="flex items-center gap-4 p-4 bg-surface border border-border rounded-xl hover:border-primary/30 transition-colors"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${info.color}`}>
                  <info.icon size={18} />
                </div>
                <div>
                  <p className="text-xs text-text-dim">{info.label}</p>
                  <p className="text-sm text-foreground font-medium">{info.value}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input {...register('name')} className={inputClasses} placeholder="Your name" />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <input {...register('email')} type="email" className={inputClasses} placeholder="your@email.com" />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>
              <div>
                <input {...register('subject')} className={inputClasses} placeholder="Subject" />
                {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
              </div>
              <div>
                <textarea {...register('message')} rows={5} className={`${inputClasses} resize-none`} placeholder="Your message..." />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
